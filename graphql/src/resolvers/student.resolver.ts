import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Student } from '../entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

// Ici, on utilisera des “decorators” GraphQL pour décrire le type Student et son input
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class StudentType {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  registrationDate: Date;

  // Par sécurité, on ne renverra pas toujours le password
}

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  @Query(() => [StudentType])
  async students(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  @Query(() => StudentType, { nullable: true })
  async student(@Args('id') id: string): Promise<Student> {
    return this.studentRepository.findOne({ where: { id } });
  }

  @Mutation(() => StudentType)
  async createStudent(@Args('input') input: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create(input);
    return this.studentRepository.save(student);
  }

  @Mutation(() => StudentType, { nullable: true })
  async updateStudent(@Args('id') id: string, @Args('input') input: UpdateStudentInput): Promise<Student> {
    await this.studentRepository.update(id, input);
    return this.studentRepository.findOne({ where: { id } });
  }

  @Mutation(() => Boolean)
  async deleteStudent(@Args('id') id: string): Promise<boolean> {
    const result = await this.studentRepository.delete(id);
    return result.affected > 0;
  }
}
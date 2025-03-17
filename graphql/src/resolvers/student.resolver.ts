import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StudentEntity } from '../entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { EnrollmentType } from './enrollment.resolver';

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

  @Field(() => [EnrollmentType], {
    nullable: true,
  })
  enrollments: EnrollmentType
}

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  @Query(() => [StudentType])
  async students(): Promise<StudentEntity[]> {
    return this.studentRepository.find({
      relations: ['enrollments', 'enrollments.course'],
    });
  }

  @Query(() => StudentType, { nullable: true })
  async student(@Args('id') id: string): Promise<StudentEntity> {
    return this.studentRepository.findOne({ where: { id } });
  }

  @Mutation(() => StudentType)
  async createStudent(@Args('input') input: CreateStudentInput): Promise<StudentEntity> {
    const student = this.studentRepository.create(input);
    return this.studentRepository.save(student);
  }

  @Mutation(() => StudentType, { nullable: true })
  async updateStudent(@Args('id') id: string, @Args('input') input: UpdateStudentInput): Promise<StudentEntity> {
    await this.studentRepository.update(id, input);
    return this.studentRepository.findOne({ where: { id } });
  }

  @Mutation(() => Boolean)
  async deleteStudent(@Args('id') id: string): Promise<boolean> {
    const result = await this.studentRepository.delete(id);
    return result.affected > 0;
  }
}
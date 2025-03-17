import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EnrollmentEntity } from '../entities/enrollment.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CreateEnrollmentInput } from './dto/create-enrollment.input';
import { StudentType } from './student.resolver';
import { CourseType } from './course.resolver';
import { StudentEntity } from '../entities/student.entity';
import { CourseEntity } from '../entities/course.entity';

@ObjectType()
export class EnrollmentType {
  @Field(() => ID)
  id: string;

  @Field()
  enrollmentDate: Date;

  @Field(() => StudentType)
  student: StudentType;

  @Field(() => CourseType)
  course: CourseType;
}

@Resolver(() => EnrollmentType)
export class EnrollmentResolver {
  constructor(
    @InjectRepository(EnrollmentEntity)
    private readonly enrollmentRepository: Repository<EnrollmentEntity>,
  ) {}

  @Query(() => [EnrollmentType])
  async enrollments(): Promise<EnrollmentEntity[]> {
    return this.enrollmentRepository.find();
  }

  @Mutation(() => EnrollmentType)
  async createEnrollment(@Args('input') input: CreateEnrollmentInput): Promise<EnrollmentEntity> {
    return this.enrollmentRepository.save(input as Partial<EnrollmentEntity>);
  }
}

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CourseEntity } from '../entities/course.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';

@ObjectType()
export class CourseType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;
}

@Resolver(() => CourseType)
export class CourseResolver {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  @Query(() => [CourseType])
  async courses(): Promise<CourseEntity[]> {
    return this.courseRepository.find();
  }

  @Query(() => CourseType, { nullable: true })
  async course(@Args('id') id: string): Promise<CourseEntity> {
    return this.courseRepository.findOne({ where: { id } });
  }

  @Mutation(() => CourseType)
  async createCourse(@Args('input') input: CreateCourseInput): Promise<CourseEntity> {
    const course = this.courseRepository.create(input);
    return this.courseRepository.save(course);
  }

  @Mutation(() => CourseType)
  async updateCourse(@Args('id') id: string, @Args('input') input: UpdateCourseInput): Promise<CourseEntity> {
    await this.courseRepository.update(id, input);
    return this.courseRepository.findOne({ where: { id } });
  }

  @Mutation(() => Boolean)
  async deleteCourse(@Args('id') id: string): Promise<boolean> {
    const result = await this.courseRepository.delete(id);
    return result.affected > 0;
  }
}

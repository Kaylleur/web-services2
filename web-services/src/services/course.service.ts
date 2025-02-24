import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CourseEntity } from '../entities/course.entity';
import { CreateCourseDto } from '../dto/course.dto';
import { EnrollmentEntity } from '../entities/enrollment.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
    @InjectRepository(EnrollmentEntity)
    private enrollmentRepository: Repository<EnrollmentEntity>,
  ) {
  }

  async findAll(): Promise<CourseEntity[]> {
    return this.courseRepository.find({ relations: ['enrollments', 'enrollments.student'] });
  }

  async findOne(id: string): Promise<CourseEntity> {
    return this.courseRepository.findOne({ where: { id }, relations: ['enrollments', 'enrollments.student'] });
  }

  async create(createCourseDto: CreateCourseDto): Promise<CourseEntity> {
    const course = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }

  async delete(id: string): Promise<void> {
    await this.courseRepository.delete(id);
  }

  getEnrollments(id: string) {
    return this.enrollmentRepository.find({ where: { course: { id } }, relations: ['course', 'student'] });
  }
}

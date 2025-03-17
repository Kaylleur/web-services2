import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from '../entities/course.entity';
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
    return this.courseRepository.findOneOrFail({ where: { id }, relations: ['enrollments', 'enrollments.student'] });
  }

  async create(createCourseDto: any): Promise<CourseEntity> {
    return this.courseRepository.save(createCourseDto);
  }

  async delete(id: string): Promise<void> {
    await this.courseRepository.delete(id);
  }

  getEnrollments(id: string) {
    return this.enrollmentRepository.find({ where: { course: { id } }, relations: ['course', 'student'] });
  }
}

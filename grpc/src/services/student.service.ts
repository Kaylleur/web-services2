import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from '../entities/student.entity';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { UpdateStudentRequest } from '../interfaces/student.interface';

@Injectable()
export class StudentService {
    constructor(
      @InjectRepository(StudentEntity)
      private studentRepository: Repository<StudentEntity>,
      @InjectRepository(EnrollmentEntity)
      private enrollmentRepository: Repository<EnrollmentEntity>,
    ) {
    }

    async findAll(params: {
        limit: number;
        skip: number;
    }): Promise<StudentEntity[]> {
        return this.studentRepository.find({ relations: ['enrollments', 'enrollments.course'], skip: params.skip, take: params.limit });
    }

    async findOne(id: string): Promise<StudentEntity> {
        return this.studentRepository.findOneOrFail({ where: { id }, relations: ['enrollments', 'enrollments.course'] });
    }

    async create(createStudentDto: any): Promise<StudentEntity> {
        return this.studentRepository.save(createStudentDto);
    }

    async delete(id: string): Promise<void> {
        await this.studentRepository.delete(id);
    }

    enroll(id: string, courseId: string) {
        const enrollment = this.enrollmentRepository.create({
            student: { id },
            course: { id: courseId },
        });
        return this.enrollmentRepository.save(enrollment);
    }

    getEnrollments(id: string) {
        return this.enrollmentRepository.find({ where: { student: { id } }, relations: ['course', 'student'] });
    }

    update(data: UpdateStudentRequest) {
        return this.studentRepository.save(data);
    }
}

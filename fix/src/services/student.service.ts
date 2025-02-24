import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from '../entities/student.entity';
import { CreateStudentDto } from '../dto/student.dto';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { JwtService } from '@nestjs/jwt';
import { compare, hash,  } from 'bcrypt';

@Injectable()
export class StudentService {
    constructor(
      private readonly jwtService: JwtService,
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

     findOne(id: string): Promise<StudentEntity> {
        return this.studentRepository.findOne({ where: { id }, relations: ['enrollments', 'enrollments.course'] });
    }

     async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
        const hashedPassword = await hash(createStudentDto.password, 10);
        return this.studentRepository.save({...createStudentDto, password: hashedPassword});
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

  async checkCredentials(email: string, password: string) {
    const student = await this.studentRepository.findOne({ where: { email }, select: ['id','password'] });
    if(!student) {
      return null;
    }
    const isValid = await compare(password, student.password);
    if(!isValid) {
      return null;
    }
    return student;
  }
}

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { StudentService } from '../services/student.service';

import {
  CreateStudentRequest,
  DeleteStudentRequest,
  GetStudentRequest,
  ListStudentsRequest,
  StudentResponse,
  UpdateStudentRequest,
} from '../interfaces/student.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from '../entities/student.entity';
import { Repository } from 'typeorm';

@Controller()
export class StudentController {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>
  ) {}

  @GrpcMethod('StudentService', 'ListStudents')
  async listStudents(data: ListStudentsRequest): Promise<{
    students: StudentEntity[]
  }> {
    console.log('list student');
    const students = await this.studentRepository.find({
      skip: data.skip || 0,
      take: data.limit || 10,
    });
    return { students };
  }

  @GrpcMethod('StudentService', 'CreateStudent')
  async createStudent(data: CreateStudentRequest): Promise<StudentResponse> {
    const student = await this.studentRepository.save(data);
    return { student };
  }

  @GrpcMethod('StudentService', 'GetStudent')
  async getStudent(data: GetStudentRequest): Promise<StudentResponse> {
    const student = await this.studentRepository.findOneOrFail({ where: { id: data.id } });
    return { student };
  }

  @GrpcMethod('StudentService', 'UpdateStudent')
  async updateStudent(data: UpdateStudentRequest): Promise<StudentResponse> {
    const student = await this.studentRepository.save(data);
    return { student };
  }

  @GrpcMethod('StudentService', 'DeleteStudent')
  async deleteStudent(data: DeleteStudentRequest): Promise<void> {
    await this.studentRepository.delete(data.id);
  }

}

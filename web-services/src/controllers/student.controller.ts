import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { CreateStudentDto } from '../dto/student.dto';
import { StudentEntity } from '../entities/student.entity';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { AuthGuard } from '../guards/auth.guards';

@Controller('students')
@UseGuards(AuthGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async findAll(): Promise<StudentEntity[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StudentEntity> {
    return this.studentService.findOne(id);
  }

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    return this.studentService.create(createStudentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.studentService.delete(id);
  }

  @Post(':id/courses')
  async enroll(@Param('id') id: string, @Body('courseId') courseId: string): Promise<EnrollmentEntity> {
    return this.studentService.enroll(id, courseId);
  }

  @Get(':id/courses')
  async getEnrollments(@Param('id') id: string): Promise<EnrollmentEntity[]> {
    return this.studentService.getEnrollments(id);
  }
}

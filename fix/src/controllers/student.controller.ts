import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { CreateStudentDto } from '../dto/student.dto';
import { StudentEntity } from '../entities/student.entity';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { BasicAuthGuard } from '../guards/basic-auth.guard';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async findAll(@Query() params: {
    limit: number;
    skip: number;
  }): Promise<StudentEntity[]> {
    return this.studentService.findAll(params);
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
  @UseGuards(BasicAuthGuard)
  async enroll(@Param('id') id: string, @Body('courseId') courseId: string): Promise<EnrollmentEntity> {
    return this.studentService.enroll(id, courseId);
  }
}

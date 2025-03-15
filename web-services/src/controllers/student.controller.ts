import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { CreateStudentDto } from '../dto/student.dto';
import { StudentEntity } from '../entities/student.entity';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({
    description: 'list students'
  })
  @ApiOkResponse({
    description: 'array of students',
    example: [
      {
        firstName: 'Thomas',
        lastName: 'Anderson',
        email: "thomas.anderson@email.fr"
      }
    ]
  })
  @Get()
  async findAll(@Query() params: {
    limit: number;
    skip: number;
  }): Promise<StudentEntity[]> {
    return this.studentService.findAll(params);
  }

  @ApiOperation({
    description: 'get a student by id',
  })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the student',
    example: '9f192163-a1ef-4545-a68a-bf02ceef29c5'
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StudentEntity> {
    return this.studentService.findOne(id);
  }

  @ApiOperation({
    description: 'create a student'
  })
  @Post()
  async create(@Body() createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({
    description: 'delete a student'
  })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the student',
    example: '9f192163-a1ef-4545-a68a-bf02ceef29c5'
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.studentService.delete(id);
  }

  @ApiOperation({
    description: 'enroll a student in a course'
  })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the student',
    example: '9f192163-a1ef-4545-a68a-bf02ceef29c5'
  })
  @Post(':id/courses')
  async enroll(@Param('id') id: string, @Body('courseId') courseId: string): Promise<EnrollmentEntity> {
    return this.studentService.enroll(id, courseId);
  }
}

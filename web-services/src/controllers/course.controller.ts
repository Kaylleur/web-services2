import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CourseService } from '../services/course.service';
import { CreateCourseDto } from '../dto/course.dto';
import { CourseEntity } from '../entities/course.entity';
import { AuthGuard } from '../guards/auth.guards';

@Controller('courses')
@UseGuards(AuthGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll(): Promise<CourseEntity[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CourseEntity> {
    return this.courseService.findOne(id);
  }

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<CourseEntity> {
    return this.courseService.create(createCourseDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.courseService.delete(id);
  }
}

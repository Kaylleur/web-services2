import { Controller, Get, Post, Delete, Param, Body, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { CourseService } from '../services/course.service';
import { CreateCourseDto } from '../dto/course.dto';
import { CourseEntity } from '../entities/course.entity';

@Controller('courses')
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
  async delete(@Param('id', new ParseUUIDPipe({
    errorHttpStatusCode: 404,
  })) id: string): Promise<void> {
    return this.courseService.delete(id);
  }
}

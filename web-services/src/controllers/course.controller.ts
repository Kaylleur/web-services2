import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { CourseService } from '../services/course.service';
import { CreateCourseDto } from '../dto/course.dto';
import { CourseEntity } from '../entities/course.entity';
import { AuthGuard } from '../guards/auth.guards';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('courses')
@ApiBearerAuth()
@Controller('courses')
@UseGuards(AuthGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({
    description: 'list courses'
  })
  @ApiResponse({
    status: 200,
    description: 'array of courses',
    type: CourseEntity,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<CourseEntity[]> {
    return this.courseService.findAll();
  }

  @ApiOperation({
    description: 'get a course by id'
  })
  @ApiResponse({
    status: 200,
    description: 'a course',
    type: CourseEntity,
  })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the course',
    example: '9f192163-a1ef-4545-a68a-bf02ceef29c5'
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CourseEntity> {
    return this.courseService.findOne(id);
  }

  @ApiOperation({
    description: 'create a course'
  })
  @ApiResponse({
    status: 201,
    description: 'a course',
    type: CourseEntity,
  })
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<CourseEntity> {
    return this.courseService.create(createCourseDto);
  }

  @ApiOperation({
    description: 'delete a course'
  })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the course',
    example: '9f192163-a1ef-4545-a68a-bf02ceef29c5'
  })
  @ApiResponse({
    status: 204,
    description: 'course deleted',
  })
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe({
    errorHttpStatusCode: 404,
  })) id: string): Promise<void> {
    return this.courseService.delete(id);
  }
}

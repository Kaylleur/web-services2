import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from './services/course.service';
import { StudentService } from './services/student.service';
import { CourseEntity } from './entities/course.entity';
import { StudentEntity } from './entities/student.entity';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { StudentController } from './controller/student.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pguser',
      password: 'pgpass',
      database: 'pgdb',
      entities: [CourseEntity, StudentEntity, EnrollmentEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CourseEntity, StudentEntity, EnrollmentEntity]),],
  controllers: [StudentController],
  providers: [CourseService, StudentService],
})
export class AppModule {}

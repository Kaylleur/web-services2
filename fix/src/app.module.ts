import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from './services/course.service';
import { StudentService } from './services/student.service';
import { CourseEntity } from './entities/course.entity';
import { StudentEntity } from './entities/student.entity';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { StudentController } from './controllers/student.controller';
import { CourseController } from './controllers/course.controller';
import { JwtModule } from '@nestjs/jwt';
import { BasicAuthGuard } from './guards/basic-auth.guard';

@Module({
    imports: [
        JwtModule.register({}),
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
        TypeOrmModule.forFeature([CourseEntity, StudentEntity, EnrollmentEntity]),
    ],
    controllers: [StudentController, CourseController],
    providers: [CourseService, StudentService, BasicAuthGuard],
})
export class AppModule {
}

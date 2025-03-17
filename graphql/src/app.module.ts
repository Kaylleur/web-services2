import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { StudentEntity } from './entities/student.entity';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CourseResolver } from './resolvers/course.resolver';
import { EnrollmentResolver } from './resolvers/enrollment.resolver';
import { StudentResolver } from './resolvers/student.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';

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
        GraphQLModule.forRoot<ApolloDriverConfig>({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            driver: ApolloDriver
        }),
        TypeOrmModule.forFeature([CourseEntity, StudentEntity, EnrollmentEntity]),
        AuthModule,
    ],
    providers: [
      CourseResolver,
      EnrollmentResolver,
      StudentResolver,
    ]
})
export class AppModule {
}

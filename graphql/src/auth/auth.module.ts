// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from '../entities/course.entity';
import { StudentEntity } from '../entities/student.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'MA_SUPER_CLE_SECRETE',  // À externaliser en variable d'environnement
      signOptions: { expiresIn: '1d' }, // ex: 1 jour
    }),
    TypeOrmModule.forFeature([StudentEntity]),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}

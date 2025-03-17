// src/auth/auth.resolver.ts
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UnauthorizedException, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth.guard';
import { CurrentUser } from './current-user.decorator';

import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth-response';
import { StudentEntity } from '../entities/student.entity';
import { StudentType } from '../resolvers/student.resolver';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {
  }

  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginInput): Promise<AuthResponse> {
    const user = await this.authService.getUserByEmailPassword(input.email, input.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Query(() => StudentType)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() studentId: { userId: string }) {
    return this.studentRepository.findOne({ where: { id: studentId.userId } });
  }
}

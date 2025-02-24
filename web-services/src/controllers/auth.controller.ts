import { Body, Controller, Post } from '@nestjs/common';
import { LoginQueryDto } from '../dto/auth.dto';
import { StudentService } from '../services/student.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly studentService: StudentService,
  ) {
  }

  @Post('login')
  async login(@Body() loginQuery: LoginQueryDto) {
    return this.studentService.login(loginQuery);
  }

  @Post('refresh')
  async refresh(@Body() token: string) {
    return this.studentService.refresh(token);
  }
}
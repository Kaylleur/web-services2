import { Body, Controller, Post } from '@nestjs/common';
import { LoginQueryDto } from '../dto/auth.dto';
import { StudentService } from '../services/student.service';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly studentService: StudentService,
  ) {
  }

  @ApiOperation({
    description: 'Route to login'
  })
  @ApiUnauthorizedResponse({
    description: 'bad login or password'
  })
  @ApiOkResponse({
    description: 'return a pair of tokens',
    example: {
      access_token: "string",
      refresh_token: "string"
    }
  })
  @Post('login')
  async login(@Body() loginQuery: LoginQueryDto) {
    return this.studentService.login(loginQuery);
  }

  @ApiOperation({
    description: 'Route to refresh tokens'
  })
  @ApiResponse({
    status: 200,
    description: 'a pair of tokens',
    example: {
      access_token: "string",
      refresh_token: "string"
    }
  })
  @Post('refresh')
  async refresh(@Body('refreshToken') token: string) {
    return this.studentService.refresh(token);
  }
}
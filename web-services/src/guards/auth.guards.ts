import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {

  constructor(
    private readonly studentService: StudentService,
  ) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const bearerToken = context.switchToHttp().getRequest().headers.authorization;
    if(!bearerToken) {
      throw new UnauthorizedException('Token not found');
    }
    const token = bearerToken.split(' ')[1];
    const student = this.studentService.getStudentByToken(token);
    if (!student) {
      return false;
    }
    return true;
  }
}
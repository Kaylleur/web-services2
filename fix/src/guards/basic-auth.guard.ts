import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { StudentService } from '../services/student.service';

@Injectable()
export class BasicAuthGuard implements CanActivate {

  constructor(
    private readonly studentService: StudentService,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const basicAuth = context.switchToHttp().getRequest().headers.authorization;
    if(!basicAuth) {
      return false;
    }
    const base64Enc = basicAuth.split(' ')[1]; // Basic <b64>
    const base64Dec = atob(base64Enc); // <b64> user:mdp
    const [username, password] = base64Dec.split(':');
    const student = await this.studentService.checkCredentials(username, password);
    if (!student) {
      return false;
    }
    return true;
  }
}
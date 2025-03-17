import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

interface StudentService {
  ListStudents(request: {skip: number, limit: number}): any;
}

@Injectable()
export class AppService {

  constructor(
    @Inject('STUDENT_PACKAGE') private readonly studentPackage: ClientGrpc,
  ) {
  }

  getHello(): string {
    return this.studentPackage.getService<StudentService>('StudentService').ListStudents({
      skip: 0,
      limit: 10,
    }).toPromise();
  }
}

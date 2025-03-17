// create-enrollment.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEnrollmentInput {
  @Field()
  studentId: string;

  @Field()
  courseId: string;
}

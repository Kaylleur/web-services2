// update-course.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCourseInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;
}

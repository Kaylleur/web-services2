// create-course.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;
}

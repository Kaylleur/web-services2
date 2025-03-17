import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentEntity } from './student.entity';
import { CourseEntity } from './course.entity';

@Entity('enrollments')
export class EnrollmentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => StudentEntity, (student) => student.enrollments)
    student: StudentEntity;

    @ManyToOne(() => CourseEntity, (course) => course.enrollments)
    course: CourseEntity;

    @CreateDateColumn()
    enrollmentDate: Date;
}

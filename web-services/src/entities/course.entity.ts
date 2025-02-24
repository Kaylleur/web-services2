import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EnrollmentEntity } from './enrollment.entity';

@Entity('courses')
export class CourseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date' })
    endDate: Date;

    @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.course, { cascade: true })
    enrollments: EnrollmentEntity[];
}

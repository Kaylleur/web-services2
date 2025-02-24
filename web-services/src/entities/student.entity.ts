import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { EnrollmentEntity } from './enrollment.entity';

@Entity('students')
export class StudentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @CreateDateColumn()
    registrationDate: Date;

    @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.student, { cascade: true })
    enrollments: EnrollmentEntity[];

    @Column({select: false})
    password: string;
}

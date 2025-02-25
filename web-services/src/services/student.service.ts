import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from '../entities/student.entity';
import { CreateStudentDto } from '../dto/student.dto';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { compare, hashSync } from 'bcrypt';
import { LoginQueryDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class StudentService {
    constructor(
      private readonly jwtService: JwtService,
      @InjectRepository(StudentEntity)
      private studentRepository: Repository<StudentEntity>,
      @InjectRepository(EnrollmentEntity)
      private enrollmentRepository: Repository<EnrollmentEntity>,
    ) {
    }

    async findAll(params: {
        limit: number;
        skip: number;
    }): Promise<StudentEntity[]> {
        return this.studentRepository.find({ relations: ['enrollments', 'enrollments.course'], skip: params.skip, take: params.limit });
    }

    async findOne(id: string): Promise<StudentEntity> {
        return this.studentRepository.findOne({ where: { id }, relations: ['enrollments', 'enrollments.course'] });
    }

    async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
        const password = hashSync(createStudentDto.password, 10);
        return this.studentRepository.save({ ...createStudentDto, password });
    }

    async delete(id: string): Promise<void> {
        await this.studentRepository.delete(id);
    }

    enroll(id: string, courseId: string) {
        const enrollment = this.enrollmentRepository.create({
            student: { id },
            course: { id: courseId },
        });
        return this.enrollmentRepository.save(enrollment);
    }

    getEnrollments(id: string) {
        return this.enrollmentRepository.find({ where: { student: { id } }, relations: ['course', 'student'] });
    }

    async login(loginQuery: LoginQueryDto): Promise<{
        access_token: string,
        refresh_token: string
    }> {
        const student = await this.studentRepository.findOne({
            where: { email: loginQuery.email },
            select: ['id', 'password'],
        });
        if (!student) {
            throw new NotFoundException('Invalid email or password');
        }
        const isValid = await compare(loginQuery.password, student.password)
        if(!isValid) {
            throw new NotFoundException('Invalid email or password');
        }
        return this.generateTokens(student.id);
    }

    private generateTokens(studentId: string): {
        access_token: string,
        refresh_token: string
    } {
        const payload = { sub: studentId };
        return {
            access_token: this.jwtService.sign(payload, {
                expiresIn: '1200s',
                secret: 'super-secret',
            }),
            refresh_token: this.jwtService.sign(payload, {
                expiresIn: '7d',
                secret: 'super-very-strong-secret',
            }),
        };
    }

    async refresh(refreshToken: string) {
        const payload = this.jwtService.verify(refreshToken, { secret: 'super-very-strong-secret' });
        return this.generateTokens(payload.sub);
    }

    async getStudentByToken(token?: string) {
        if(!token) {
            throw new UnauthorizedException('Token not provided');
        }
        const payload = await this.jwtService.verify(token, {
            secret: 'super-secret',
        })
        return this.studentRepository.findOne({where:{id:payload.sub}});
    }
}

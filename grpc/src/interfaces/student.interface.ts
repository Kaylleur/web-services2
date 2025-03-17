import { StudentEntity } from '../entities/student.entity';

/**
 * Requête pour créer un nouvel étudiant
 * message CreateStudentRequest { ... }
 */
export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * Requête pour récupérer un étudiant
 * message GetStudentRequest { ... }
 */
export interface GetStudentRequest {
  id: string;
}

/**
 * Requête pour mettre à jour un étudiant
 * message UpdateStudentRequest { ... }
 */
export interface UpdateStudentRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * Requête pour supprimer un étudiant
 * message DeleteStudentRequest { ... }
 */
export interface DeleteStudentRequest {
  id: string;
}

/**
 * Requête pour lister tous les étudiants
 * message ListStudentsRequest { ... }
 */
export interface ListStudentsRequest {
  skip: number;
  limit: number;
}

/**
 * Réponse renvoyée par ListStudents
 * message ListStudentsResponse { repeated Student students = 1; }
 */
export interface ListStudentsResponse {
  students: StudentEntity[];
}

/**
 * Réponse qui renvoie un étudiant (pour Create, Get, Update, Delete)
 * message StudentResponse { Student student = 1; }
 */
export interface StudentResponse {
  student?: StudentEntity; // Student ou undefined
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  email: string;
  password?: string;
  fullName: string;
  role: 'student' | 'admin';
  phone?: string;
  academicDetails?: string;
  joinedAt: string;
}

export interface Course {
  id: string;
  name: string;
  category: string;
  duration: string;
  description: string;
  image: string;
  fullDetails?: string;
  eligibility?: string;
  fee?: string;
  intake?: string;
}

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseName: string;
  academicDetails: string;
  appliedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface Enquiry {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  interestedCourse: string;
  message: string;
  submittedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'info' | 'success' | 'warning';
}

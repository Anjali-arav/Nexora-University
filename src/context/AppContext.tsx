/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Course, Application, Enquiry, Notification } from '../types';
import { INITIAL_COURSES, INITIAL_NOTIFICATIONS } from '../data';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  courses: Course[];
  applications: Application[];
  enquiries: Enquiry[];
  notifications: Notification[];
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (fullName: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  updateProfile: (fullName: string, phone: string, academicDetails: string) => { success: boolean; message: string };
  submitApplication: (courseId: string, courseName: string, academicDetails: string) => { success: boolean; message: string };
  submitEnquiry: (studentName: string, email: string, phone: string, interestedCourse: string, message: string) => { success: boolean; message: string };
  addCourse: (course: Omit<Course, 'id'>) => { success: boolean; message: string };
  updateCourse: (course: Course) => { success: boolean; message: string };
  deleteCourse: (id: string) => { success: boolean; message: string };
  updateApplicationStatus: (id: string, status: 'Pending' | 'Approved' | 'Rejected') => { success: boolean; message: string };
  addNotification: (title: string, message: string, type: 'info' | 'success' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // 1. Users state
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('nexora_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    // Default Admin & Default Student for easier testing
    return [
      {
        id: 'admin-1',
        email: 'admin@nexora.edu',
        password: 'admin123',
        fullName: 'Nexora Admin Center',
        role: 'admin',
        joinedAt: new Date('2026-01-01').toISOString()
      },
      {
        id: 'student-1',
        email: 'student@nexora.edu',
        password: 'student123',
        fullName: 'Alex Carter',
        role: 'student',
        phone: '+1 (555) 321-4567',
        academicDetails: 'High School GPA: 3.85 / 4.0, SAT Score: 1450',
        joinedAt: new Date('2026-06-15').toISOString()
      }
    ];
  });

  // 2. Currently Logged in User state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nexora_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return null;
  });

  // 3. Courses state
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('nexora_courses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_COURSES;
  });

  // 4. Applications state
  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('nexora_applications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    // Preload one sample application for the default student
    return [
      {
        id: 'app-sample-1',
        studentId: 'student-1',
        studentName: 'Alex Carter',
        studentEmail: 'student@nexora.edu',
        studentPhone: '+1 (555) 321-4567',
        courseId: 'cs-ai',
        courseName: 'B.Tech in Artificial Intelligence & Machine Learning',
        academicDetails: 'High School GPA: 3.85 / 4.0, SAT Score: 1450',
        appliedAt: new Date('2026-06-20T10:00:00Z').toISOString(),
        status: 'Pending'
      }
    ];
  });

  // 5. Enquiries state
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem('nexora_enquiries');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'enq-sample-1',
        studentName: 'Clara Oswald',
        email: 'clara@outlook.com',
        phone: '+44 7911 123456',
        interestedCourse: 'Master of Business Administration (Global MBA)',
        message: 'Could you please provide information about evening class flexibilities and visa assistance details for international students?',
        submittedAt: new Date('2026-06-28T14:30:00Z').toISOString()
      }
    ];
  });

  // 6. Notifications state
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('nexora_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Sync state to local storage when state changes
  useEffect(() => {
    localStorage.setItem('nexora_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('nexora_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('nexora_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('nexora_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('nexora_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('nexora_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('nexora_notifications', JSON.stringify(notifications));
  }, [notifications]);


  // Actions implementation

  // Login action
  const login = (email: string, password: string) => {
    const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!matchedUser) {
      return { success: false, message: 'Invalid credentials. User account not found.' };
    }
    if (matchedUser.password !== password) {
      return { success: false, message: 'Invalid credentials. Password matches incorrectly.' };
    }
    setCurrentUser(matchedUser);
    return { success: true, message: `Successfully logged in as ${matchedUser.fullName}!` };
  };

  // Register action
  const register = (fullName: string, email: string, password: string) => {
    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return { success: false, message: 'Email already registered. Please login instead.' };
    }

    const newUser: User = {
      id: 'student_' + Math.random().toString(36).substring(2, 9),
      email: email.toLowerCase(),
      password: password,
      fullName: fullName,
      role: 'student',
      joinedAt: new Date().toISOString()
    };

    setUsers(prev => [...prev, newUser]);
    // Log in the newly registered user automatically
    setCurrentUser(newUser);

    // Create a personalized welcome notification
    const welcomeNotif: Notification = {
      id: 'notif_welcome_' + Math.random().toString(36).substring(2, 9),
      title: 'Welcome to Nexora University!',
      message: `Dear ${fullName}, thank you for registering. You can now explore complete course syllabi, apply for admissions, or request direct callbacks.`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: 'success'
    };
    setNotifications(prev => [welcomeNotif, ...prev]);

    return { success: true, message: 'Account successfully registered!' };
  };

  // Logout action
  const logout = () => {
    setCurrentUser(null);
  };

  // Update Profile action
  const updateProfile = (fullName: string, phone: string, academicDetails: string) => {
    if (!currentUser) {
      return { success: false, message: 'No active session found.' };
    }

    const updatedUser = { ...currentUser, fullName, phone, academicDetails };
    setCurrentUser(updatedUser);

    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    return { success: true, message: 'Student profile updated successfully!' };
  };

  // Submit Application action
  const submitApplication = (courseId: string, courseName: string, academicDetails: string) => {
    if (!currentUser) {
      return { success: false, message: 'Authorization required. Please register or login.' };
    }

    // Check if student already applied for this course
    const alreadyApplied = applications.some(app => app.studentId === currentUser.id && app.courseId === courseId);
    if (alreadyApplied) {
      return { success: false, message: `You have already submitted an application for ${courseName}.` };
    }

    const newApplication: Application = {
      id: 'app_' + Math.random().toString(36).substring(2, 9),
      studentId: currentUser.id,
      studentName: currentUser.fullName,
      studentEmail: currentUser.email,
      studentPhone: currentUser.phone || 'Not Specified',
      courseId,
      courseName,
      academicDetails,
      appliedAt: new Date().toISOString(),
      status: 'Pending'
    };

    setApplications(prev => [newApplication, ...prev]);

    // Send success notification
    const appNotif: Notification = {
      id: 'notif_app_' + Math.random().toString(36).substring(2, 9),
      title: 'Application Received Successfully',
      message: `Your admission enrollment for "${courseName}" has been successfully recorded and is under review by Nexora Registrar Center.`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: 'info'
    };
    setNotifications(prev => [appNotif, ...prev]);

    return { success: true, message: `Your application for ${courseName} has been submitted successfully.` };
  };

  // Submit Enquiry (Call Now popup or normal contact forms)
  const submitEnquiry = (studentName: string, email: string, phone: string, interestedCourse: string, message: string) => {
    const newEnquiry: Enquiry = {
      id: 'enq_' + Math.random().toString(36).substring(2, 9),
      studentName,
      email,
      phone,
      interestedCourse,
      message,
      submittedAt: new Date().toISOString()
    };

    setEnquiries(prev => [newEnquiry, ...prev]);
    return { success: true, message: 'Thank you! Your callback and course enquiry has been received. Our counselor will contact you within 24 hours.' };
  };

  // Admin: Add a course
  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: 'course_' + Math.random().toString(36).substring(2, 9)
    };
    setCourses(prev => [newCourse, ...prev]);
    return { success: true, message: `Course "${newCourse.name}" has been added successfully.` };
  };

  // Admin: Update a course
  const updateCourse = (updatedCourse: Course) => {
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    return { success: true, message: `Course "${updatedCourse.name}" updated successfully.` };
  };

  // Admin: Delete a course
  const deleteCourse = (id: string) => {
    const course = courses.find(c => c.id === id);
    if (!course) {
      return { success: false, message: 'Course not found.' };
    }
    setCourses(prev => prev.filter(c => c.id !== id));
    return { success: true, message: `Course "${course.name}" has been deleted.` };
  };

  // Admin: Update application status
  const updateApplicationStatus = (id: string, status: 'Pending' | 'Approved' | 'Rejected') => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        return { ...app, status };
      }
      return app;
    }));

    // Optionally notify the student
    const application = applications.find(a => a.id === id);
    if (application) {
      const statusNotif: Notification = {
        id: 'notif_status_' + Math.random().toString(36).substring(2, 9),
        title: `Admission Status Update: ${status}`,
        message: `Your application for "${application.courseName}" has been changed to: ${status.toUpperCase()}. Please check your dashboard for onboarding details.`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        type: status === 'Approved' ? 'success' : status === 'Rejected' ? 'warning' : 'info'
      };
      setNotifications(prev => [statusNotif, ...prev]);
    }

    return { success: true, message: `Application status successfully set to "${status}".` };
  };

  // Add standard notification
  const addNotification = (title: string, message: string, type: 'info' | 'success' | 'warning') => {
    const newNotif: Notification = {
      id: 'notif_' + Math.random().toString(36).substring(2, 9),
      title,
      message,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        courses,
        applications,
        enquiries,
        notifications,
        login,
        register,
        logout,
        updateProfile,
        submitApplication,
        submitEnquiry,
        addCourse,
        updateCourse,
        deleteCourse,
        updateApplicationStatus,
        addNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside an AppProvider');
  }
  return context;
}

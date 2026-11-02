import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service.js';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(forwardRef(() => EnrollmentService))
    private readonly enrollmentService: EnrollmentService,
  ) {}

  sendNotification(studentName: string, message: string) {
    return {
      message: 'Notification sent successfully',
      data: { studentName, message },
    };
  }

  checkEnrollmentAndNotify(studentName: string, courseId: string) {
    return {
      message: 'Enrollment status checked',
      data: {
        studentName,
        courseId,
        enrollments: this.enrollmentService.getEnrollments(),
      },
    };
  }
}

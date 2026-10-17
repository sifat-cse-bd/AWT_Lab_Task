import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { Express } from 'express';
import Multer from 'multer';

@Injectable()
export class CourseService {
  getAllCourses(): object {
    return {
      message: "All Caourses fetched successfully.",
      data: []
    };
  }

  getCourseById(id: string): object {
    return {
      message: `"Course fetched successfully`,
      id: id
    };
  }

  createCourse(dto: CreateCourseDto): object {
    return {
      message: `"Course created successfully`,
      data: dto
    }
  }

  updateCourse(id: string, dto: UpdateCourseDto): object {
    return {
      message: `"Course updated successfully`,
      id: id,
      data: dto
    }
  }

  patchCourse(id: string, dto: UpdateCourseDto): object {
    return{
      message: `Course patched successfully`,
      id: id,
      updateFields: Object.keys(dto)
    };
  }

  deleteCourse(id: string): object {
    return { message: `"Course deleted successfully", id: ${id}` };
  }

  uploadCourseMetarials(id:string, file: Express.Multer.File): object {
    return{
      message: `"Course Metarials uploaded successfully"`,
      courseId: id,
      filename: file.filename,
      path: file.path
    }
  }
}
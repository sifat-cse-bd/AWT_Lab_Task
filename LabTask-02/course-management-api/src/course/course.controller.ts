import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CourseService } from './course.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path'; 

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getAllCourses(): object {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  getCourseById(@Param('id') id: string): object {
    return this.courseService.getCourseById(id);
  } 

  @Post()
  createCourse(@Body()createCourseDto: CreateCourseDto): object {
    return this.courseService.createCourse(createCourseDto);
  }

  @Put(':id')
  updateCourse(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): object {
    return this.courseService.updateCourse(id, updateCourseDto);
  }

  @Patch(':id')
  patchCourse(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): object {
    return this.courseService.patchCourse(id, updateCourseDto);
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string): object {
    return this.courseService.deleteCourse(id);
  }
  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB limit
      },
      fileFilter: (req, file, callback) => {
        const allowedExtensions = /\.(jpg|jpeg|png|pdf)$/i;
        if (!file.originalname.match(allowedExtensions)) {
          return callback(
            new BadRequestException('Only .jpg, .jpeg, .png, and .pdf files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  uploadCourseMaterial(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required for upload.');
    }
    return this.courseService.uploadCourseMaterial(id, file);
  }
}
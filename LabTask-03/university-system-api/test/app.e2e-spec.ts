import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/enrollment (GET)', () => {
    return request(app.getHttpServer())
      .get('/enrollment')
      .expect(200)
      .expect({ message: 'All enrollments fetched', data: [] });
  });

  it('/enrollment (POST)', () => {
    return request(app.getHttpServer())
      .post('/enrollment')
      .send({ studentName: 'John Doe', courseId: '101' })
      .expect(201)
      .expect({
        message: 'Student enrolled successfully',
        student: 'John Doe',
        course: { message: 'Course fetched', id: '101' },
      });
  });

  afterEach(async () => {
    await app.close();
  });
});

import request from 'supertest';
import { server } from '../index';
import fs from 'fs';

beforeAll(async () => {
  fs.writeFileSync('./data/test_courses.json', JSON.stringify([]), 'utf8');
});

afterAll(async () => {
  server.close(); // close the server after tests
});

// test to check return status when courses.json is empty
describe('GET /courses', () => {
  it('return all courses when there are no courses', async () => {
    const response = await request(server).get('/courses');
    expect(response.status).toBe(204);
  });
});

// create course test
describe('POST /courses', () => {
  it('create a new course', async () => {
    const newCourse = {
      title: 'Test Course',
      description: 'test course',
      module_name: 'module name',
      lesson_name: 'lesson name',
      lesson_description: 'lesson description',
      lesson_topics: 'lesson topics',
      content_type: 'content type',
      content_text: 'content text'
    };

    let course1 = { coursedata: newCourse };

    const response = await request(server)
      .post('/courses')
      .send(course1)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
  });
});

// obtain all courses test
describe('GET /courses', () => {
  it('return all courses', async () => {
    const response = await request(server).get('/courses');
    expect(response.status).toBe(200);
  });
});

// create already existing course test
describe('POST /courses', () => {
  it('try to create already existing course', async () => {
    const newCourse = {
      title: 'Test Course',
      description: 'test course',
      module_name: 'module name',
      lesson_name: 'lesson name',
      lesson_description: 'lesson description',
      lesson_topics: 'lesson topics',
      content_type: 'content type',
      content_text: 'content text'
    };

    let course1 = { coursedata: newCourse };

    const response = await request(server)
      .post('/courses')
      .send(course1)
      .set('Accept', 'application/json');

    expect(response.status).toBe(409);
  });
});

// update course test
describe('PUT /courses', () => {
  it('update a course', async () => {
    const newCourse = {
      title: 'Test Course',
      description: 'test course',
      module_name: 'module name',
      lesson_name: 'lesson name',
      lesson_description: 'lesson description',
      lesson_topics: 'lesson topics',
      content_type: 'content type',
      content_text: 'content text updated'
    };

    let course1 = { coursedata: newCourse };

    const response = await request(server)
      .put('/courses')
      .send(course1)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
  });
});

// update course that does not exist test
describe('PUT /courses', () => {
  it('try to update nonexistent course', async () => {
    const newCourse = {
      title: 'Nonexistent Course',
      description: 'test course',
      module_name: 'module name',
      lesson_name: 'lesson name',
      lesson_description: 'lesson description',
      lesson_topics: 'lesson topics',
      content_type: 'content type',
      content_text: 'content text updated'
    };

    let course1 = { coursedata: newCourse };

    const response = await request(server)
      .put('/courses')
      .send(course1)
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
  });
});

// delete course test
describe('DELETE /courses', () => {
  it('delete course', async () => {
    const course_title = {
      coursetitle: 'Test Course'
    };

    const response = await request(server)
      .delete('/courses')
      .send(course_title)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
  });
});

// delete course that does not exist test
describe('DELETE /courses', () => {
  it('try to delete nonexistent course', async () => {
    const course_title = {
      coursetitle: 'Nonexistent Course'
    };

    const response = await request(server)
      .delete('/courses')
      .send(course_title)
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
  });
});

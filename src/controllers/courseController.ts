import { Request, Response } from 'express';
import { Course } from '../models/course';
import fs from 'fs';

const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

let dataFilePath = '';
if (process.env.TEST_ENV == 'true') {
  dataFilePath = './data/test_courses.json';
}
else {
  dataFilePath = './data/courses.json';
}

async function loadCache(): Promise<Course[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {

      let courses: Course[] = [];

      if (data === '') {
        courses = [];
      } else {
        courses = JSON.parse(data);
      }

      cache.set('courses', courses);
      resolve(courses);
    });
  });
}

export const getCourses = async (req: Request, res: Response) => {
  let courses: Course[] | undefined = cache.get('courses');
  if (!courses) {
    courses = await loadCache();
  }
  if (courses.length == 0){
    res.status(204).json({ message: 'No courses created yet' });
    return;
  }
  res.status(200).json(courses);
};

export const createCourse = async (req: Request, res: Response) => {
  // data from post request
  const newCourse = req.body;

  // if cache is cleared load data into cache again
  let courses: Course[] | undefined = cache.get('courses');
  if (!courses) {
    courses = await loadCache();
  }

  const courseExists = courses.some(course => course.title === newCourse.title);
  if (courseExists) {
    res.status(409).json({ message: 'Course with this title already exists' });
    return;
  }

  courses.push(newCourse);
  cache.set('courses',courses);

  // write new courses to courses.json
  fs.writeFile(dataFilePath, JSON.stringify(courses, null, 2), 'utf8', (writeErr) => {
    res.status(201).json({ message: 'Course created successfully' });
    return;
  });
};


export const updateCourse = async (req: Request, res: Response) => {
  const updateCourse = req.body;

  let courses: Course[] | undefined = cache.get('courses');
  if (!courses) {
    courses = await loadCache();
  }

  const courseIndex = courses.findIndex(c => c.title === updateCourse.title);
  if (courseIndex === -1) {
    res.status(404).json({ message: 'Course not found' });
    return;
  }

  updateCourse.id = courses[courseIndex].id;
  courses[courseIndex] = updateCourse;
  cache.set('courses',courses);

  fs.writeFile(dataFilePath, JSON.stringify(courses, null, 2), 'utf8', (writeErr) => {
    res.status(200).json({ message: 'Course updated succssfully' });
  });


};

export const deleteCourse = async (req: Request, res: Response) => {
  const { coursetitle } = req.body;

  let courses: Course[] | undefined = cache.get('courses');
  if (!courses) {
    courses = await loadCache();
  }

  const courseIndex = courses.findIndex((c: Course) => c.title === coursetitle);
  if (courseIndex == -1) {
    res.status(404).json({ message: 'Course does not exist' });
    return;
  }

  // delete course from courses array
  courses.splice(courseIndex, 1);
  cache.set('courses',courses);

  fs.writeFile(dataFilePath, JSON.stringify(courses, null, 2), 'utf8', (writeErr) => {
    res.status(200).json({ message: 'Course successfully deleted' });
    return;
  });
};


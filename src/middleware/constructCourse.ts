import { Request, Response, NextFunction } from 'express';
import { Course } from '../models/course';
import fs from 'fs';

export const constructCourse = (req: Request, res: Response, next: NextFunction): void => {
    const dataPath = './data/courses.json';

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ message: 'error reading course.json in constructCourse' });
            return;
        }

        let courses: Course[] = [];
        // read data from courses.json to obtain length
        if (data) {
            try {
                courses = JSON.parse(data);
            } catch (parseErr) {
                res.status(500).json({ message: 'parsing course error in constructCourse' });
                return;
            }
        }

        const newCourse = req.body.coursedata;

        const courseData: Course = {
            id: courses.length + 1,
            title: newCourse.title,
            description: newCourse.description,
            modules: [
                {
                    title: newCourse.module_name,
                    lessons: [
                        {
                            title: newCourse.lesson_name,
                            description: newCourse.lesson_description,
                            topics: newCourse.lesson_topics,
                            content: [
                                {
                                    type: newCourse.content_type,
                                    data: newCourse.content_text,
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        req.body = courseData;

        next();
    });
};

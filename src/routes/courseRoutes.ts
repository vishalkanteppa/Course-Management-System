import { Router } from 'express';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../controllers/courseController';
import { validateCourse } from '../middleware/validateCourse';
import { constructCourse } from '../middleware/constructCourse';


const router = Router();

router.get('/', getCourses);

router.post('/', constructCourse, validateCourse, createCourse);

router.put('/', constructCourse, validateCourse, updateCourse);

router.delete('/', deleteCourse);

export default router;

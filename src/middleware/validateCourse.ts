import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const courseSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    modules: Joi.array().items(
        Joi.object({
            title: Joi.string().required(),
            lessons: Joi.array().items(
                Joi.object({
                    title: Joi.string().required(),
                    description: Joi.string(),
                    topics: Joi.array().items(Joi.string()),
                    content: Joi.array().items(
                        Joi.object({
                            type: Joi.string().valid('text', 'video', 'audio').required(),
                            data: Joi.string().required()
                        })
                    )
                })
            )
        })
    )
});

export const validateCourse = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = courseSchema.validate(req.body.coursedata);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    }
    next();
};


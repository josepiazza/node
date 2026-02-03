import { body } from 'express-validator';

export const createUserValidator = [
    body('name')
        .isString()
        .withMessage('name must be a string')
        .notEmpty()
        .withMessage('name is required')
        .isLength({ min: 2 })
        .withMessage('name must have at least 2 characters'),
];

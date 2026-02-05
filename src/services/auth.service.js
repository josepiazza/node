import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export class AuthService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    async login({ email, password }) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { sub: user.id },
            env.jwtSecret,
            {}
        );

        return { token };
    }
}

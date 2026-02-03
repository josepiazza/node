import bcrypt from 'bcrypt';

export class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    async create({ name, email, password }) {

        const user = await this.usersRepository.findByEmail(email);

        if (user) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });
    }

    async getAllUsers() {
        const users = await this.usersRepository.findAll();

        if (!users.length) {
            throw new Error('No users found');
        }

        return users;
    }
}

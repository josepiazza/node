import { UsersService } from '../../src/services/users.service.js';
import { UsersRepository } from '../../src/repositories/users.repository.js';

describe('UsersService (transactions)', () => {
    test('creates user successfully', async () => {
        const repo = new UsersRepository();
        const service = new UsersService(repo);

        const user = await service.create({
            name: 'Juan',
            email: 'juan@test.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    test('rolls back if email already exists', async () => {
        const repo = new UsersRepository();
        const service = new UsersService(repo);

        await service.create({
            name: 'Juan',
            email: 'juan@test.com',
            password: '123456',
        });

        await expect(
            service.create({
                name: 'Otro',
                email: 'juan@test.com',
                password: '123456',
            })
        ).rejects.toThrow('User already exists');
    });
});

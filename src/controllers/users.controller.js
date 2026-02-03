export class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }

    async list(req, res, next) {
        try {
            const users = await this.usersService.getAllUsers();
            res.json(users);
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const user = await this.usersService.create(req.body);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }

    async me(req, res, next) {
        try {
            const user = await this.usersService.getById(req.user.id);
            res.json(user);
        } catch (err) {
            next(err);
        }
    }
}

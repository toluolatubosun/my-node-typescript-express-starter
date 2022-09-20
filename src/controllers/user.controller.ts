import response from "./../utils/response";
import UserService from "./../services/user.service";

import type { Request, Response } from "express";

class UserController {
    async create(req: Request, res: Response) {
        const result = await UserService.create(req.body);
        res.status(200).send(response("User created", result));
    }

    async getAll(req: Request, res: Response) {
        const result = await UserService.getAll(req.query);
        res.status(200).send(response("all users", result));
    }

    async getOne(req: Request, res: Response) {
        const result = await UserService.getOne(req.params.userId);
        res.status(200).send(response("user data", result));
    }

    async getMe(req: Request, res: Response) {
        const result = await UserService.getOne(req.$user.id);
        res.status(200).send(response("user data", result));
    }

    async update(req: Request, res: Response) {
        const result = await UserService.update(req.params.userId, req.body);
        res.status(200).send(response("user updated", result));
    }

    async updateMe(req: Request, res: Response) {
        const result = await UserService.update(req.$user.id, req.body);
        res.status(200).send(response("user updated", result));
    }

    async delete(req: Request, res: Response) {
        const result = await UserService.delete(req.params.userId);
        res.status(200).send(response("user deleted", result));
    }
}

export default new UserController();

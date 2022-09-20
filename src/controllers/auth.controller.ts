import response from "../utils/response";
import AuthService from "../services/auth.service";

import type { Request, Response } from "express";

class AuthController {
    async register(req: Request, res: Response) {
        const result = await AuthService.register(req.body);
        res.status(201).send(response("new user registered successfully", result));
    }

    async login(req: Request, res: Response) {
        const result = await AuthService.login(req.body);
        res.status(200).send(response("user login successful", result));
    }

    async refreshAccessToken(req: Request, res: Response) {
        const result = await AuthService.refreshAccessToken(req.body);
        res.status(200).send(response("access token refreshed successfully", result));
    }

    async logout(req: Request, res: Response) {
        const result = await AuthService.logout(req.body);
        res.status(200).send(response("user logout successful", result));
    }

    async verifyEmail(req: Request, res: Response) {
        const result = await AuthService.verifyEmail(req.body);
        res.status(200).send(response("email verified successfully", result));
    }

    async requestEmailVerification(req: Request, res: Response) {
        const result = await AuthService.requestEmailVerification(req.query.email as string);
        res.status(200).send(response("email verification link sent", result));
    }

    async requestPasswordReset(req: Request, res: Response) {
        const result = await AuthService.requestPasswordReset(req.query.email as string);
        res.status(200).send(response("password reset link sent", result));
    }

    async resetPassword(req: Request, res: Response) {
        const result = await AuthService.resetPassword(req.body);
        res.status(200).send(response("password updated", result));
    }

    async updatePassword(req: Request, res: Response) {
        const result = await AuthService.updatePassword(req.$user.id, req.body);
        res.status(200).send(response("password updated", result));
    }
}

export default new AuthController();

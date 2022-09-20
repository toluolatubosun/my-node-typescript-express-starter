import JWT from "jsonwebtoken";
import User from "./../models/user.model";
import { ROLE, JWT_SECRET } from "./../config";
import CustomError from "./../utils/custom-error";

import type { Request, Response, NextFunction } from "express";

/**
 * If no role is passed the default role is user
 *
 * @param  {any[]} roles List of roles allowed to access the route
 */
const auth = (roles: string[] = []) => {
    roles = roles.length > 0 ? roles : ROLE.USER;

    return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.headers.authorization) throw new CustomError("unauthorized access: Token not found", 401);

        const token = req.headers.authorization.split(" ")[1];
        const decoded = JWT.verify(token, JWT_SECRET) as JWTPayload;

        const user = await User.findOne({ _id: decoded.id });

        if (!user) throw new CustomError("unauthorized access: User does not exist", 401);
        if (!user.isActive) throw new CustomError("unauthorized access: User has been deactivated", 401);
        if (!user.isVerified) throw new CustomError("unauthorized access: Please verify email address", 401);
        if (!roles.includes(user.role)) throw new CustomError("unauthorized access", 401);

        req.$user = user;

        next();
    };
};

export default auth;

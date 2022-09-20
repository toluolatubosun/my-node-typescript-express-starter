import trimObjectStrings from "../utils/trim-object-strings";

import type { Request, Response, NextFunction } from "express";

const trimIncomingRequests = (req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
        req.body = trimObjectStrings(req.body);
    }

    if (req.query) {
        req.query = trimObjectStrings(req.query);
    }

    if (req.params) {
        req.params = trimObjectStrings(req.params);
    }

    next();
};

export default trimIncomingRequests;

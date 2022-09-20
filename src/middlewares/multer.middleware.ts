import multer from "./../utils/multer";

import type { Request, Response, NextFunction } from "express";

const addPathToBody = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        req.body[req.file.fieldname] = req.file.path.replace("\\", "/");
    }

    if (req.files) {
        const files = req.files as Express.Multer.File[];
        req.body[files[0].fieldname] = files.map((file) => file.path.replace("\\", "/"));
    }

    next();
};

export default {
    single: (field: string) => {
        return [multer.single(field), addPathToBody];
    },
    multiple: (field: string, maxCount: number) => {
        return [multer.array(field, maxCount), addPathToBody];
    }
};

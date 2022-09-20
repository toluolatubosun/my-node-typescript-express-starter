import multer from "multer";
import { nanoid } from "nanoid";
import CustomError from "./custom-error";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Store files in "uploads" folder
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        // Generate unique filename form current date and nanoid
        const fileExt = file.originalname.split(".").pop();
        const filename = `${nanoid()}_${new Date().getTime()}.${fileExt}`;

        cb(null, filename);
    }
});

const limits = {
    // Maximum file size of 5mb
    fileSize: 5 * 1024 * 1024
};

const fileFilter = (req: any, file: any, cb: any) => {
    //Accepted file types
    const mimeTypes = ["image/jpeg", "image/png"];

    // Check if file type is accepted
    if (mimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new CustomError("Invalid file type", 400), false);
    }
};

export default multer({ storage, limits, fileFilter });

export const PORT = process.env.PORT || 4000;
export const BCRYPT_SALT = process.env.BCRYPT_SALT || 10;
export const APP_NAME = "my-node-typescript-express-starter";
export const CLOUDINARY_URL = process.env.CLOUDINARY_URL || "";
export const JWT_SECRET = process.env.JWT_SECRET || "000-12345-000";
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/my-node-typescript-express-starter";
export const ROLE = {
    ADMIN: ["admin"],
    USER: ["user", "admin"]
};
export const URL = {
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000"
};
export const MAILER = {
    USER: process.env.MAILER_USER || "",
    PORT: process.env.MAILER_PORT || 465,
    SECURE: process.env.MAILER_SECURE || false,
    PASSWORD: process.env.MAILER_PASSWORD || "",
    HOST: process.env.MAILER_HOST || "smtp.gmail.com"
};

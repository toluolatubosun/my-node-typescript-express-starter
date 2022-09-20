# My Node Typescript Express Starter

## Technologies

-   Node
-   Typescript
-   Express
-   Mongoose

## Linters

-   Eslint
-   Prettier

## How to handle files uploads

### Using Cloudinary

-   The default Implementation is using Cloudinary
-   The files are sent to the server in the form of a base64 string and then uploaded to Cloudinary
-   Ensure to create an account on Cloudinary and add the credentials to the .env files

### Using Multer

-   The multer middleware is already configured
-   It can handle both single and multiple file uploads
-   use it as follows

```typescript
import { Router } from Express;
import upload from "./middlewares/multer.middleware";

const router = Router();

router.post("/single-upload", upload.single("image"), (req, res) => {
  // req.body.image: string - will hold the text field, where the file was uploaded on the server
});

router.post("/multiple-upload", upload.multiple("images", 2), (req, res) => {
  // req.body.images: string[] - will hold the text fields, where the files were uploaded on the server
});
```
- There is a cleanup utility function to delete files in `utils/delete-files.ts`

### Multer + Cloudinary

This is an other method that you might find interesting depending on your use case.<br>
It would involve using multer to upload the files to the server and then using cloudinary to upload the files to the cloud.<br>
For this you would have to change the `utils/multer.ts` file to make use of memory storage instead of disk storage. Then upload the file buffer using the function in `utils/cloudinary.ts`.

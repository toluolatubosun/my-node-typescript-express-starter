import fs from "fs/promises";

import CustomError from "./custom-error";

const deleteFiles = async (files: string[]) => {
    for (const file of files) {
        try {
            await fs.unlink(file);
        } catch (error) {
            throw new CustomError(`file not found in root directory \"${file}\"`);
        }
    }

    return true;
};

export default deleteFiles;

import User from "./../models/user.model";
import CloudinaryUtil from "../utils/cloudinary";
import CustomError from "./../utils/custom-error";

import type { UploadApiResponse } from "cloudinary";

class UserService {
    async create(data: UserDataInput) {
        if (data.image) {
            data.image = await this.uploadImage(data.image);
        }

        return await new User(data).save();
    }

    async getAll(pagination: PaginationInput) {
        /* Note:
         * - if sorting in ascending order (1) then use $gt
         * - if sorting in descending order (-1) then use $lt
         */
        const { limit = 5, next } = pagination;
        let query = {};

        const total = await User.countDocuments(query);

        if (next) {
            const [nextId, nextCreatedAt] = next.split("_");
            query = {
                ...query,
                $or: [{ createdAt: { $gt: nextCreatedAt } }, { createdAt: nextCreatedAt, _id: { $gt: nextId } }]
            };
        }

        const users = await User.find(query, { password: 0, __v: 0 })
            .sort({ createdAt: 1, _id: 1 })
            .limit(Number(limit) + 1);

        const hasNext = users.length > limit;
        if (hasNext) users.pop(); // Remove the extra user from the array

        const nextCursor = hasNext ? `${users[users.length - 1]._id}_${users[users.length - 1].createdAt.getTime()}` : null;

        return {
            users,
            pagination: {
                total,
                hasNext,
                next: nextCursor
            }
        };
    }

    async getOne(userId: string) {
        const user = await User.findOne({ _id: userId }, { password: 0, __v: 0 });
        if (!user) throw new CustomError("user does not exist");

        return user;
    }

    async update(userId: string, data: UserDataInput, access = "user") {
        if (access !== "admin") {
            delete data.role, data.email, data.password;
        }

        if (data.image) {
            data.image = await this.uploadImage(data.image);
            await this.deleteUserImage(userId); // Delete the old image
        }

        const user = await User.findByIdAndUpdate({ _id: userId }, { $set: data }, { new: true });
        if (!user) throw new CustomError("user does not exist");

        return user;
    }

    async delete(userId: string) {
        await this.deleteUserImage(userId);

        const user = await User.findByIdAndDelete({ _id: userId });
        if (!user) throw new CustomError("user does not exist");

        return user;
    }

    /** Helper function */
    async deleteUserImage(userId: string) {
        const user = await this.getOne(userId);
        if (!user.image) return true;

        return await CloudinaryUtil.delete(user.image);
    }

    /** Helper function */
    async uploadImage(image: string) {
        return ((await CloudinaryUtil.uploadBase64(image, "users")) as UploadApiResponse).secure_url;
    }
}

export default new UserService();

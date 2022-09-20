import mongoose from "mongoose";
import { MONGODB_URI } from "../config";

mongoose.connect(MONGODB_URI, {}, (err) => {
    if (err) {
        console.error("<::: Couldn't connect to database", err);
    } else {
        console.log(`:::> Connected to MongoDB database. ${MONGODB_URI}`);
    }
});

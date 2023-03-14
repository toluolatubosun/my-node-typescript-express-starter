interface UserDataInput {
    name: string;
    email: string;
    image?: string;
    password: string;
    role?: "user" | "admin";
}

interface UserUpdateInput {
    name?: string;
    image?: string;
}

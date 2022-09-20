interface JWTPayload {
    id: string;
    iat: number;
    exp: number;
    role: "user" | "admin";
}

interface PaginationInput {
    limit?: number;
    next?: string;
}

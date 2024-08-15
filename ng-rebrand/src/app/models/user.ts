export enum EnumRoles {
    Premium = "premium",
    Admin = "admin",
    Guest = "guest"
}

export interface User {
    _id: string;
    id: string;
    email: string;
    enabled: boolean;
    iat: number;
    exp: number;
    firstName?: string;
    lastName?: string;
    roles: EnumRoles[];
}

export const FAKE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZlYjMxM2JjNDVjN2U4M2FiOTZiNzQiLCJlbWFpbCI6ImZpcnN0TmFtZS5sYXN0TmFtZUBnbWFpbC5jb20iLCJlbmFibGVkIjp0cnVlLCJyb2xlcyI6WyJhZG1pbiJdLCJsYXN0TmFtZSI6IiIsImZpcnN0TmFtZSI6IiIsImlkIjoiNjY2ZWIzMTNiYzQ1YzdlODNhYjk2Yjc0IiwiZXhwIjo5OTk5OTk5OTk5LCJpYXQiOjk5OTk5OTk5OTl9.bmjq7ywOkiu9HYEKC9HN1LVlfsIOTFlXhVGA4mta2KI";

export const ANONYMOUS_USER: User = {
    _id: "",
    id: "",
    email: "firstName.lastName@email.com",
    enabled: false,
    iat: 0,
    exp: 9999999999,
    roles: []
}
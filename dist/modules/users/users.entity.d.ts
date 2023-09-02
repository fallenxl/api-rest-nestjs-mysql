export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    emailAndUsernameToLowerCase(): void;
    hashPassword(): void;
}

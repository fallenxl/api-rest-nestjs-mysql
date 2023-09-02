export declare class Task {
    id: number;
    username: string;
    password: string;
    created_at: Date;
    usernameToLowerCase(): void;
    hashPassword(): void;
}

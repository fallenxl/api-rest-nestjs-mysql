import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(credentials: CredentialsDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}

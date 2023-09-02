import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(user: CredentialsDto): Promise<{
        access_token: string;
    }>;
    signUp(user: CredentialsDto): Promise<{
        access_token: string;
    }>;
}

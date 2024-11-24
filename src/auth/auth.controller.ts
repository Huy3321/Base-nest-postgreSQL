import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signup.dto";
import { loginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() SignUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signup(SignUpDto)
    }

    @Post('/login')
    login(@Body() loginDto: loginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto)
    }
}
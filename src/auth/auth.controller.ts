import { Body, Controller, HttpStatus, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signup.dto";
import { loginDto } from "./dto/login.dto";
import User from "src/user/user.entity";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        try {
            const result = await this.authService.signup(signUpDto);
            return {
                status: HttpStatus.OK,
                message: 'Signup successful',
                data: result,
            };
        } catch (error) {
            return {
                status: HttpStatus.BAD_REQUEST,
                message: error.message || 'Signup failed',
            };
        }
    }

    @Post('/login')
    async login(@Body() loginDto: loginDto) {
        try {
            const result = await this.authService.login(loginDto);
            return {
                status: HttpStatus.OK,
                message: 'Login successful',
                data: {
                    result,
                }
            };
        } catch (error) {
            return {
                status: HttpStatus.BAD_REQUEST,
                message: error.message || 'Login failed',
            };
        }
    }

    @Post('/refresh-token')
    async refreshToken(@Body('refreshToken') refreshToken: string) {
        try {
            if (!refreshToken) {
                throw new Error('Refresh token is required');
            }
            const result = await this.authService.refreshTokens(refreshToken);
            return {
                status: HttpStatus.OK,
                message: 'Token refreshed successfully',
                data: result,
            };
        } catch (error) {
            return {
                status: HttpStatus.BAD_REQUEST,
                message: error.message || 'Failed to refresh token',
            };
        }
    }
}
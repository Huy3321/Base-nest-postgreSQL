import { Body, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Sign } from "crypto";
import User from "src/user/user.entity";
import { Repository } from "typeorm";
import { SignUpDto } from "./dto/signup.dto";
import * as bcrypt from 'bcryptjs'
import { loginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async signup(signUpDto: SignUpDto): Promise<{ token: string; refreshToken: string; user: User}> {
        const { name, email, password } = signUpDto;


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await this.usersRepository.save(user);

        const token = this.jwtService.sign({ id: user.id })
        const refreshToken = this.jwtService.sign({ id: user.id }, { expiresIn: '7d' }); 

        return {user, token , refreshToken };
    }


    async login(loginDto: loginDto): Promise<{ token: string; refreshToken: string; user: User }> {
        const { email, password } = loginDto;

        const user = await this.usersRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const token = this.jwtService.sign({ id: user.id });
        const refreshToken = this.jwtService.sign({ id: user.id }, { expiresIn: '7d' }); 

        return {user, token, refreshToken  };
    }

    async refreshTokens(refreshToken: string): Promise<{ accessToken: string }> {
        try {
            // Xác thực Refresh Token
            const payload = this.jwtService.verify(refreshToken);
    
            // Nếu hợp lệ, tạo Access Token mới
            const accessToken = this.jwtService.sign({ id: payload.id });
    
            return { accessToken };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}


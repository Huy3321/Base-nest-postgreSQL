import { InjectRepository } from "@nestjs/typeorm";
import User from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from './dto/user.dto'

export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async getAllUser() {
        const users = this.usersRepository.find();
        return users;
    }

    async createUser(createUserDto: CreateUserDto) {
        const newUser = await this.usersRepository.create(createUserDto);
        await this.usersRepository.save({
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
        });
        return newUser
    }
}
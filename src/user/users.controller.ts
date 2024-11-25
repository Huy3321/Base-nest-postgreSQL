import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import User from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto} from './dto/user.dto'

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService){}

    @Get()
    async getAllUser(): Promise<User[]> {
        const users = await this.usersService.getAllUser();
        return users
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        try {
            // Tạo người dùng
            const user = await this.usersService.createUser(createUserDto);

            // Trả về kết quả thành công
            return {
                status: 200,

                data: user,
            };
        } catch (error) {
            // Nếu có lỗi, trả về thông tin lỗi
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,

                message: 'User creation failed',  // Lỗi tùy chỉnh
            }, HttpStatus.BAD_REQUEST);
        }
    }
}
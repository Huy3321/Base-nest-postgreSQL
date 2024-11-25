import { Body, Controller, Get, Post, HttpException, HttpStatus } from "@nestjs/common";
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';
import Category from './category.entity';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getAllCategory(): Promise<{ statusCode: number, message: string, data: Category[] }> {
        try {
            const categories = await this.categoryService.getAllCategory();
            return {
                statusCode: 200,
                message: 'Categories fetched successfully',
                data: categories,
            };
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to fetch categories',
                error: error.message,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<{ statusCode: number, message: string, data: Category }> {
        try {
            const category = await this.categoryService.createCategory(createCategoryDto);
            return {
                statusCode: 201,
                message: 'Category created successfully',
                data: category,
            };
        } catch (error) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Category creation failed',
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }
}

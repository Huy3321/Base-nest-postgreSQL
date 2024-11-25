import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCategoryDto } from './dto/category.dto'
import Category from "./category.entity";

export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private CategoryRepository: Repository<Category>,
    ) { }

    async getAllCategory() {
        const Category = this.CategoryRepository.find();
        return Category;
    }

    async createCategory(CreateCategoryDto: CreateCategoryDto) {
        const newCategory = await this.CategoryRepository.create(CreateCategoryDto);
        await this.CategoryRepository.save({
            name: CreateCategoryDto.name,
        });
        return newCategory
    }
}
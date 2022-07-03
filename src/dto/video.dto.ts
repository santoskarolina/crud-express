import { Category } from "../entities/category.entity"
import { IsString, MaxLength, MinLength } from "class-validator";

export class VideoDto {
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    name: string

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    description: string

    duration: number

    category: Category
}
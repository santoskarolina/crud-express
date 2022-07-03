import { IsString, MaxLength, MinLength } from "class-validator";

export class CategoryDto {
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    name: string;
  
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    description: string;
  }
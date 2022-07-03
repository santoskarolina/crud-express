import { validate, ValidationError } from "class-validator";
import myDataSource from "../../../data-source";
import { CategoryDto } from "../../dto/category.dto";
import { Category } from "../../entities/category.entity";
import { HttpStatus, MyErrorTypes } from "../../entities/error.enum";
import { Video } from "../../entities/video.entity";
import { VideoService } from "../video/videoService";

type CategoryRequest = {
  name: string;
  description: string;
};

export class CategoryService {
  repository = myDataSource.getRepository(Category);

  async create({ name, description }: CategoryRequest) {
    const category = new CategoryDto();
    category.name = name;
    category.description = description;

    const errors = await validate(category);
    if (errors.length > 0) {
      const message = errors.map((error: ValidationError) => {
        return {
          message: Object.values(error.constraints),
          property: error.property,
        };
      });
      return message;
    }
    try {
      const categoryFind = await this.repository.findOne({
        where: {
          name: name,
        },
      });

      if (categoryFind) {
        return {
          error: MyErrorTypes.CATEGORY_ALREADY_EXISTIS,
          message: "Category already existe",
          statusCode: HttpStatus.BAD_REQUEST,
        };
      } else {
        const category = await this.repository.save({ name, description });
        return category;
      }
    } catch (err) {
      return {
        error: MyErrorTypes.FAILED_TO_CREATE_CATEGORY,
        message: "Failed to create category",
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async listCategories() {
    const categories = await this.repository.find();
    return { categories: categories, totalSize: categories.length };
  }

  async getOne(_id: number) {
    try {
      const categoryFind = await this.repository.findOneBy({
        category_id: _id,
      });

      if (categoryFind) {
        return categoryFind;
      } else {
        return {
          error: MyErrorTypes.NOT_FOUND,
          message: "Category not found",
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (err) {
      return {
        error: MyErrorTypes.FAILED_TO_FIND_CATEGORY,
        message: "Failed to find category",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async listVideos(_id: number) {
    const videoRepository = myDataSource.getRepository(Video);

    const category = await this.repository.findOne({
      where: { category_id: _id },
    });
    console.log("category service", category);
    if (category) {
      const videos = await videoRepository.find({
        relations: { category: true },
        where: {
          category: {
            category_id: _id,
          },
        },
      });
      return { videos: videos, totalSize: videos.length };
    } else {
      return {
        error: MyErrorTypes.NOT_FOUND,
        message: "Category not found",
        statusCode: HttpStatus.NOT_FOUND,
      };
    }
  }

  async deleteOne(_id: number) {
    try {
      const categoryFind = await this.repository.findOneBy({
        category_id: _id,
      });

      if (categoryFind) {
        await this.repository.delete(_id);
        return {
          statusCode: HttpStatus.OK,
          message: "Category deleted successfully",
        };
      } else {
        return {
          error: MyErrorTypes.NOT_FOUND,
          message: "Category not found",
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (err) {
      return {
        error: MyErrorTypes.FAILED_TO_CREATE_CATEGORY,
        message: "Failed to get category",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async update({ name, description }: CategoryRequest, _id: number) {
    try {
      const category = await this.repository.findOne({
        where: {
          category_id: _id,
        },
      });

      if (category) {
        const update = await this.repository
          .createQueryBuilder()
          .update(Category)
          .set({ name: name, description: description })
          .where("category_id = :category_id", { category_id: _id })
          .execute();

        return update;
      } else {
        return {
          error: MyErrorTypes.NOT_FOUND,
          message: "Category not found",
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
    } catch (err) {
      return {
        error: MyErrorTypes.FAILED_TO_UPDATE_CATEGORY,
        message: "Failed to update category",
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}

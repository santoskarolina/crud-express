import { validate, ValidationError } from "class-validator";
import myDataSource from "../../../data-source";
import { VideoDto } from "../../dto/video.dto";
import { Category } from "../../entities/category.entity";
import { HttpStatus, MyErrorTypes } from "../../entities/error.enum";
import { Video } from "../../entities/video.entity";
import { CategoryService } from "../categories/categoryService";

export type VideoRequest = {
  name: string;
  description: string;
  duration: number;
  category: Category;
};

export type VideoResponse = {
    videos: Video[];
    totalSize: number
}

export class VideoService {
  categoryService = new CategoryService();
  repository = myDataSource.getRepository(Video);

  async create(video: VideoRequest) {
    let new_video = new VideoDto();
    new_video.category = video.category;
    new_video.name = video.name;
    new_video.description = video.description;
    new_video.duration = video.duration;

    const category = await this.categoryService.getOne(
      video.category.category_id
    );
    if (category) {
      new_video.category = video.category;
    }

    const errors = await validate(new_video);
    if (errors.length > 0) {
      const message = errors.map((error: ValidationError) => {
        return {
          message: Object.values(error.constraints),
          property: error.property,
        };
      });
      return message;
    }

      const video_find = await this.repository.findOne({
        where: {
          name: video.name,
        },
      });
      if (video_find) {
        return {
          error: MyErrorTypes.VIDEO_ALREADY_EXISTIS,
          message: "Video already exists",
          statusCode: HttpStatus.BAD_REQUEST,
        };
      } else {
        const newVideo = await this.repository.save(video);
        return newVideo;
      }
  }

  async listVideos() {
    const videos = await this.repository.find({
      relations: ['category']
    });
    return { videos: videos, totalSize: videos.length };
  }

  async getOne(_id: number) {
    const video = await this.repository.findOne({
      where: { video_id: _id,},
      relations: {category: true,},
    });

    if (video) {
      return video;
    } else {
      return {
        error: MyErrorTypes.NOT_FOUND,
        message: "Video not found",
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async deleteOne(_id: number) {
    try {
      const video = await this.repository.findOne({
        where: {
          video_id: _id,
        },
      });

      if (video) {
        await this.repository.delete(_id);
        return { status: HttpStatus.OK, message: "Video delete successfully" };
      } else {
        return {
          error: MyErrorTypes.NOT_FOUND,
          message: "Video not found",
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (err) {
      return {
        error: MyErrorTypes.FAILED_TO_CREATE_CATEGORY,
        message: "Failed to get video",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async update(video: VideoDto, _id: number) {
    try {
      const videoFind = await this.repository.findOne({
        where: {
          video_id: _id,
        },
      });

      if (videoFind) {
        const update = await this.repository
          .createQueryBuilder()
          .update(Video)
          .set({
            name: video.name,
            description: video.description,
            duration: video.duration,
            category: video.category,
          })
          .where("video_id = :video_id", { video_id: _id })
          .execute();

        return update;
      } else {
        return {
          error: MyErrorTypes.NOT_FOUND,
          message: "Video not found",
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
    } catch (err) {
      return {
        error: MyErrorTypes.FAILED_TO_UPDATE_CATEGORY,
        message: "Failed to update video",
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}

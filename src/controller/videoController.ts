import { Request, Response } from "express";
import { VideoDto } from "../dto/video.dto";
import { VideoRequest, VideoService } from "../services/video/videoService";

export class VideoController{
    
    async create(request: Request, response: Response){
        const video: VideoRequest = request.body
        const service = new VideoService();
        const result = await service.create(video)
        return response.json(result)
    }

    async listVideos(request: Request, response: Response){
        const service = new VideoService();
        const result = await service.listVideos()
        return response.json(result)
    }

    async getOne(request: Request, response: Response){
        const service = new VideoService();
        const result = await service.getOne(parseInt(request.params.id))
        return response.json(result)
    }

    async deleteOne(request: Request, response: Response){
        const service = new VideoService();
        const result = await service.deleteOne(parseInt(request.params.id))
        return response.json(result)
    }

    async update(request: Request, response: Response){
        const video: VideoDto = request.body
        const service = new VideoService();
        const result = await service.update(video, parseInt(request.params.id))
        return response.json(result)
    }
}
import { Request, Response } from "express";
import { CategoryService } from "../services/categories/categoryService";

export class CategoryController{
    
    async create(request: Request, response: Response){
        const {name, description} = request.body
        const service = new CategoryService();
        const result = await service.create({name, description})
        return response.json(result)
    }

    async listCategories(request: Request, response: Response){
        const service = new CategoryService();
        const result = await service.listCategories()
        return response.json(result)
    }

    async listVideos(request: Request, response: Response){
        const service = new CategoryService();
        const result = await service.listVideos(parseInt(request.params.id))
        return response.json(result)
    }


    async getOne(request: Request, response: Response){
        const service = new CategoryService();
        const result = await service.getOne(parseInt(request.params.id))
        return response.json(result)
    }

    async deleteOne(request: Request, response: Response){
        const service = new CategoryService();
        const result = await service.deleteOne(parseInt(request.params.id))
        return response.json(result)
    }

    async update(request: Request, response: Response){
        const {name, description} = request.body
        const service = new CategoryService();
        const result = await service.update({name, description}, parseInt(request.params.id))
        return response.json(result)
    }
}
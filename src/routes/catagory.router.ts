import  { Router } from "express";
import { CategoryController } from "../controller/category.controller";

const categoryRouter = Router()
const controller  =  new CategoryController()

categoryRouter.post('/categorias', controller.create)
categoryRouter.get('/categorias', controller.listCategories)
categoryRouter.get('/categorias/:id', controller.getOne)
categoryRouter.delete('/categorias/:id', controller.deleteOne)
categoryRouter.put('/categorias/:id', controller.update)

categoryRouter.get('/categorias/:id/videos',controller.listVideos)


export {categoryRouter}
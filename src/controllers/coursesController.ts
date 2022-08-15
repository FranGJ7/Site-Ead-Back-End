import { Request, Response } from "express"
import { getPaginationParams } from "../helpers/getPaginationParams"
import { courseService } from "../services/courseService"

export const coursesController = {

    //Obter cursos em destaque
    featured: async (req: Request, res: Response) => {


        try {
            const featuredCourses = await courseService.getRandomFeaturedCourses()
            return res.json(featuredCourses)
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    //obtendo lista  cursos novos

    newest: async (req: Request, res: Response) => {
        try {
            const newestCourses = await courseService.getTopTenNewest()
            return res.json(newestCourses)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }

        }
    },

    
     //Fazendo buscas de curso  search?name

     search: async (req: Request, res: Response) => {
        const {name} = req.query
        const [page, perPage] = getPaginationParams(req.query)
        try {
            if(typeof name !== 'string') throw new Error('name param munst be of type string')
            const courses = await courseService.findByName(name, page, perPage)
            return res.json(courses)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }

        }
    },


       





    //Obter id de curso
    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const course = await courseService.findByIdWithEpisodes(id)
            return res.json(course)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }
}
import { Category } from "../models"

export const categoryService = {
    findAllPaginated: async (page: number, perPage: number) => {
        const offset = (page - 1) * perPage

        const { count, rows } = await Category.findAndCountAll({
            attributes: ['id', 'name', 'position'],
            order: [['position', 'ASC']], //ordem em posição e não em ordem e data após update
            limit: perPage,
            offset
        })

        return {
            categories: rows,
            page,
            perPage,
            total: count
        }
    },
    findByIdWithCourses: async (id: string) =>{
        const categoryWithCourses = await Category.findByPk(id, {
            attributes: ['id', 'name'],
            include:{
                association: 'courses',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url', 'thumbnailUrl'] //alterando nome para camelCase
                ]
            }
        })
        return categoryWithCourses
    }
}
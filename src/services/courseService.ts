import { Op } from "sequelize"
import { Course } from "../models"

export const courseService ={
    findByIdWithEpisodes: async(id: string) =>{
        const courseWithEpisodes = await Course.findByPk(id, {
        attributes:[
            'id',
            'name',
            'synopsis',
            ['thumbnail_url', 'thumbnailUrl']      //Buscando cursos com episódios
        ],
        include:{
            association:'episodes',
             attributes:[
                'id',
                'name',
                'synopsis',
                'order',
                ['video_url', 'videoUrl'],
                ['seconds_long', 'secondsLong']
             ],
             order:[['order', 'ASC']],
             separate: true
        }
    })
    return courseWithEpisodes
},
   getRandomFeaturedCourses: async () =>{
    const featuredCourses =await Course.findAll({    //Obtendo corsos em destaque
        attributes:[
            'id',
            'name',
            'synopsis',
            ['thumbnail_url', 'thumbnailUrl']
        ],
        where: {
            featured: true,            
        }
    })
    const randomFeturedCourses = featuredCourses.sort(()=> 0.5 - Math.random())
     return randomFeturedCourses.slice(0, 3)
   },

   getTopTenNewest: async () => {
    const courses = await Course.findAll({  //top 10 lançamentos de cursos
        limit: 10,
        order: [['created_at', 'DESC']]
    })

    return courses
   },

   findByName: async (name: string, page: number, perPage: number) =>{
    const offset = (page - 1) * perPage
    const {count, rows } = await Course.findAndCountAll({
    attributes:[
        'id',
        'name',
        'synopsis',
        ['thumbnail_url', 'thumbnailUrl']],
        where:{
            name: {
                [Op.iLike]:`%${name}%`
            }
        },
        limit: perPage,
        offset
    })
    return {
        courses: rows,
        page,
        perPage,
        total: count
    }

   }


}
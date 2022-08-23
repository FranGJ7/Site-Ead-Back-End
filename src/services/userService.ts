import { User } from "../models"
import { EpisodeInstance } from '../models/Episode'
import { UserCreationAttributes } from "../models/User"


function filterLastEpisodesByCourse(episodes: EpisodeInstance[]) {
    const coursesOnList: number[] = []
  
    const lastEpisodes = episodes.reduce((currentList, episode) => {
      if (!coursesOnList.includes(episode.courseId)) { //Se não tiver o curso na lista vai ser incluso na lista por não ter nada ainda
        coursesOnList.push(episode.courseId) //Incluindo 
        currentList.push(episode)  
        return currentList // Retornando a lista 
      }
  
      const episodeFromSameCourse = currentList.find(ep => ep.courseId === episode.courseId) // Pegando o curso que foi incluso
  
      if (episodeFromSameCourse!.order > episode.order) return currentList  
  
      const listWithoutEpisodeFromSameCourse = currentList.filter(ep => ep.courseId !== episode.courseId)
      listWithoutEpisodeFromSameCourse.push(episode)
  
      return listWithoutEpisodeFromSameCourse
    }, [] as EpisodeInstance[])
  
    return lastEpisodes
  }


export const userService ={
    finByEmail: async (email: string) =>{
        const user = await User.findOne({  //Buscando apenas 1 usuário atráves do email
            where: {
            email
        }
        })
        return user
    },
    
    create: async (attributes: UserCreationAttributes) =>{ //Pegando atributos já pronto usados no adminjs
        const user = await User.create(attributes)
        return user

    },


    update: async (id: number, attributes: {
      firstName: string
      lastName: string
      phone: string
      birth: Date
      email: string
    }) => {
      const [affectedRows, updatedUsers] = await User.update(attributes, { where: { id }, returning: true })
  
      return updatedUsers[0]
    },

   
    updatePassword: async (id: string | number, password: string) => {
      const [affectedRows, updatedUsers] = await User.update({
        password
      }, {
        where: { id },
        individualHooks: true,
        returning: true
      })
  
      return updatedUsers[0]
    },





  
    getKeepWatchingList: async (id: number) => {
        const userWithWatchingEpisodes = await User.findByPk(id, {
          include: {
            association: 'Episodes',
            attributes: [
              'id',
              'name',
              'synopsis',
              'order',
              ['video_url', 'videoUrl'],
              ['seconds_long', 'secondsLong'],
              ['course_id', 'courseId']
            ],
            include: [{
              association: 'Course',
              attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
              ],
              as: 'course'
            }],
            through: {
              as: 'watchTime',
              attributes: [
                'seconds',
                ['updated_at', 'updatedAt']
              ]
            }
          }
        })
    
        if (!userWithWatchingEpisodes) throw new Error('Usuário não encontrado.')

        const keepWatchingList = filterLastEpisodesByCourse(userWithWatchingEpisodes.Episodes!)
        // @ts-ignore
        keepWatchingList.sort((a, b) => a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1)

        return keepWatchingList
    
      }

 
}
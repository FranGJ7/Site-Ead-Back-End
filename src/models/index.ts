import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";

                                   //associação entre tabelas 
Category.hasMany(Course, { as: 'courses'})           //Categoria curso pode ter mais associações hasMany
Course.belongsTo(Category)         //Cursos pode pertencer a apenas uma tabela belongsTo
Course.hasMany(Episode, {as: 'episodes'})
Episode.belongsTo(Course)

export{
    Category,
    Course, 
    Episode,
    User
}
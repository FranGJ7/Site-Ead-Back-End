import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";

                                   //associação entre tabelas 
Category.hasMany(Course)           //Categoria curso pode ter mais associações hasMany
Course.belongsTo(Category)         //Cursos pode pertencer a apenas uma tabela belongsTo
Course.hasMany(Episode)
Episode.belongsTo(Course)

export{
    Category,
    Course, 
    Episode
}
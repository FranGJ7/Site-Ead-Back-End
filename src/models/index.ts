import { Category } from "./Category";
import { Course } from "./Course";

                                   //associação entre tabelas 
Category.hasMany(Course)           //Categoria curso pode ter mais associações hasMany
Course.belongsTo(Category)         //Cursos pode pertencer a apenas uma tabela belongsTo

export{
    Category,
    Course
}
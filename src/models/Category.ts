import { DataTypes, Optional, Model } from "sequelize"
import { sequelize } from "../database"

export interface Category{
    id: number               //interface de objeto
    name: string
    position: number
}

export interface CategoryCreationAttributes extends Optional<Category, 'id'>{} //Atributo de Criação

export interface CategoryInstance extends Model<Category, CategoryCreationAttributes>, Category{} // Interface de instancia


export const Category = sequelize.define<CategoryInstance, Category>('Category',{
    id: {                                                   
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      position: {
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER
      },  
    
})
import { ResourceOptions } from "adminjs";

export const categoryResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'position'],                                //Criando opçôes de recursos 
  filterProperties: ['name', 'position', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'position'],
  showProperties: ['id', 'name', 'position', 'createdAt', 'updatedAt']
}
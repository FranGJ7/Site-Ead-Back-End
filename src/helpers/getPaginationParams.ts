export function getPaginationParams(query: any): [page: number, perPage: number ]{

const {page, perPage} = query

const perPageNumber = typeof perPage === 'string' && parseInt(perPage, 10) > 0  // pegando valor em string convertendo para inteiro quantidade de categorias por página
      ? parseInt(perPage,10)
      :10

 const pageNumber = typeof page === 'string' && parseInt(page,10) > 0 ? parseInt(page,10)  //página
 :1  

return [pageNumber, perPageNumber]

}
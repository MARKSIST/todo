/* eslint-disable */
const itemCreateDtoInType = shape({
    list: id().isRequired(),
    text: string(1,1000).isRequired()
  })

const itemGetDtoInType = shape({
  itemId: id().isRequired()
})

const itemListDtoInType = shape({
  listId: id(),
  completed: boolean(),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
})
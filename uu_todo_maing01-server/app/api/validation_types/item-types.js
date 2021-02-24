/* eslint-disable */
const itemCreateDtoInType = shape({
  list: id().isRequired(),
  text: string(1, 1000).isRequired(),
});

const itemGetDtoInType = shape({
  id: id().isRequired(),
});

const itemListDtoInType = shape({
  listId: id(),
  completed: boolean(),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});

const itemDeleteDtoInType = shape({
  id: id().isRequired(),
});

const itemCompleteDtoInType = shape({
  itemId: id().isRequired(),
  completed: boolean(),
});

const itemUpdateDtoInType = shape({
  itemId: id().isRequired(),
  listId: id(),
  text: string(1, 1000),
});

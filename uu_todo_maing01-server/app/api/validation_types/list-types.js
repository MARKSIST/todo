/* eslint-disable */
const listCreateDtoInType = shape({
  name: string(1, 30).isRequired(),
});

const listGetDtoInType = shape({
  listId: id().isRequired(),
});

const listUpdateDtoInType = shape({
  listId: id().isRequired(),
  name: string(1, 30),
});

const listDeleteDtoInType = shape({
  listId: id().isRequired(),
  forceDelete: boolean(),
});

const listListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});

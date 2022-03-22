export const extractFilters = (req) => {
  const { sort, page, size } = req.query;
  const filters = {};
  if (sort) {
    filters.sort = sort;
  }
  if (!filters.sort) {
    filters.sort = "date";
  }
  if (page && !Number.isNaN(page)) {
    filters.page = +page > 1 ? +page - 1 : 0;
  }
  if (!filters.page) {
    filters.page = 0;
  }
  if (size && !Number.isNaN(size)) {
    filters.size = +size > 50 ? 50 : +size < 5 ? 5 : +size;
  }
  if (!filters.size) {
    filters.size = 10;
  }
  return filters;
};

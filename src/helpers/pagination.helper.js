class PaginationHelper {
  static paginate(data, page, size) {
    const startIndex = (page - 1) * size;
    const endIndex = page * size;

    const paginatedData = data.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      paging: {
        totalPages: Math.ceil(data.length / size),
        page,
        size,
        total: data.length
      }
    };
  }
}

module.exports = PaginationHelper;
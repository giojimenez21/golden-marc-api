export const calculatePagination = (pageNumber: number, pageSize: number, totalItems: number) => {
    const totalPages = Math.ceil(totalItems / +pageSize);
    const nextPage = pageNumber < totalPages ? pageNumber + 1 : null;
    const previousPage = pageNumber > 1 ? pageNumber - 1 : null;

    return {
        totalPages,
        nextPage,
        previousPage,
        currentPage: pageNumber
    }
};

export const calculateOffset = (pageNumber: number, pageSize: number) =>  (pageNumber - 1) * pageSize;

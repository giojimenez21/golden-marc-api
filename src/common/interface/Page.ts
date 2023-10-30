export interface Page {
    totalPages: number;
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
}
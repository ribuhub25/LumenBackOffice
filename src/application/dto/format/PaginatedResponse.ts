import JsonResponse from "./JsonResponse";

export default interface PaginatedResponse<T> extends JsonResponse<T> {
  pagination: {
    page: number,
    per_page: number,
    total_pages: number,
    total_results: number;
  },
  sort: {
    field: string,
    order: string
  },
  filters: string
}
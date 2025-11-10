import SearchResponse from "../../application/dto/format/SearchResponse";

export interface FilterService {
  getResultsInStore(search: string): Promise<SearchResponse>;
  getResultsInAdmin(search: string, token: string): Promise<void>;
}

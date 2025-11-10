import { FilterService } from "../../../domain/services/FilterService";
import SearchResponse from "../../dto/format/SearchResponse";

export class GetResultsForStore {
  constructor(private readonly filterService: FilterService) {}

  async execute(search: string): Promise<SearchResponse> {
    return await this.filterService.getResultsInStore(search);
  }
}

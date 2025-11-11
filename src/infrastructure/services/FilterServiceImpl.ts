import SearchResponse from "../../application/dto/format/SearchResponse";
import { FilterService } from "../../domain/services/FilterService";
import { supabase } from "../config/supabaseClient";

export class FilterServiceImpl implements FilterService {
  async getResultsInAdmin(search: string, token: string): Promise<void> {}
  async getResultsInStore(search: string): Promise<SearchResponse> {
    if (search && search.trim() !== "") {
      //BUSQUEDA DE MARCAS
      let brands = supabase
        .from("brand")
        .select("*", { count: "exact" })
        .ilike("name", `%${search}%`);
      let products = supabase
        .from("v_products")
        .select("*", { count: "exact" })
        .eq("status", 1)
        .or(`name.ilike.%${search}%,brand_name.ilike.%${search}%`);
      let categories = supabase
        .from("category")
        .select("*", { count: "exact" })
        .ilike("name", `%${search}%`);
      const { data: dataBrand, error: errBrand, count: cBrand } = await brands;
      const {
        data: dataProduct,
        error: errProduct,
        count: cProduct,
      } = await products;
      const {
        data: dataCategory,
        error: errCategory,
        count: cCategory,
      } = await categories;
      if (errBrand || errProduct || errCategory) {
        throw new Error(
          `Error filter: ${errBrand ?? errProduct ?? errCategory}`
        );
      }
      return {
        results: {
          brands: dataBrand,
          categories: dataCategory,
          products: dataProduct,
          keywords: [],
        },
        total: cBrand + cCategory + cProduct
      };
    }
    return {
      results: {
        brands: [],
        categories: [],
        products: [],
        keywords: [],
      },
      total: 0,
    };
  }
}

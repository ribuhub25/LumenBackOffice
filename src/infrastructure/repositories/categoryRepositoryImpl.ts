import JsonResponse from "../../application/dto/format/JsonResponse";
import PaginatedResponse from "../../application/dto/format/PaginatedResponse";
import { CategoryDTO } from "../../application/dto/models/CategoryDTO";
import { Option } from "../../application/dto/utils/Option";
import { Category } from "../../domain/models/Category";
import { CategoryRepository } from "../../domain/services/CategoryRepository";
import { supabase } from "../config/supabaseClient";
import getSupabaseClientWithToken from "../config/supabaseWithToken";

export class CategoryRepositoryImpl implements CategoryRepository {

  async update(category: Category, token: string): Promise<JsonResponse<Category>> {
    const supabaseToken = getSupabaseClientWithToken(token);
    const { data, error } = await supabaseToken
      .from("category")
      .update(category)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return {
      status: 201,
      message: "Categoria actualizada exitosamente",
      data: data ? [data] : null
    };
  }
  async save(category: Category, token: string): Promise<JsonResponse<Category>> {
    const supabaseToken = getSupabaseClientWithToken(token);
    const { data, error } = await supabaseToken
      .from("category")
      .insert([category])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return {
      status: 201,
      message: "Categoria creada exitosamente",
      data: data ? [data] : null
    };
  }
  async findById(id: number): Promise<Category | null> {
    const { data, error } = await supabase
      .from("category")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  }
  async findAll(search: string,
    sort: string,
    page: number,
    limit: number): Promise<PaginatedResponse<CategoryDTO>> {
    const from = (page - 1) * limit;
    const to = page * limit - 1;

    let query = supabase
      .from("category")
      .select("*", { count: "exact" });

    // 🔍 Aplicar filtros
    if (search && search.trim() !== "") {
      query = query.or(`name.ilike.%${search}%`);
    }

    // 🔃 Aplicar ordenamiento
    if (sort && sort.includes(":")) {
      const [field, order] = sort.split(":");
      query = query.order(field, { ascending: order === "asc" });
    }
    // 📦 Aplicar paginación
    if (search && search.trim() != "") {
      query = query.range(0, limit - 1);
      page = 1;
    }
    else query = query.range(from, to);

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);
    return {
      data: data ?? null,
      status: 200,
      message: "Petición exitosa",
      sort: {
        field: sort ? sort.split(":")[0] : "",
        order: sort ? sort.split(":")[1] : ""
      },
      pagination: {
        page,
        per_page: data.length,
        total_pages: count ? Math.ceil(count / limit) : 0,
        total_results: count ?? 0
      },
      filters: search
    }
  }

  async findOptions(): Promise<Option[]> {
    const { data, error } = await supabase.from("category").select("*");

    if (error) throw new Error(error.message);

    return (data || []).map((category: CategoryDTO) => ({
      value: category.id.toString(),
      label: category.name,
    }));
  }
  async delete(id: number, token: string): Promise<JsonResponse<[]>> {
    const supabaseToken = getSupabaseClientWithToken(token);
    const { error } = await supabaseToken.from("category").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return {
      status: 201,
      message: "Categoria eliminada con éxito",
      data: null
    };
  }
}

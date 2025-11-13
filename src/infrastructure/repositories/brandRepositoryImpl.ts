
import JsonResponse from "../../application/dto/format/JsonResponse";
import PaginatedResponse from "../../application/dto/format/PaginatedResponse";
import { BrandDTO } from "../../application/dto/models/BrandDTO";
import { Option } from "../../application/dto/utils/Option";
import { Brand } from "../../domain/models/Brand";
import { BrandRepository } from "../../domain/services/BrandRepository";
import { supabase } from "../config/supabaseClient";
import getSupabaseClientWithToken from "../config/supabaseWithToken";

export class BrandRepositoryImpl implements BrandRepository {
  async save(brand: Brand, token: string): Promise<JsonResponse<Brand>> {
    const supabaseToken = getSupabaseClientWithToken(token);
    const { data, error } = await supabaseToken
      .from("brand")
      .insert([brand])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return {
      status: 201,
      message: "Marca creada exitosamente",
      data: data ? [data] : null
    };
  }

  async update(brand: Brand, token: string): Promise<JsonResponse<Brand>> {
    const supabaseToken = getSupabaseClientWithToken(token);
    const { data, error } = await supabaseToken
      .from("brand")
      .update(brand)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return {
      status: 201,
      message: "Marca actualizada exitosamente",
      data: data ? [data] : null
    };
  }

  async findById(id: number): Promise<Brand | null> {
    const { data, error } = await supabase
      .from("brand")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  }

  async findAll(search: string,
    sort: string,
    page: number,
    limit: number): Promise<PaginatedResponse<BrandDTO>> {
    const from = (page - 1) * limit;
    const to = page * limit - 1;

    let query = supabase
      .from("brand")
      .select("*", { count: "exact" });

    // 🔍 Aplicar filtros
    if (search && search.trim() !== "") {
      query = query.or(`name.ilike.%${search}%,code.ilike.%${search}%`);
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
    const { data, error } = await supabase.from("brand").select("*");

    if (error) throw new Error(error.message);

    return (data || []).map((brand: BrandDTO) => ({
      value: brand.id.toString(),
      label: brand.name,
    }));
  }

  async delete(id: number, token: string): Promise<JsonResponse<[]>> {
    const supabaseToken = getSupabaseClientWithToken(token);
    const { error } = await supabaseToken.from("brand").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return {
      status: 201,
      message: "Marca eliminado con éxito",
      data: null
    };
  }
}

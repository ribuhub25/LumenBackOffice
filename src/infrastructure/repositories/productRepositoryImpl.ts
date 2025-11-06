import { ProductRepository } from "../../domain/services/ProductRepository";
import { Product } from "../../domain/models/Product";
import { supabase } from "../config/supabaseClient";
import getSupabaseClientWithToken from "../config/supabaseWithToken";
import { ProductDTO } from "../../application/dto/models/ProductDTO";
import PaginatedResponse from "../../application/dto/format/PaginatedResponse";
import { Express } from "express";
import JsonResponse from "../../application/dto/format/JsonResponse";


export class ProductRepositoryImpl implements ProductRepository {
  async add(product: Product, token: string): Promise<JsonResponse<Product>> {
    const supabaseToken = getSupabaseClientWithToken(token);
    const { data, error } = await supabaseToken
      .from("product")
      .insert([product])
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return {
      status: 201,
      message: "Producto creado exitosamente",
      data: data ? [data] : null
    };

  }

  async findById(id: number): Promise<Product | null> {
    const { data, error } = await supabase
      .from("v_products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  }

  async findAll(
    search: string,
    sort: string,
    page: number,
    limit: number
  ): Promise<PaginatedResponse<ProductDTO>> {
    //calculate from and to
    const from = (page - 1) * limit;
    const to = page * limit - 1;

    let query = supabase
      .from("v_products")
      .select("*", { count: "exact" })
      .range(from, to);

    if (sort != "" && sort != null && sort != undefined) {
      const [field, order] = sort.split(":");
      const orderbool = order == "asc" ? true : false;
      query = query.order(field, { ascending: orderbool });
    }
    if (search != "" && search != null && search != undefined) {
      query = supabase.from("v_products").select("*", { count: "exact" });
      if (!isNaN(Number(search)))
        query = query.or(`stock.eq.${search},price.eq.${search}`);
      else if (search == "activo") query = query.or(`status.eq.1`);
      else if (search == "inactivo") query = query.or(`status.eq.0`);
      else
        query = query.or(`name.ilike.%${search}%,brand_name.ilike.%${search}%`);
      query = query.range(from, to);
    }
    const { data, count, error } = await query;
    if (error) {
      let query = supabase
      .from("v_products")
      .select("*", { count: "exact" })
      .range(from, to);
      const { data, count, error } = await query;
      if (error) throw new Error(`Error fetching products: ${error.message}`);
    }
    return {
      data: data ? data : null,
      status: 200,
      message: "petición exitosa",
      sort: { field: sort ? sort.split(":")[0] : "", order: sort ? sort.split(":")[1] : ""},
      pagination: {
        page: page,
        per_page: limit,
        total_pages: Math.round(count/limit),
        total_results: count
      },
      filters: search
    };
  }

  async delete(id: number, token: string): Promise<JsonResponse<[]>> {
    const supabaseToken = getSupabaseClientWithToken(token);
    const { error } = await supabaseToken.from("product").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return {
      status: 200,
      data: null,
      message: "Producto elminado con éxito"
    }
  }

  async update(product: ProductDTO, token: string): Promise<JsonResponse<ProductDTO>> {
    const { id, name, price, brand_id, stock, status, categories } = product;
    const supabaseToken = getSupabaseClientWithToken(token);

    if (!id) throw new Error("El producto debe tener un ID válido");

    const { error: updateError } = await supabaseToken.rpc("update_products", {
      p_id: id,
      p_name: name,
      p_price: price,
      p_brand_id: brand_id,
      p_stock: stock,
      p_status: status,
      c_id: categories,
    });

    if (updateError)
      throw new Error(
        `Error al actualizar el producto: ${updateError.message}`
      );

    const { data: updatedProduct, error: fetchError } = await supabase
      .from("v_products")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError)
      throw new Error(
        `Error al obtener el producto actualizado: ${fetchError.message}`
      );
    if (!updatedProduct)
      throw new Error("No se encontró el producto actualizado");

    return {
      status: 200,
      message: "Producto modificado exitosamente",
      data: updatedProduct ? [updatedProduct] : null
    };
  }

  async upload(file: Express.Multer.File, fileName: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from("products")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    const publicUrl = supabase.storage
      .from("products")
      .getPublicUrl(fileName).data.publicUrl;

    return publicUrl;
    if (error) {
      console.error("Error al subir imagen:", error);
      return "";
    }
  }
}

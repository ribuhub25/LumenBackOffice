import { ProductRepository } from "../../domain/services/ProductRepository";
import { Product } from "../../domain/models/Product";
import { supabase } from "../config/supabaseClient";
import getSupabaseClientWithToken from "../config/supabaseWithToken";
import { ProductDTO } from "../../application/dto/ProductDTO";
import PaginatedProductsResponse from "../../application/dto/ProductResponse";

export class ProductRepositoryImpl implements ProductRepository {
  async save(product: Product): Promise<Product> {
    const { data, error } = await supabase
      .from("product")
      .insert([product])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
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
  ): Promise<PaginatedProductsResponse> {
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
      throw new Error(`Error fetching products: ${error.message}`);
    }
    return {
      products: data ?? [],
      total: count ?? 0,
    };
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from("product").delete().eq("id", id);

    if (error) throw new Error(error.message);
  }

  async update(product: ProductDTO, token: string): Promise<ProductDTO> {
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
      .from("product")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError)
      throw new Error(
        `Error al obtener el producto actualizado: ${fetchError.message}`
      );
    if (!updatedProduct)
      throw new Error("No se encontró el producto actualizado");

    return updatedProduct;
  }
}

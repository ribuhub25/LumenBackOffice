import { ProductRepository } from "../../domain/services/ProductRepository";
import { Product } from "../../domain/models/Product";
import { supabase } from "../config/supabaseClient";
import getSupabaseClientWithToken from "../config/supabaseWithToken";
import { ProductDTO } from "../../application/dto/ProductDTO";

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

  async findAll(): Promise<Product[]> {
    const { data, error } = await supabase.from("v_products").select("*");

    if (error) throw new Error(error.message);
    return data || [];
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

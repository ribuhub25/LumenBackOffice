import { ProductRepository } from "../../domain/services/ProductRepository";
import { Product } from "../../domain/models/Product";
import { supabase } from "../config/supabaseClient";
import getSupabaseClientWithToken from "../config/supabaseWithToken";

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

  async update(product: Product, token: string): Promise<Product> {
    const { id, ...fieldsToUpdate } = product;
    const supabaseToken = getSupabaseClientWithToken(token);
    if (!id) throw new Error("El producto debe tener un ID válido");

    const {
      error: updateError,
      data,
      status,
    } = await supabaseToken.from("product").update(fieldsToUpdate).eq("id", id);

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

import { ProductRepository } from "../../domain/services/ProductRepository";
import { Product } from "../../domain/models/Product";
import { supabase } from "../config/supabaseClient";


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
      .from("product")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  }

  async findAll(): Promise<Product[]> {
     const { data, error } = await supabase.from("product").select("*");

     if (error) throw new Error(error.message);
     return data || [];

  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from("product").delete().eq("id", id);

    if (error) throw new Error(error.message);

  }
}

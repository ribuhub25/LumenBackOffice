import { CategoryDTO } from "../../application/dto/CategoryDTO";
import { Option } from "../../application/dto/Option";
import { Category } from "../../domain/models/Category";
import { CategoryRepository } from "../../domain/services/CategoryRepository";
import { supabase } from "../config/supabaseClient";

export class CategoryRepositoryImpl implements CategoryRepository {
  async save(category: Category): Promise<Category> {
    const { data, error } = await supabase
      .from("category")
      .insert([category])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
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

  async findAll(): Promise<Category[]> {
    const { data, error } = await supabase.from("category").select("*");

    if (error) throw new Error(error.message);
    return data || [];
  }

  async findOptions(): Promise<Option[]> {
    const { data, error } = await supabase.from("category").select("*");

    if (error) throw new Error(error.message);

    return (data || []).map((category: CategoryDTO) => ({
      value: category.id.toString(),
      label: category.name,
    }));
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from("category").delete().eq("id", id);

    if (error) throw new Error(error.message);
  }
}


import { BrandDTO } from "../../application/dto/BrandDTO";
import { Option } from "../../application/dto/Option";
import { Brand } from "../../domain/models/Brand";
import { BrandRepository } from "../../domain/services/BrandRepository";
import { supabase } from "../config/supabaseClient";

export class BrandRepositoryImpl implements BrandRepository {
  async save(brand: Brand): Promise<Brand> {
    const { data, error } = await supabase
      .from("brand")
      .insert([brand])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
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

  async findAll(): Promise<Brand[]> {
    const { data, error } = await supabase.from("brand").select("*");
    if (error) throw new Error(error.message);
    return data || [];
  }

  async findOptions(): Promise<Option[]> {
    const { data, error } = await supabase.from("brand").select("*");

    if (error) throw new Error(error.message);

    return (data || []).map((brand: BrandDTO) => ({
      value: brand.id.toString(),
      label: brand.name,
    }));
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from("brand").delete().eq("id", id);

    if (error) throw new Error(error.message);

  }
}

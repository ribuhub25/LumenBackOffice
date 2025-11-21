import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"

  it('Should return Not Null to verify conection', async () => {
    dotenv.config();
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.from('product').select('*').limit(1);
    expect(error).toBeNull();
  });

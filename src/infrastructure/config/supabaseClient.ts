// src/infrastructure/config/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
const dotenv = require("dotenv");

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Verificación de conexión (consulta de prueba)
(async () => {
  const { error } = await supabase.from('product').select('*').limit(1);
  if (error) {
    console.error('❌ Error al conectar con Supabase:', error.message);
  } else {
    console.log('✅ Conexión a Supabase exitosa');
  }
})();



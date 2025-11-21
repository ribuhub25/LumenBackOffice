import type { SupabaseJwtPayload } from "../../application/dto/utils/SupabaseJwtPayload";

declare global {
  namespace Express {
    interface Request {
      user?: SupabaseJwtPayload;     
      supabaseToken?: string; 
    }
  }
}

export {};


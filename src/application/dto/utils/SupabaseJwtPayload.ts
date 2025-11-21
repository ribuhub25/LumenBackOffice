export type SupabaseJwtPayload = {
  aud?: string | string[] | undefined ;
  exp?: number | undefined;
  sub?: string | undefined;
  email?: string | undefined;
  role?: string | undefined;
}

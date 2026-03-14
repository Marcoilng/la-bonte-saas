import { createClient } from "@supabase/supabase-js";

// Database Types placeholder matching our schema
export type UserRole = "SuperAdmin" | "Direction" | "Teacher" | "Student" | "Parent";

export interface DBUser {
  id: string; // UUID from Supabase Auth
  nom: string;
  prenom: string;
  role: UserRole;
  identifiant_scolaire: string; // ex: LB-2024-0012
  qr_code_data: string;
}

export interface Classe {
  id: string;
  nom: string;
  section_id: string;
}

export interface StudentProfile extends DBUser {
  classe_id: string;
  statut_financier: "Payé" | "Partiel" | "Non Payé";
}

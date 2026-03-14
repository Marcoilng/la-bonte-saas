import { createClient } from "@supabase/supabase-js";

// Database Types placeholder matching our schema

export type UserRole = "Direction" | "Caisse" | "Enseignant" | "Parent" | "Eleve";

export interface DBUser {
  id: string;
  nom: string;
  prenom: string;
  role: UserRole;
  identifiant_scolaire: string;
}

export interface Transaction {
  id: string;
  montant: number;
  devise: "USD" | "CDF";
  categorie: "Minerval" | "Transport" | "Uniforme" | "Frais Connexes";
  date: string;
  agent_id: string;
  eleve_id: string;
  parent_id: string;
  is_cloture: boolean;
  qr_code_securite: string;
}

export interface Grade {
  id: string;
  eleve_id: string;
  matiere_id: string;
  periode: "T1" | "T2" | "T3";
  note: number;
  max: number;
  enseignant_id: string;
  date_saisie: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  details: string;
  timestamp: string;
  ip_address?: string;
}

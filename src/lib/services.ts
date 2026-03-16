import { supabase } from "./supabase";

/**
 * SERVICE: Students
 */
export const getStudents = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("nom", { ascending: true });
  
  if (error) {
    console.error("Error fetching students:", error);
    return [];
  }
  return data;
};

export const addStudent = async (studentData: any) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("students")
    .insert([studentData])
    .select();

  if (error) {
    console.error("Error adding student:", error);
    throw error;
  }
  return data[0];
};

/**
 * SERVICE: Transactions / Finances
 */
export const getTransactions = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("transactions")
    .select("*, students(nom, prenom)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
  return data;
};

export const recordPayment = async (paymentData: any) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("transactions")
    .insert([paymentData])
    .select();

  if (error) {
    console.error("Error recording payment:", error);
    throw error;
  }
  return data[0];
};

/**
 * SERVICE: Attendance / Presence
 */
export const recordAttendance = async (studentId: string, status: string = "Présent") => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("attendance")
    .insert([
      { student_id: studentId, status, recorded_at: new Date().toISOString() }
    ])
    .select();

  if (error) {
    console.error("Error recording attendance:", error);
    return null;
  }
  return data[0];
};

export const getAttendance = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("attendance")
    .select("*, students(nom, prenom, classe)")
    .order("recorded_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching attendance:", error);
    return [];
  }
  return data;
};

/**
 * SERVICE: Storage / Photos
 */
export const uploadStudentPhoto = async (file: File, studentId: string) => {
  if (!supabase) return null;
  
  const fileExt = file.name.split('.').pop();
  const filePath = `${studentId}-${Math.random()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("student-photos")
    .upload(filePath, file);

  if (error) {
    console.error("Error uploading photo:", error);
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from("student-photos")
    .getPublicUrl(filePath);

  // Update student record with new avatar URL
  await supabase
    .from("students")
    .update({ avatar_url: publicUrl })
    .eq("id", studentId);

  return publicUrl;
};

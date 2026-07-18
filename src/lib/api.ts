import { supabase } from './supabase';
import type { Customer, Project, LoadAudit, Quotation, Appliance, QuoteLineItem } from './types';

// ---------------------------------------------------------------------------
// Customers
// ---------------------------------------------------------------------------
export async function listCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Customer[];
}

export async function createCustomer(input: {
  name: string;
  type: string;
  email?: string;
  phone?: string;
  address?: string;
}): Promise<Customer> {
  const { data: userData } = await supabase.auth.getUser();
  const owner_id = userData.user?.id;
  if (!owner_id) throw new Error('Not signed in');

  const { data, error } = await supabase
    .from('customers')
    .insert({ ...input, owner_id })
    .select()
    .single();
  if (error) throw error;
  return data as Customer;
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
export async function listProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Project[];
}

export interface NewProjectInput {
  client_name: string;
  client_email?: string;
  client_phone?: string;
  building_type: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  roof_type?: string;
  grid_type: string;
  backup_hours?: number;
  notes?: string;
}

export async function createProject(input: NewProjectInput): Promise<Project> {
  const { data: userData } = await supabase.auth.getUser();
  const owner_id = userData.user?.id;
  if (!owner_id) throw new Error('Not signed in');

  const { data, error } = await supabase
    .from('projects')
    .insert({ ...input, owner_id })
    .select()
    .single();
  if (error) throw error;
  return data as Project;
}

export async function updateProjectStatus(id: string, status: string): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Load Audits
// ---------------------------------------------------------------------------
export async function saveLoadAudit(input: {
  project_id?: string | null;
  appliances: Appliance[];
  peak_load_kw: number;
  daily_consumption_kwh: number;
  recommended_kwp: number;
}): Promise<LoadAudit> {
  const { data: userData } = await supabase.auth.getUser();
  const owner_id = userData.user?.id;
  if (!owner_id) throw new Error('Not signed in');

  const { data, error } = await supabase
    .from('load_audits')
    .insert({ ...input, owner_id })
    .select()
    .single();
  if (error) throw error;
  return data as unknown as LoadAudit;
}

export async function listLoadAudits(): Promise<LoadAudit[]> {
  const { data, error } = await supabase
    .from('load_audits')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as unknown as LoadAudit[];
}

// ---------------------------------------------------------------------------
// Quotations
// ---------------------------------------------------------------------------
export async function saveQuotation(input: {
  project_id?: string | null;
  line_items: QuoteLineItem[];
  total: number;
  valid_until?: string;
}): Promise<Quotation> {
  const { data: userData } = await supabase.auth.getUser();
  const owner_id = userData.user?.id;
  if (!owner_id) throw new Error('Not signed in');

  const { data, error } = await supabase
    .from('quotations')
    .insert({ ...input, owner_id })
    .select()
    .single();
  if (error) throw error;
  return data as unknown as Quotation;
}

export async function listQuotations(): Promise<Quotation[]> {
  const { data, error } = await supabase
    .from('quotations')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as unknown as Quotation[];
}

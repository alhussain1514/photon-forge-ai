export interface Profile {
  id: string;
  full_name: string | null;
  company: string | null;
  role: string | null;
  created_at: string;
}

export interface Customer {
  id: string;
  owner_id: string;
  name: string;
  type: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  status: string;
  created_at: string;
}

export interface Project {
  id: string;
  owner_id: string;
  customer_id: string | null;
  client_name: string;
  client_email: string | null;
  client_phone: string | null;
  building_type: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  roof_type: string | null;
  grid_type: string;
  backup_hours: number | null;
  notes: string | null;
  status: string;
  system_size_kwp: number | null;
  photo_urls: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface Appliance {
  id: string;
  name: string;
  category: string;
  watts: number;
  hours: number;
  qty: number;
  critical: boolean;
}

export interface LoadAudit {
  id: string;
  owner_id: string;
  project_id: string | null;
  appliances: Appliance[];
  peak_load_kw: number;
  daily_consumption_kwh: number;
  recommended_kwp: number;
  system_size_kw?: number | null;
  battery_kwh?: number | null;
  estimated_cost_ngn?: number | null;
  monthly_savings_ngn?: number | null;
  roi_months?: number | null;
  created_at: string;
}

export interface QuoteLineItem {
  item: string;
  price: number;
}

export interface Quotation {
  id: string;
  owner_id: string;
  project_id: string | null;
  line_items: QuoteLineItem[];
  total: number;
  status: string;
  valid_until: string | null;
  created_at: string;
}

import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Zap,
  Battery,
  Banknote,
  TrendingUp,
  Settings2,
  ChevronDown,
  ChevronUp,
  Fuel,
  PlugZap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { saveLoadAudit } from '@/lib/api';

interface ApplianceRow {
  id: string;
  name: string;
  watts: number;
  qty: number;
  hours: number;
}

const presetAppliances: Omit<ApplianceRow, 'id'>[] = [
  { name: 'Ceiling Fan', watts: 75, qty: 4, hours: 6 },
  { name: 'LED TV', watts: 100, qty: 2, hours: 5 },
  { name: 'Refrigerator/Freezer', watts: 150, qty: 1, hours: 24 },
  { name: 'LED Bulb', watts: 10, qty: 6, hours: 5 },
];

const SYSTEM_TIERS_KW = [1, 2, 3, 5, 10];
const PEAK_SUN_HOURS = 4.5;
const INVERTER_LOSS_FACTOR = 1.3;

interface MarketRates {
  panelInverterPerKw: number;
  batteryPerKwh: number;
  installMarkupPct: number;
  petrolPerLitre: number;
  genFuelLPerKwh: number;
  phcnPerKwh: number;
}

const defaultRates: MarketRates = {
  panelInverterPerKw: 300000,
  batteryPerKwh: 220000,
  installMarkupPct: 10,
  petrolPerLitre: 1300,
  genFuelLPerKwh: 0.5,
  phcnPerKwh: 209.5,
};

const naira = (n: number) =>
  `₦${Math.round(n).toLocaleString('en-NG')}`;

let nextId = 100;

const SolarConsultant = ({ onBack }: { onBack: () => void }) => {
  const [appliances, setAppliances] = useState<ApplianceRow[]>(
    presetAppliances.map((a, i) => ({ ...a, id: String(i + 1) }))
  );
  const [rates, setRates] = useState<MarketRates>(defaultRates);
  const [showRates, setShowRates] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = (id: string, field: keyof ApplianceRow, value: string | number) => {
    setAppliances((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const removeRow = (id: string) => setAppliances((prev) => prev.filter((a) => a.id !== id));

  const addRow = () => {
    nextId += 1;
    setAppliances((prev) => [
      ...prev,
      { id: String(nextId), name: 'New Appliance', watts: 100, qty: 1, hours: 4 },
    ]);
  };

  const results = useMemo(() => {
    const rawWhPerDay = appliances.reduce((sum, a) => sum + a.watts * a.qty * a.hours, 0);
    const peakLoadW = appliances.reduce((sum, a) => sum + a.watts * a.qty, 0);

    const adjustedWhPerDay = rawWhPerDay * INVERTER_LOSS_FACTOR;
    const adjustedKwhPerDay = adjustedWhPerDay / 1000;

    const requiredKwFromEnergy = adjustedKwhPerDay / PEAK_SUN_HOURS;
    const requiredKwFromPeak = peakLoadW / 1000;
    const requiredKw = Math.max(requiredKwFromEnergy, requiredKwFromPeak);
    const systemSizeKw =
      SYSTEM_TIERS_KW.find((tier) => tier >= requiredKw) ?? SYSTEM_TIERS_KW[SYSTEM_TIERS_KW.length - 1];

    const batteryKwh = Math.ceil(adjustedKwhPerDay * 10) / 10;

    const hardwareCost = systemSizeKw * rates.panelInverterPerKw + batteryKwh * rates.batteryPerKwh;
    const estimatedCost = hardwareCost * (1 + rates.installMarkupPct / 100);

    const monthlyGenCost = adjustedKwhPerDay * rates.genFuelLPerKwh * rates.petrolPerLitre * 30;
    const monthlyPhcnCost = adjustedKwhPerDay * rates.phcnPerKwh * 30;
    const monthlySavings = monthlyGenCost;

    const roiMonths = monthlySavings > 0 ? estimatedCost / monthlySavings : 0;

    return {
      rawWhPerDay,
      adjustedWhPerDay,
      adjustedKwhPerDay,
      peakLoadW,
      systemSizeKw,
      batteryKwh,
      estimatedCost,
      monthlyGenCost,
      monthlyPhcnCost,
      monthlySavings,
      roiMonths,
    };
  }, [appliances, rates]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveLoadAudit({
        appliances: appliances.map((a) => ({
          id: a.id,
          name: a.name,
          category: 'general',
          watts: a.watts,
          hours: a.hours,
          qty: a.qty,
          critical: false,
        })),
        peak_load_kw: results.peakLoadW / 1000,
        daily_consumption_kwh: results.adjustedKwhPerDay,
        recommended_kwp: results.systemSizeKw,
        system_size_kw: results.systemSizeKw,
        battery_kwh: results.batteryKwh,
        estimated_cost_ngn: results.estimatedCost,
        monthly_savings_ngn: results.monthlySavings,
        roi_months: results.roiMonths,
      });
      toast.success('Consultation saved to your account');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save this consultation');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="text-right">
          <div className="text-primary font-bold text-sm">NIGERIA SOLAR CONSULTANT</div>
        </div>
      </div>

      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Solar Sizing &amp; Cost Estimator</h1>
        <p className="text-muted-foreground text-sm">
          List your appliances below — get the right system size, battery, cost in Naira, and payback time.
        </p>
      </header>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Your Appliances</h3>
          <Button size="sm" className="bg-primary text-black font-bold h-8 rounded-full" onClick={addRow}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>

        {appliances.map((a) => (
          <GlassCard key={a.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Input
                value={a.name}
                onChange={(e) => update(a.id, 'name', e.target.value)}
                className="h-9 bg-transparent border-none font-bold text-sm px-0 focus-visible:ring-0"
              />
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500 shrink-0" onClick={() => removeRow(a.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] text-muted-foreground uppercase font-bold">Watts</label>
                <Input type="number" value={a.watts} onChange={(e) => update(a.id, 'watts', Number(e.target.value) || 0)} className="h-9 bg-white/5 border-white/10 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-muted-foreground uppercase font-bold">Qty</label>
                <Input type="number" value={a.qty} onChange={(e) => update(a.id, 'qty', Number(e.target.value) || 0)} className="h-9 bg-white/5 border-white/10 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-muted-foreground uppercase font-bold">Hrs/Day</label>
                <Input type="number" value={a.hours} onChange={(e) => update(a.id, 'hours', Number(e.target.value) || 0)} className="h-9 bg-white/5 border-white/10 text-xs" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-4 border-white/10">
        <button className="flex items-center justify-between w-full" onClick={() => setShowRates((s) => !s)}>
          <span className="flex items-center gap-2 font-bold text-sm">
            <Settings2 className="w-4 h-4 text-muted-foreground" /> Nigeria Market Rate Assumptions
          </span>
          {showRates ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {showRates && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="space-y-1">
              <Label className="text-[10px] uppercase">Panel+Inverter (₦/kW)</Label>
              <Input type="number" value={rates.panelInverterPerKw} onChange={(e) => setRates((r) => ({ ...r, panelInverterPerKw: Number(e.target.value) || 0 }))} className="h-9 bg-white/5 border-white/10 text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase">Lithium Battery (₦/kWh)</Label>
              <Input type="number" value={rates.batteryPerKwh} onChange={(e) => setRates((r) => ({ ...r, batteryPerKwh: Number(e.target.value) || 0 }))} className="h-9 bg-white/5 border-white/10 text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase">Install/Labour Markup %</Label>
              <Input type="number" value={rates.installMarkupPct} onChange={(e) => setRates((r) => ({ ...r, installMarkupPct: Number(e.target.value) || 0 }))} className="h-9 bg-white/5 border-white/10 text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase">Petrol (₦/litre)</Label>
              <Input type="number" value={rates.petrolPerLitre} onChange={(e) => setRates((r) => ({ ...r, petrolPerLitre: Number(e.target.value) || 0 }))} className="h-9 bg-white/5 border-white/10 text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase">Genset (L/kWh)</Label>
              <Input type="number" step="0.1" value={rates.genFuelLPerKwh} onChange={(e) => setRates((r) => ({ ...r, genFuelLPerKwh: Number(e.target.value) || 0 }))} className="h-9 bg-white/5 border-white/10 text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] uppercase">PHCN (₦/kWh)</Label>
              <Input type="number" value={rates.phcnPerKwh} onChange={(e) => setRates((r) => ({ ...r, phcnPerKwh: Number(e.target.value) || 0 }))} className="h-9 bg-white/5 border-white/10 text-xs" />
            </div>
            <p className="col-span-2 text-[10px] text-muted-foreground leading-relaxed">
              Starting assumptions from Nigerian solar market reporting, mid-2026. Prices move with the naira
              exchange rate — confirm with local vendors before quoting a client.
            </p>
          </div>
        )}
      </GlassCard>

      <GlassCard className="p-6 border-primary/20 bg-primary/5 space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-widest text-primary">Your Daily Consumption</div>
        <div className="text-3xl font-black">{Math.round(results.rawWhPerDay).toLocaleString()} Wh</div>
        <div className="text-xs text-muted-foreground">
          {Math.round(results.adjustedWhPerDay).toLocaleString()} Wh after +30% inverter loss buffer
        </div>
      </GlassCard>

      <GlassCard className="p-6 bg-gradient-to-br from-solar-gold/10 to-transparent border-solar-gold/20 space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-widest text-solar-gold">Recommended System</div>
        <div className="text-3xl font-black text-solar-gold">
          {results.systemSizeKw}KW Solar + {results.batteryKwh}KWH Battery
        </div>
        <div className="text-xs text-muted-foreground">
          Peak load: {(results.peakLoadW / 1000).toFixed(2)} kW · Sized for {PEAK_SUN_HOURS} peak sun hours/day
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Banknote className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Estimated Cost</span>
          </div>
          <div className="text-xl font-black">{naira(results.estimatedCost)}</div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ROI</span>
          </div>
          <div className="text-xl font-black">{results.roiMonths.toFixed(1)} months</div>
        </GlassCard>
      </div>

      <GlassCard className="p-5 space-y-3">
        <h4 className="font-bold text-sm flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" /> Monthly Savings
        </h4>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground"><Fuel className="w-3.5 h-3.5" /> vs Generator</span>
          <span className="font-bold text-emerald-500">{naira(results.monthlyGenCost)}/mo</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground"><PlugZap className="w-3.5 h-3.5" /> vs PHCN Grid</span>
          <span className="font-bold text-emerald-500">{naira(results.monthlyPhcnCost)}/mo</span>
        </div>
      </GlassCard>

      <Button
        className="w-full h-14 bg-primary text-black font-bold rounded-2xl text-lg shadow-xl shadow-primary/20"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save This Consultation'}
      </Button>
    </div>
  );
};

export default SolarConsultant;

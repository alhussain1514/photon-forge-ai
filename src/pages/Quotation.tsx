import React, { useMemo, useState } from 'react';
import { ArrowLeft, Download, Printer, ShieldCheck, Zap, FileText, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { saveQuotation } from '@/lib/api';
import type { QuoteLineItem } from '@/lib/types';

interface LineItemRow extends QuoteLineItem {
  id: string;
}

let nextId = 10;

const Quotation = ({ onBack }: { onBack: () => void }) => {
  const [clientName, setClientName] = useState('Riverside Luxury Villas');
  const [clientAddress, setClientAddress] = useState('128 Coastal Dr, Marina Bay');
  const [attn, setAttn] = useState('James Wilson');
  const [quoteNumber] = useState(() => Math.floor(10000 + Math.random() * 89999));
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [lineItems, setLineItems] = useState<LineItemRow[]>([
    { id: '1', item: 'PV Array: 6.6kW Panels', price: 4280 },
    { id: '2', item: 'Hybrid Inverter', price: 1850 },
    { id: '3', item: 'Battery Storage 10kWh', price: 5400 },
    { id: '4', item: 'Installation & Electrical Works', price: 2800 },
  ]);

  const total = useMemo(() => lineItems.reduce((sum, li) => sum + (Number(li.price) || 0), 0), [lineItems]);

  const updateLine = (id: string, field: keyof QuoteLineItem, value: string | number) => {
    setLineItems((prev) => prev.map((li) => (li.id === id ? { ...li, [field]: value } : li)));
  };

  const removeLine = (id: string) => setLineItems((prev) => prev.filter((li) => li.id !== id));

  const addLine = () => {
    nextId += 1;
    setLineItems((prev) => [...prev, { id: String(nextId), item: 'New Line Item', price: 0 }]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveQuotation({
        line_items: lineItems.map(({ item, price }) => ({ item, price })),
        total,
        valid_until: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      });
      toast.success('Quotation saved to your account');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save quotation');
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPdf = async () => {
    setDownloading(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text('SunScale Pro', 14, 20);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Engineering Excellence', 14, 26);

      doc.setFontSize(10);
      doc.text(`Quotation #${quoteNumber}`, 196, 20, { align: 'right' });
      doc.text(new Date().toLocaleDateString(), 196, 26, { align: 'right' });

      doc.setDrawColor(200);
      doc.line(14, 32, 196, 32);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Client Information', 14, 42);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(clientName, 14, 49);
      doc.text(clientAddress, 14, 55);
      if (attn) doc.text(`Attn: ${attn}`, 14, 61);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('System Configuration', 14, 75);

      let y = 85;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      lineItems.forEach((li) => {
        doc.text(li.item, 14, y);
        doc.text(`$${Number(li.price).toLocaleString()}`, 196, y, { align: 'right' });
        y += 8;
      });

      doc.setDrawColor(200);
      doc.line(14, y, 196, y);
      y += 10;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('Total Investment', 14, y);
      doc.text(`$${total.toLocaleString()}`, 196, y, { align: 'right' });

      y += 14;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('Proposal valid for 15 days from date of issue.', 14, y);

      y += 14;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Terms', 14, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      [
        '25-year Performance Warranty',
        '10-year Workmanship Guarantee',
        'Grid connection approval included',
        'Smart Monitoring app setup',
      ].forEach((t, i) => {
        doc.text(`• ${t}`, 14, y + 8 + i * 6);
      });

      doc.save(`quotation-${quoteNumber}.pdf`);
      toast.success('PDF downloaded');
    } catch (err) {
      toast.error('Could not generate PDF');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="flex gap-2">
           <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-white/10" onClick={() => window.print()}>
              <Printer className="w-4 h-4" />
           </Button>
           <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-white/10" onClick={handleDownloadPdf} disabled={downloading}>
              <Download className="w-4 h-4" />
           </Button>
        </div>
      </div>

      <header>
        <h1 className="text-3xl font-bold">Proposal Generator</h1>
        <p className="text-muted-foreground">Final quotation and professional proposal</p>
      </header>

      <div className="relative">
         <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-solar-gold/30 blur-2xl opacity-20" />
         <GlassCard className="relative p-8 bg-white/5 border-white/10">
            <div className="flex items-start justify-between mb-12">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <Zap className="w-7 h-7 text-black" fill="currentColor" />
                  </div>
                  <div>
                    <h2 className="font-black text-xl tracking-tighter uppercase italic">SunScale <span className="text-primary">Pro</span></h2>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Engineering Excellence</p>
                  </div>
               </div>
               <div className="text-right">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Quotation #{quoteNumber}</div>
                  <div className="text-[10px] text-muted-foreground font-medium">{new Date().toLocaleDateString()}</div>
               </div>
            </div>

            <div className="space-y-8 mb-12">
               <div>
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Client Information</h4>
                  <div className="space-y-2">
                     <Input value={clientName} onChange={(e) => setClientName(e.target.value)} className="h-9 bg-transparent border-none font-bold text-lg px-0 focus-visible:ring-0" />
                     <Input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} className="h-8 bg-transparent border-none text-xs text-muted-foreground px-0 focus-visible:ring-0" />
                     <Input value={attn} onChange={(e) => setAttn(e.target.value)} placeholder="ATTN: contact name" className="h-8 bg-transparent border-none text-[10px] text-muted-foreground px-0 focus-visible:ring-0 text-right" />
                  </div>
               </div>

               <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">System Configuration</h4>
                    <Button variant="ghost" size="sm" className="h-6 text-[10px] text-primary" onClick={addLine}><Plus className="w-3 h-3 mr-1" /> Add Line</Button>
                  </div>
                  <div className="space-y-3">
                     {lineItems.map((row) => (
                       <div key={row.id} className="flex justify-between items-center gap-2 text-sm">
                          <Input
                            value={row.item}
                            onChange={(e) => updateLine(row.id, 'item', e.target.value)}
                            className="h-8 bg-transparent border-none text-muted-foreground px-0 focus-visible:ring-0"
                          />
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-muted-foreground">$</span>
                            <Input
                              type="number"
                              value={row.price}
                              onChange={(e) => updateLine(row.id, 'price', Number(e.target.value) || 0)}
                              className="h-8 w-24 bg-white/5 border-white/10 text-right font-bold text-xs"
                            />
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500" onClick={() => removeLine(row.id)}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                  <div className="text-[8px] text-muted-foreground font-bold uppercase tracking-widest max-w-[140px]">Generated by SunScale Pro — not a legally binding contract until signed</div>
                  <div className="text-right">
                     <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Investment</div>
                     <div className="text-4xl font-black text-primary">${total.toLocaleString()}</div>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
               <CheckCircle2 className="w-4 h-4 text-emerald-500" />
               <span className="text-[10px] font-bold text-emerald-500 uppercase">Proposal valid for 15 days</span>
            </div>
         </GlassCard>
      </div>

      <GlassCard className="p-6">
         <h3 className="font-bold flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            Legal & Terms
         </h3>
         <div className="space-y-3">
            {[
              '25-year Performance Warranty',
              '10-year Workmanship Guarantee',
              'Grid connection approval included',
              'Smart Monitoring app setup',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                 <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                 {text}
              </div>
            ))}
         </div>
      </GlassCard>

      <Button className="w-full h-16 bg-primary text-black font-black text-lg rounded-2xl shadow-2xl shadow-primary/30 uppercase tracking-widest" onClick={handleSave} disabled={saving}>
         {saving ? 'Saving...' : 'Save Quotation'}
      </Button>
    </div>
  );
};

export default Quotation;

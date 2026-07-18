import React, { useEffect, useState } from 'react';
import { ArrowLeft, Search, UserPlus, Filter, MoreHorizontal, MessageSquare, Phone, Briefcase, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { listCustomers, createCustomer } from '@/lib/api';
import type { Customer } from '@/lib/types';

const CRM = ({ onBack }: { onBack: () => void }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [type, setType] = useState('Residential');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      setCustomers(await listCustomers());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not load clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error('Client name is required');
      return;
    }
    setSaving(true);
    try {
      await createCustomer({ name, type, email: email || undefined, phone: phone || undefined, address: address || undefined });
      toast.success('Client added');
      setOpen(false);
      setName(''); setType('Residential'); setEmail(''); setPhone(''); setAddress('');
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not add client');
    } finally {
      setSaving(false);
    }
  };

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-primary text-black font-bold h-8 rounded-full">
              <UserPlus className="w-4 h-4 mr-1" /> New Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name or company" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                    <SelectItem value="Hospitality">Hospitality</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="client@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="City, State" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreate} disabled={saving} className="bg-primary text-black font-bold">
                {saving ? 'Saving...' : 'Add Client'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <header>
        <h1 className="text-3xl font-bold">Client Manager</h1>
        <p className="text-muted-foreground">Manage leads, projects & support</p>
      </header>

      <div className="flex gap-2">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
         <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-white/10">
            <Filter className="w-5 h-5" />
         </Button>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-12 text-sm">Loading clients...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-muted-foreground py-12 text-sm">
          No clients yet. Tap "New Lead" to add your first one.
        </div>
      ) : (
        <div className="space-y-4">
           {filtered.map((client) => (
             <GlassCard key={client.id} className="p-4 group cursor-pointer hover:border-primary/30 transition-all">
                <div className="flex items-start justify-between mb-6">
                   <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white/10">
                         <AvatarFallback className="bg-white/5 font-bold">
                           {client.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()}
                         </AvatarFallback>
                      </Avatar>
                      <div>
                         <h4 className="font-bold text-base group-hover:text-primary transition-colors">{client.name}</h4>
                         <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{client.type}</span>
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{client.status}</span>
                         </div>
                      </div>
                   </div>
                   <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                   </Button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                   <Button variant="outline" className="h-10 border-white/10 bg-white/5 rounded-xl hover:bg-primary/10 hover:border-primary/20">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                   </Button>
                   <Button variant="outline" className="h-10 border-white/10 bg-white/5 rounded-xl hover:bg-primary/10 hover:border-primary/20">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                   </Button>
                   <Button variant="outline" className="h-10 border-white/10 bg-white/5 rounded-xl hover:bg-primary/10 hover:border-primary/20">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                   </Button>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                   <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{client.address || 'No address on file'}</span>
                   </div>
                </div>
             </GlassCard>
           ))}
        </div>
      )}
    </div>
  );
};

export default CRM;

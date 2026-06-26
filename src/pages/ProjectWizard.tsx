import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  MapPin, 
  Home, 
  Zap, 
  Info, 
  Upload, 
  ImageIcon,
  Check,
  Compass,
  FileText,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { GlassCard } from '@/components/GlassCard';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const steps = [
  { id: 'client', title: 'Client Details', icon: Info },
  { id: 'address', title: 'Location', icon: MapPin },
  { id: 'technical', title: 'Technical specs', icon: Zap },
  { id: 'media', title: 'Site media', icon: ImageIcon },
];

interface ProjectWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

const ProjectWizard = ({ onComplete, onCancel }: ProjectWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submit();
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onCancel();
    }
  };

  const submit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Project Created Successfully");
      onComplete();
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Client Name</Label>
              <Input placeholder="Full name or company" className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input placeholder="client@example.com" className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input placeholder="+1 (555) 000-0000" className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Building Category</Label>
              <Select>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Property Address</Label>
              <Input placeholder="Street address, City, State" className="bg-white/5 border-white/10" />
            </div>
            <div className="h-48 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative z-10 flex flex-col items-center gap-2">
                <MapPin className="w-8 h-8 text-primary animate-bounce" />
                <span className="text-xs font-bold uppercase tracking-widest">Pin exact GPS location</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Latitude</Label>
                <Input placeholder="40.7128" className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label>Longitude</Label>
                <Input placeholder="-74.0060" className="bg-white/5 border-white/10" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Roof Type</Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat Concrete</SelectItem>
                    <SelectItem value="pitched">Pitched Tile</SelectItem>
                    <SelectItem value="metal">Metal Sheet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Grid Type</Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on-grid">On-Grid</SelectItem>
                    <SelectItem value="off-grid">Off-Grid</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Desired Backup Hours</Label>
              <Input type="number" placeholder="e.g. 12" className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Project Notes</Label>
              <Textarea placeholder="Any specific requirements or constraints..." className="bg-white/5 border-white/10 min-h-[120px]" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
               {[
                 { label: 'Drone Survey', icon: Compass },
                 { label: 'CAD Drawing', icon: FileText },
                 { label: 'Site Images', icon: ImageIcon },
                 { label: 'Utility Bill', icon: Zap },
               ].map((item, i) => (
                 <button key={i} className="h-32 rounded-2xl border border-dashed border-white/20 hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 group">
                   <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                     <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                   </div>
                   <span className="text-xs font-medium text-muted-foreground group-hover:text-white">{item.label}</span>
                 </button>
               ))}
             </div>
             
             <GlassCard className="p-6 border-primary/20 bg-primary/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">AI Scan Ready</h4>
                  <p className="text-[10px] text-muted-foreground">Upload drone mapping for automatic 3D modeling and shading analysis.</p>
                </div>
             </GlassCard>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">New Project</h2>
          <p className="text-muted-foreground">Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</p>
        </div>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-8 h-1 rounded-full transition-all duration-300",
                i <= currentStep ? "bg-primary" : "bg-white/10"
              )} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex items-center justify-between gap-4">
        <Button variant="outline" size="lg" className="flex-1 rounded-2xl h-14 border-white/10" onClick={prev} disabled={isSubmitting}>
          <ChevronLeft className="w-5 h-5 mr-2" />
          {currentStep === 0 ? "Cancel" : "Back"}
        </Button>
        <Button size="lg" className="flex-[2] rounded-2xl h-14 bg-primary text-black font-bold group" onClick={next} disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            <>
              {currentStep === steps.length - 1 ? "Complete Design" : "Next Step"}
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProjectWizard;

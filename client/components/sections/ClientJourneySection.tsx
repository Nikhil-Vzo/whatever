import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, ChevronLeft, MapPin, Building2, FileText, User, HardHat, CheckCircle2, Sparkles } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  description: string;
  location: string;
  city: string;
}

const steps = [
  {
    id: "basics",
    title: "Your Details",
    subtitle: "Let's get to know you",
    fields: ["name", "email", "phone"],
    icon: User,
    accent: "#3b82f6",
  },
  {
    id: "project",
    title: "Project Scope",
    subtitle: "What are you building?",
    fields: ["projectType", "budget"],
    icon: Building2,
    accent: "#f59e0b",
  },
  {
    id: "details",
    title: "Vision & Goals",
    subtitle: "Paint the picture for us",
    fields: ["description"],
    icon: FileText,
    accent: "#10b981",
  },
  {
    id: "location",
    title: "Site Location",
    subtitle: "Where's the construction site?",
    fields: ["location", "city"],
    icon: MapPin,
    accent: "#8b5cf6",
  },
];

export default function ClientJourneySection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];
  const Icon = step.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <HardHat className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-black tracking-[0.2em] uppercase text-amber-500/90">Project Submission</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight">
            Share Your <span className="text-amber-500 italic">Vision</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Tell us about your construction project. We'll match you with the right builders.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              {/* Main Form Card */}
              <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl">
                {/* Construction stripe top */}
                <div
                  className="h-1.5"
                  style={{
                    background: `repeating-linear-gradient(90deg, ${step.accent}, ${step.accent} 20px, transparent 20px, transparent 30px)`,
                  }}
                />

                {/* Step nav indicators */}
                <div className="px-8 pt-8 pb-4">
                  <div className="flex items-center gap-2">
                    {steps.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 flex-1">
                        <motion.div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${i < currentStep
                              ? "bg-amber-500 border-amber-500 text-black"
                              : i === currentStep
                                ? "border-amber-500 text-amber-500 bg-amber-500/10"
                                : "border-border text-muted-foreground"
                            }`}
                          animate={i === currentStep ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          {i < currentStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                        </motion.div>
                        {i < steps.length - 1 && (
                          <div className={`flex-1 h-[2px] rounded-full transition-colors ${i < currentStep ? "bg-amber-500" : "bg-border"
                            }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step header */}
                <div className="px-8 pb-6 flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${step.accent}15`,
                      border: `2px solid ${step.accent}30`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: step.accent }} />
                  </div>
                  <div>
                    <p className="text-xs font-black tracking-[0.2em] uppercase text-muted-foreground">
                      Step {currentStep + 1} of {steps.length}
                    </p>
                    <h3 className="text-2xl font-black text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="px-8">
                  <div className="w-full h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: step.accent }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Form fields */}
                <div className="p-8 space-y-5">
                  {step.id === "basics" && (
                    <div className="space-y-5">
                      <FormInput
                        label="Full Name"
                        placeholder="e.g., Rajesh Kumar"
                        value={formData.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        icon={<User className="w-4 h-4 text-muted-foreground" />}
                      />
                      <FormInput
                        label="Email Address"
                        type="email"
                        placeholder="rajesh@company.com"
                        value={formData.email || ""}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                      <FormInput
                        label="Phone Number"
                        placeholder="+91 98765 43210"
                        value={formData.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  )}

                  {step.id === "project" && (
                    <div className="space-y-5">
                      <FormSelect
                        label="Project Type"
                        value={formData.projectType || ""}
                        onChange={(e) => handleInputChange("projectType", e.target.value)}
                        options={[
                          { value: "", label: "Select construction type..." },
                          { value: "residential", label: "🏠 Residential" },
                          { value: "commercial", label: "🏢 Commercial" },
                          { value: "industrial", label: "🏭 Industrial" },
                          { value: "mixed", label: "🏗️ Mixed-Use Development" },
                          { value: "renovation", label: "🔨 Renovation / Remodel" },
                        ]}
                      />
                      <FormSelect
                        label="Budget Range"
                        value={formData.budget || ""}
                        onChange={(e) => handleInputChange("budget", e.target.value)}
                        options={[
                          { value: "", label: "Select budget range..." },
                          { value: "under500k", label: "Under ₹50 Lakhs" },
                          { value: "500k-1cr", label: "₹50 Lakhs – 1 Crore" },
                          { value: "1cr-5cr", label: "₹1 – 5 Crore" },
                          { value: "5cr-10cr", label: "₹5 – 10 Crore" },
                          { value: "above10cr", label: "₹10 Crore+" },
                        ]}
                      />
                    </div>
                  )}

                  {step.id === "details" && (
                    <FormTextarea
                      label="Project Description"
                      placeholder="Describe your construction project: type of structure, number of floors, special requirements, timeline expectations, any architectural preferences..."
                      value={formData.description || ""}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                  )}

                  {step.id === "location" && (
                    <div className="space-y-5">
                      <FormInput
                        label="Plot / Khasra Number"
                        placeholder="e.g., Plot 42, Sector 15"
                        value={formData.location || ""}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        icon={<MapPin className="w-4 h-4 text-muted-foreground" />}
                      />
                      <FormInput
                        label="City / District"
                        placeholder="e.g., Gurugram, Haryana"
                        value={formData.city || ""}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* Navigation buttons */}
                <div className="px-8 pb-8 flex gap-4 justify-between">
                  <motion.button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="px-6 py-3.5 border border-border rounded-xl font-bold text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary/30 transition-colors flex items-center gap-2"
                    whileHover={currentStep > 0 ? { scale: 1.02 } : {}}
                    whileTap={currentStep > 0 ? { scale: 0.98 } : {}}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </motion.button>

                  <motion.button
                    onClick={handleNext}
                    className="px-8 py-3.5 bg-amber-500 text-black rounded-xl font-black flex items-center gap-2 hover:bg-amber-400 transition-colors shadow-[0_8px_25px_rgba(245,158,11,0.25)] uppercase tracking-wider text-sm"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {currentStep === steps.length - 1 ? "Submit Project" : "Continue"}
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Success stripe */}
              <div className="h-1.5 bg-[repeating-linear-gradient(90deg,#10b981,#10b981_20px,transparent_20px,transparent_30px)]" />

              <div className="p-12 sm:p-16 text-center space-y-8">
                <motion.div
                  className="w-20 h-20 mx-auto rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </motion.div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-black text-foreground">
                    Project Submitted! 🎉
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto text-lg">
                    Our team will review your project and connect you with top-rated builders within <strong className="text-foreground">24 hours</strong>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <motion.button
                    onClick={() => {
                      setCurrentStep(0);
                      setFormData({});
                      setIsComplete(false);
                    }}
                    className="px-8 py-3.5 bg-amber-500 text-black rounded-xl font-black hover:bg-amber-400 transition-colors flex items-center gap-2 justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles className="w-4 h-4" />
                    Submit Another Project
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ---------- Form Components ---------- */

function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}) {
  return (
    <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <label className="block text-sm font-bold text-foreground/80 uppercase tracking-wider">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full ${icon ? "pl-11" : "px-4"} pr-4 py-4 bg-background border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all text-base`}
        />
      </div>
    </motion.div>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <label className="block text-sm font-bold text-foreground/80 uppercase tracking-wider">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-4 bg-background border-2 border-border rounded-xl text-foreground focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all text-base appearance-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </motion.div>
  );
}

function FormTextarea({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <label className="block text-sm font-bold text-foreground/80 uppercase tracking-wider">{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={7}
        className="w-full px-4 py-4 bg-background border-2 border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all resize-none text-base"
      />
    </motion.div>
  );
}

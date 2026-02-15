import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, MapPin, Building2, FileText } from "lucide-react";

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
    title: "Tell us about yourself",
    fields: ["name", "email", "phone"],
    icon: Building2,
  },
  {
    id: "project",
    title: "Describe your project",
    fields: ["projectType", "budget"],
    icon: FileText,
  },
  {
    id: "details",
    title: "Project details",
    fields: ["description"],
    icon: FileText,
  },
  {
    id: "location",
    title: "Where is your project?",
    fields: ["location", "city"],
    icon: MapPin,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Share Your Vision
          </h2>
          <p className="text-lg text-slate-600">
            Step-by-step, we'll understand your perfect project
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Progress bar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center text-slate-900">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Step {currentStep + 1} of {steps.length}</p>
                      <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-600">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Form fields */}
              <div className="glass rounded-2xl p-8 space-y-6">
                {step.id === "basics" && (
                  <div className="space-y-4">
                    <FormInput
                      label="Full Name"
                      placeholder="Your name"
                      value={formData.name || ""}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                    <FormInput
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                    <FormInput
                      label="Phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone || ""}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                )}

                {step.id === "project" && (
                  <div className="space-y-4">
                    <FormSelect
                      label="Project Type"
                      value={formData.projectType || ""}
                      onChange={(e) =>
                        handleInputChange("projectType", e.target.value)
                      }
                      options={[
                        { value: "", label: "Select type..." },
                        { value: "residential", label: "Residential" },
                        { value: "commercial", label: "Commercial" },
                        { value: "industrial", label: "Industrial" },
                        { value: "mixed", label: "Mixed-Use" },
                      ]}
                    />
                    <FormSelect
                      label="Budget Range"
                      value={formData.budget || ""}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      options={[
                        { value: "", label: "Select range..." },
                        { value: "under500k", label: "Under ₹50 Lakhs" },
                        { value: "500k-1cr", label: "₹50 Lakhs - 1 Crore" },
                        { value: "1cr-5cr", label: "₹1 - 5 Crore" },
                        { value: "above5cr", label: "Above ₹5 Crore" },
                      ]}
                    />
                  </div>
                )}

                {step.id === "details" && (
                  <FormTextarea
                    label="Project Description"
                    placeholder="Tell us about your vision, requirements, timeline..."
                    value={formData.description || ""}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                  />
                )}

                {step.id === "location" && (
                  <div className="space-y-4">
                    <FormInput
                      label="Khasra/Plot Number"
                      placeholder="Enter plot identifier"
                      value={formData.location || ""}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                    <FormInput
                      label="City/District"
                      placeholder="City or district"
                      value={formData.city || ""}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-4 justify-between">
                <motion.button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="px-6 py-3 border border-slate-300 rounded-lg font-medium text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  className="px-8 py-3 bg-slate-900 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-slate-800 transition-colors"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {currentStep === steps.length - 1 ? "Submit" : "Continue"}
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-12 text-center space-y-6"
            >
              <motion.div
                className="w-16 h-16 mx-auto rounded-full bg-gold-400 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <svg
                  className="w-8 h-8 text-slate-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-semibold text-slate-900">
                Project Submitted!
              </h3>
              <p className="text-slate-600">
                Thank you for sharing your vision. Our team will review your project and connect you
                with the perfect builders.
              </p>
              <motion.button
                onClick={() => {
                  setCurrentStep(0);
                  setFormData({});
                  setIsComplete(false);
                }}
                className="px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Another Project
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
      />
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
    <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
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
    <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={6}
        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all resize-none"
      />
    </motion.div>
  );
}

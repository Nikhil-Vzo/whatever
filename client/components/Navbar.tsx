import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Building2, Users } from "lucide-react";

type UserRole = "customer" | "builder";

interface NavbarProps {
  onRoleChange?: (role: UserRole) => void;
}

export default function Navbar({ onRoleChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setIsOpen(false);
    onRoleChange?.(role);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="font-heading text-xl font-bold text-slate-900">
            CivilConnect
          </span>
        </motion.div>

        {/* Right side - Role selector */}
        <div className="relative">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium text-slate-900">
              {selectedRole === "customer" ? "👤 Customer" : "🏢 Builder"}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-slate-600" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden"
              >
                <motion.button
                  onClick={() => handleRoleChange("customer")}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                    selectedRole === "customer"
                      ? "bg-slate-900 text-white"
                      : "text-slate-900 hover:bg-slate-50"
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <Users className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">Customer</p>
                    <p className="text-xs opacity-75">Post projects</p>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => handleRoleChange("builder")}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors border-t border-slate-200 ${
                    selectedRole === "builder"
                      ? "bg-slate-900 text-white"
                      : "text-slate-900 hover:bg-slate-50"
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <Building2 className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">Builder/Firm</p>
                    <p className="text-xs opacity-75">Find & bid on projects</p>
                  </div>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}

export type { UserRole };

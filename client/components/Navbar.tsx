import { motion } from "framer-motion";
import { Building2, Users } from "lucide-react";

type UserRole = "customer" | "builder";

interface NavbarProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export default function Navbar({ selectedRole, onRoleChange }: NavbarProps) {
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

        {/* Right side - Direct role selection */}
        <div className="flex gap-3">
          <motion.button
            onClick={() => onRoleChange("customer")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              selectedRole === "customer"
                ? "bg-slate-900 text-white shadow-lg"
                : "border-2 border-slate-300 text-slate-900 hover:border-slate-900"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="w-5 h-5" />
            Customer
          </motion.button>

          <motion.button
            onClick={() => onRoleChange("builder")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              selectedRole === "builder"
                ? "bg-slate-900 text-white shadow-lg"
                : "border-2 border-slate-300 text-slate-900 hover:border-slate-900"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Building2 className="w-5 h-5" />
            Builder
          </motion.button>
        </div>
      </div>
    </nav>
  );
}

export type { UserRole };

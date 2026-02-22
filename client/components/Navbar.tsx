import { motion } from "framer-motion";
import { Building2, Users } from "lucide-react";

type UserRole = "customer" | "builder";

interface NavbarProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export default function Navbar({ selectedRole, onRoleChange }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-2xl border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.div
          className="flex items-center gap-3 sm:gap-4"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src="/logo.png"
            alt="CivilConnect Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
          <span className="font-heading text-xl sm:text-2xl font-black tracking-tighter text-foreground">
            Civil<span className="text-primary italic">Connect</span>
          </span>
        </motion.div>

        {/* Role selection */}
        <div className="flex gap-1 sm:gap-2 p-1 bg-primary/5 rounded-2xl border border-primary/10 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <motion.button
            onClick={() => onRoleChange("customer")}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${selectedRole === "customer"
              ? "bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(184,134,11,0.2)] border border-primary/20"
              : "text-foreground/40 hover:text-foreground hover:bg-primary/5"
              }`}
            whileTap={{ scale: 0.98 }}
          >
            <Users className="w-4 h-4" />
            <span className="text-[10px] sm:text-sm uppercase tracking-widest">Customer</span>
          </motion.button>

          <motion.button
            onClick={() => onRoleChange("builder")}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${selectedRole === "builder"
              ? "bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(184,134,11,0.2)] border border-primary/20"
              : "text-foreground/40 hover:text-foreground hover:bg-primary/5"
              }`}
            whileTap={{ scale: 0.98 }}
          >
            <Building2 className="w-4 h-4" />
            <span className="text-[10px] sm:text-sm uppercase tracking-widest">Builder</span>
          </motion.button>
        </div>
      </div>
    </nav>
  );
}


export type { UserRole };

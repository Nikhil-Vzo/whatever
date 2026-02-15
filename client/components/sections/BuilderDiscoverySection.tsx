import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { TrendingUp, MapPin, Clock, DollarSign } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Luxury Residential Complex",
    location: "Mumbai, Maharashtra",
    budget: "₹25 Crore",
    timeline: "18 months",
    status: "Active",
    bids: 12,
    category: "Residential",
  },
  {
    id: 2,
    title: "Tech Park Development",
    location: "Bangalore, Karnataka",
    budget: "₹80 Crore",
    timeline: "24 months",
    status: "Active",
    bids: 8,
    category: "Commercial",
  },
  {
    id: 3,
    title: "Sustainable Housing Colony",
    location: "Pune, Maharashtra",
    budget: "₹15 Crore",
    timeline: "14 months",
    status: "Active",
    bids: 15,
    category: "Residential",
  },
  {
    id: 4,
    title: "Industrial Manufacturing Hub",
    location: "Gujarat",
    budget: "₹45 Crore",
    timeline: "20 months",
    status: "Active",
    bids: 6,
    category: "Industrial",
  },
  {
    id: 5,
    title: "Mixed-Use Urban Development",
    location: "Delhi NCR",
    budget: "₹120 Crore",
    timeline: "30 months",
    status: "Active",
    bids: 10,
    category: "Mixed-Use",
  },
  {
    id: 6,
    title: "Green Office Spaces",
    location: "Hyderabad, Telangana",
    budget: "₹35 Crore",
    timeline: "16 months",
    status: "Active",
    bids: 9,
    category: "Commercial",
  },
];

export default function BuilderDiscoverySection() {
  const [filter, setFilter] = useState<string | null>(null);

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

  const filteredProjects = filter
    ? projects.filter((p) => p.category === filter)
    : projects;

  const categories = ["Residential", "Commercial", "Industrial", "Mixed-Use"];

  return (
    <div className="space-y-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Discover Projects
          </h2>
          <p className="text-lg text-slate-600">
            Browse active projects and submit your bid
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-3 justify-center"
        >
          <motion.button
            onClick={() => setFilter(null)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === null
                ? "bg-slate-900 text-white"
                : "border border-slate-300 text-slate-700 hover:border-slate-500"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Projects
          </motion.button>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === cat
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 text-slate-700 hover:border-slate-500"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Projects grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-slate-600">No projects found in this category</p>
        </motion.div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    x.set(e.clientX - rect.left - centerX);
    y.set(e.clientY - rect.top - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="group relative"
    >
      <motion.div
        className="glass rounded-2xl p-6 h-full space-y-4 cursor-pointer relative overflow-hidden premium-shadow hover:premium-shadow-lg transition-shadow"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gold-400/0 to-gold-300/0 group-hover:from-gold-400/10 group-hover:to-gold-300/5 opacity-0 group-hover:opacity-100 transition-opacity"
          layoutId="glow"
        />

        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 line-clamp-2 group-hover:text-gold-500 transition-colors">
                  {project.title}
                </h3>
              </div>
              <motion.div
                className="px-3 py-1 rounded-full bg-gold-50 text-gold-700 text-xs font-medium whitespace-nowrap ml-2 flex-shrink-0"
                whileHover={{ scale: 1.1 }}
              >
                {project.status}
              </motion.div>
            </div>
          </div>

          {/* Category badge */}
          <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
            {project.category}
          </div>

          {/* Details */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span className="line-clamp-1">{project.location}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-slate-600">
                <DollarSign className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span className="font-medium">{project.budget}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>{project.timeline}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-200 group-hover:bg-gold-200 transition-colors" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gold-400" />
              <span className="text-sm font-medium text-slate-700">
                {project.bids} bids
              </span>
            </div>

            <motion.button
              className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View & Bid
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { TrendingUp, MapPin, Clock, DollarSign } from "lucide-react";

interface BuilderDiscoverySectionProps {
  isBuilderView?: boolean;
}

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
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1486323325578-934127991f64?w=500&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1503387593526-892a80511b53?w=500&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1486682456122-41891cfe3c5c?w=500&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=400&fit=crop",
  },
];

export default function BuilderDiscoverySection({
  isBuilderView = false,
}: BuilderDiscoverySectionProps) {
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
            {isBuilderView ? "Active Projects for Bidding" : "Trusted Builders Network"}
          </h2>
          <p className="text-lg text-slate-600">
            {isBuilderView
              ? "Browse quality construction projects and submit competitive bids"
              : "Connect with verified builders and firms"}
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
          transition: { duration: 0.6 },
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="group relative"
    >
      <motion.div
        className="glass rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer relative premium-shadow hover:premium-shadow-lg transition-shadow"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-slate-200">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            layoutId="gradient"
          />
        </div>

        {/* Background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gold-400/0 to-gold-300/0 group-hover:from-gold-400/10 group-hover:to-gold-300/5 opacity-0 group-hover:opacity-100 transition-opacity"
          layoutId="glow"
        />

        <div className="relative z-10 space-y-4 p-6 flex-1 flex flex-col">
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
          <div className="h-px bg-slate-200 group-hover:bg-gold-200 transition-colors mt-auto" />

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
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

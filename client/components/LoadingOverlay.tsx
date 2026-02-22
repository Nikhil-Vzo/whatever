import { motion, AnimatePresence } from "framer-motion";

interface LoadingOverlayProps {
    isVisible: boolean;
}

export default function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl"
                >
                    <div className="flex flex-col items-center gap-8">
                        <div className="loader" />
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="font-heading text-xs font-black uppercase tracking-[0.4em] text-primary/60"
                        >
                            Building Foundation
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}


import { motion, AnimatePresence } from "framer-motion";
import { LockKeyhole } from "lucide-react";

const LoadingScreen = ({ loading }) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#08090c]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex w-full max-w-xs flex-col items-center px-6">

            {/* SmartVault mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
            >
              <LockKeyhole
                className="h-5 w-5 text-slate-300"
                strokeWidth={1.8}
              />
            </motion.div>

            {/* Brand */}
            <motion.h1
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.3 }}
              className="mt-4 text-sm font-medium tracking-tight text-slate-200"
            >
              SmartVault
            </motion.h1>

            
            <div className="mt-7 h-[2px] w-32 overflow-hidden rounded-full bg-white/[0.08]">
              <motion.div
                className="h-full w-1/2 rounded-full bg-slate-400"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Status */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="mt-3 text-[11px] text-slate-500"
            >
              Loading
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;


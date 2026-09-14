import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const AuthLoadingScreen = ({message="Authenticating",subtitle="Securing Your Session",}) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080b12]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10"
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ShieldCheck className="h-7 w-7 text-slate-300" strokeWidth={1.8} />
      </motion.div>

      {/* Text */}
      <motion.div
        className="mt-5 text-center"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.15,
          duration: 0.4,
        }}
      >
        <p className="text-sm font-medium text-slate-200">{message}</p>

        <div className="mt-1.5 flex items-center justify-center">
          <span className="text-xs text-slate-500">{subtitle}</span>

          <span className="ml-1 flex gap-0.5">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="h-1 w-1 rounded-full bg-slate-500"
                animate={{
                  opacity: [0.25, 1, 0.25],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: dot * 0.15,
                }}
              />
            ))}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthLoadingScreen;

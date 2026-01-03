import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ loading }) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="relative flex flex-col items-center space-y-3"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-gray-200 font-medium tracking-wide text-sm">
              Loading SmartVault...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

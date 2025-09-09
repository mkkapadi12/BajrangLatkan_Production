// Loader.jsx
import React from "react";
import { motion } from "framer-motion";

const Loader = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      {/* Animated Dots */}
      <div className="flex space-x-2">
        <motion.div
          className="flex items-center justify-center space-x-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {/* Spinning Circles */}
          <motion.div
            className="w-4 h-4 rounded-full bg-bajrang-brand"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-4 h-4 rounded-full bg-bajrang-accent"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-4 h-4 rounded-full bg-bajrang-brand"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.p
        className="text-lg font-medium text-gray-600"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  );
};

export default Loader;

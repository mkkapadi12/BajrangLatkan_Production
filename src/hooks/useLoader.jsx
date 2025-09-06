import React, { useState } from "react";
import { motion } from "framer-motion";

export function useLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
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
  );
}

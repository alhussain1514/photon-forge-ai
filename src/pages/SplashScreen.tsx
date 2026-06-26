import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10"
      >
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a2d75eee-e314-4548-b1d2-8df7553ef39a/logo-a4f8fe19-1782500099591.webp" 
          alt="SunScale Pro" 
          className="w-48 h-48 object-contain rounded-3xl shadow-2xl shadow-primary/20"
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-8 text-center"
      >
        <h1 className="text-3xl font-bold tracking-tighter text-white">SunScale Pro</h1>
        <p className="mt-2 text-muted-foreground font-medium">Design • Audit • Install • Power the Future</p>
      </motion.div>

      {/* Animated solar rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            style={{ rotate: i * 30 }}
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              scaleX: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div 
        className="absolute bottom-12 flex space-x-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SplashScreen;

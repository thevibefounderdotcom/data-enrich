"use client";

import { motion } from "framer-motion";
import { ArrowRight, Upload, Sparkles } from "lucide-react";
import { LiveStats } from "./live-stats";

interface HeroSectionProps {
  onUploadClick: () => void;
  onTrySampleClick: () => void;
}

export function HeroSection({ onUploadClick, onTrySampleClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-base via-heat-4 to-background-base opacity-50" />

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, var(--heat-100) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            Turn Emails Into{" "}
            <span className="bg-gradient-to-r from-heat-100 via-heat-80 to-heat-100 bg-clip-text text-transparent animate-gradient">
              Intelligence
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-black-alpha-80 max-w-3xl mx-auto leading-relaxed">
            Transform email lists into rich company profiles with funding data, tech stacks, and verified sources
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={onUploadClick}
              className="group glass-button px-8 py-4 rounded-12 text-lg font-medium text-white bg-heat-100 hover:bg-heat-80 transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Upload className="w-5 h-5" />
              Upload CSV
            </button>

            <button
              onClick={onTrySampleClick}
              className="group glass-panel px-8 py-4 rounded-12 text-lg font-medium text-accent-black hover:bg-white/30 transition-all duration-200 flex items-center gap-3"
            >
              Try Sample Data
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Before/After Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="glass-panel p-8 rounded-16 border-2 border-white/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Before */}
              <div className="space-y-4">
                <div className="text-label-small font-semibold text-black-alpha-64 uppercase tracking-wider">
                  Before
                </div>
                <div className="glass-subtle p-4 rounded-8 text-left">
                  <code className="text-mono-medium text-black-alpha-80">
                    john@startup.io
                  </code>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex justify-center">
                <ArrowRight className="w-8 h-8 text-heat-100" />
              </div>

              {/* After */}
              <div className="space-y-4">
                <div className="text-label-small font-semibold text-black-alpha-64 uppercase tracking-wider">
                  After
                </div>
                <div className="glass-gradient-purple p-6 rounded-12 space-y-3 text-left">
                  <div className="flex items-center gap-2 text-body-medium">
                    <span className="text-2xl">🏢</span>
                    <span className="font-semibold">Startup Inc</span>
                  </div>
                  <div className="flex items-center gap-2 text-body-small text-black-alpha-80">
                    <span>💰</span>
                    <span>Series A, $5M</span>
                  </div>
                  <div className="flex items-center gap-2 text-body-small text-black-alpha-80">
                    <span>📍</span>
                    <span>San Francisco</span>
                  </div>
                  <div className="flex items-center gap-2 text-body-small text-black-alpha-80">
                    <span>⚙️</span>
                    <span>React, Node.js, AWS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Stats */}
        <div className="mt-12">
          <LiveStats />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <div className="flex justify-center">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-black-alpha-32 rounded-full flex items-start justify-center p-2"
            >
              <div className="w-1 h-2 bg-black-alpha-32 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Add gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}

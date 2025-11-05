"use client";

import { motion } from "framer-motion";
import { Upload, Target, Download, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Upload,
    title: "Upload CSV",
    description: "Drop your email list with company domains",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "2",
    icon: Target,
    title: "Select Fields",
    description: "Choose data points or use AI to generate them",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "3",
    icon: Download,
    title: "Download Results",
    description: "Get enriched data with verified sources",
    color: "from-orange-500 to-red-500",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How Data Enrich Works
          </h2>
          <p className="text-xl text-black-alpha-64 max-w-2xl mx-auto">
            Three simple steps to transform your email list into actionable intelligence
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines (desktop only) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-black-alpha-16 to-transparent" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="glass-card p-8 rounded-16 hover:scale-105 transition-transform duration-300 group">
                  {/* Step Number Badge */}
                  <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-16 bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-body-medium text-black-alpha-64 text-center leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-heat-100 animate-pulse" />
                  </div>
                </div>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <ArrowRight className="w-6 h-6 text-black-alpha-32 rotate-90" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 glass-subtle px-6 py-3 rounded-full">
            <span className="text-2xl">⚡</span>
            <span className="text-body-medium text-black-alpha-80">
              Average processing time: <span className="font-semibold text-accent-black">2.3 seconds per email</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

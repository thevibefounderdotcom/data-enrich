"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Ban, CheckCircle, FileCheck, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Enterprise-Grade",
    description: "Built with security-first architecture",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Lock,
    title: "End-to-End Encrypted",
    description: "Your data is encrypted at rest and in transit",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Ban,
    title: "Rate Limiting",
    description: "Protection against abuse and DDoS attacks",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: FileCheck,
    title: "Input Sanitization",
    description: "All inputs validated and sanitized",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    title: "No Data Retention",
    description: "We don't store your enriched data",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: CheckCircle,
    title: "Source Attribution",
    description: "Every data point linked to verified sources",
    color: "from-yellow-500 to-amber-500",
  },
];

export function EnterpriseSecurity() {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-black/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-subtle px-4 py-2 rounded-full mb-6">
            <Shield className="w-5 h-5 text-heat-100" />
            <span className="text-label-small font-semibold text-heat-100 uppercase tracking-wider">
              Enterprise Security
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built for Enterprise Security
          </h2>
          <p className="text-xl text-black-alpha-64 max-w-2xl mx-auto">
            Your data security is our top priority. Enterprise-grade protection built into every layer
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="glass-card p-8 rounded-16 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mb-6 rounded-12 bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-body-medium text-black-alpha-64 flex-1">
                    {feature.description}
                  </p>

                  {/* Check mark on hover */}
                  <div className="mt-4 flex items-center gap-2 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-label-small font-medium">Protected</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="glass-gradient-blue p-8 rounded-16 text-center">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-accent-black">SSL/TLS</div>
                  <div className="text-body-small text-black-alpha-64">
                    End-to-end encryption
                  </div>
                </div>
              </div>

              <div className="hidden md:block w-px h-12 bg-black-alpha-16" />

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-accent-black">GDPR Ready</div>
                  <div className="text-body-small text-black-alpha-64">
                    Privacy compliant
                  </div>
                </div>
              </div>

              <div className="hidden md:block w-px h-12 bg-black-alpha-16" />

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-accent-black">SOC 2 Type II</div>
                  <div className="text-body-small text-black-alpha-64">
                    Certified secure
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-8 text-body-medium text-black-alpha-64">
              All enriched data includes verified source URLs for complete transparency
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

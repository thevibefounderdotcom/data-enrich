"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Mail } from "lucide-react";

const features = [
  "Unlimited fields per email",
  "No monthly minimums",
  "Cancel anytime",
  "Volume discounts available",
  "API access included",
  "Priority support",
  "Full source attribution",
  "Domain filtering included",
];

export function PricingSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pay Only for What You Use
          </h2>
          <p className="text-xl text-black-alpha-64 max-w-2xl mx-auto">
            Simple, transparent pricing with no hidden fees or monthly commitments
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-12 rounded-24 border-2 border-white/40 hover:border-heat-100/50 transition-all duration-300 hover:shadow-2xl">
            <div className="text-center mb-12">
              {/* Free Trial Badge */}
              <div className="inline-flex items-center gap-2 glass-gradient-purple px-4 py-2 rounded-full mb-6">
                <span className="text-2xl">🎁</span>
                <span className="font-semibold">First 100 emails FREE</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-6xl md:text-7xl font-bold">$0.07</span>
                <span className="text-2xl text-black-alpha-64">per email</span>
              </div>

              <p className="text-body-medium text-black-alpha-64">
                Only pay for enriched emails • Automatic domain filtering saves you more
              </p>
            </div>

            {/* Features List */}
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-body-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 glass-button px-8 py-4 rounded-12 text-lg font-medium text-white bg-heat-100 hover:bg-heat-80 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>

              <button className="flex-1 glass-panel px-8 py-4 rounded-12 text-lg font-medium text-accent-black hover:bg-white/30 transition-all duration-200 flex items-center justify-center gap-3">
                <Mail className="w-5 h-5" />
                Contact Sales
              </button>
            </div>

            {/* Trust Note */}
            <p className="text-center text-body-small text-black-alpha-64 mt-8">
              No credit card required • Get started in under 60 seconds
            </p>
          </div>
        </motion.div>

        {/* Enterprise Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 glass-subtle px-6 py-3 rounded-full">
            <span className="text-body-medium text-black-alpha-80">
              Processing 10,000+ emails/month?{" "}
              <a href="#contact" className="font-semibold text-heat-100 hover:underline">
                Contact us
              </a>{" "}
              for enterprise pricing
            </span>
          </div>
        </motion.div>

        {/* Cost Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 glass-gradient-blue p-8 rounded-16"
        >
          <h3 className="text-2xl font-bold text-center mb-6">
            Example Pricing
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-black mb-2">
                500
              </div>
              <div className="text-body-small text-black-alpha-64 mb-4">
                emails/month
              </div>
              <div className="text-2xl font-semibold text-heat-100">
                $35<span className="text-lg text-black-alpha-64">/mo</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-accent-black mb-2">
                2,000
              </div>
              <div className="text-body-small text-black-alpha-64 mb-4">
                emails/month
              </div>
              <div className="text-2xl font-semibold text-heat-100">
                $140<span className="text-lg text-black-alpha-64">/mo</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-accent-black mb-2">
                5,000
              </div>
              <div className="text-body-small text-black-alpha-64 mb-4">
                emails/month
              </div>
              <div className="text-2xl font-semibold text-heat-100">
                $350<span className="text-lg text-black-alpha-64">/mo</span>
              </div>
            </div>
          </div>

          <p className="text-center text-body-small text-black-alpha-64 mt-6">
            Save up to 47% more with smart domain filtering
          </p>
        </motion.div>
      </div>
    </section>
  );
}

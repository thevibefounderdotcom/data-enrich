"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function FooterCTA() {
  return (
    <footer className="relative py-32 px-6 bg-gradient-to-b from-transparent via-heat-4 to-background-base">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="glass-gradient-blue p-12 rounded-24">
            <Sparkles className="w-16 h-16 text-heat-100 mx-auto mb-6" />

            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to Transform Your Data?
            </h2>

            <p className="text-xl text-black-alpha-64 mb-8 max-w-2xl mx-auto">
              Join thousands of teams using Data Enrich to save time and close more deals
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-heat-100 to-heat-80 text-white px-8 py-4 rounded-12 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              onClick={() => {
                const uploadSection = document.getElementById('upload-section');
                if (uploadSection) {
                  uploadSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <p className="text-body-medium text-black-alpha-64 mt-4">
              100 emails free • No credit card required
            </p>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-black-alpha-8 pt-12"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left: Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-heat-100 to-heat-80 rounded-8" />
                <span className="text-xl font-bold">Data Enrich</span>
              </div>
              <p className="text-body-medium text-black-alpha-64 max-w-md">
                AI-powered data enrichment with enterprise-grade security.
                Transform email lists into actionable intelligence.
              </p>
            </div>

            {/* Right: Links */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="#pricing" className="text-body-medium text-black-alpha-64 hover:text-accent-black transition-colors">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#features" className="text-body-medium text-black-alpha-64 hover:text-accent-black transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#security" className="text-body-medium text-black-alpha-64 hover:text-accent-black transition-colors">
                      Security
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" className="text-body-medium text-black-alpha-64 hover:text-accent-black transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-body-medium text-black-alpha-64 hover:text-accent-black transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-body-medium text-black-alpha-64 hover:text-accent-black transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-body-small text-black-alpha-64">
            © {new Date().getFullYear()} Data Enrich. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

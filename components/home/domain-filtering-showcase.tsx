"use client";

import { motion } from "framer-motion";
import { Mail, Building2, DollarSign, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

export function DomainFilteringShowcase() {
  const [personalEnabled, setPersonalEnabled] = useState(true);
  const [companyEnabled, setCompanyEnabled] = useState(false);

  const personalCount = 150;
  const companyCount = 50;
  const totalCount = personalCount + companyCount;

  const selectedCount = (personalEnabled ? personalCount : 0) + (companyEnabled ? companyCount : 0);
  const savingsPercent = Math.round((1 - selectedCount / totalCount) * 100);

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-heat-4 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-subtle px-4 py-2 rounded-full mb-6">
            <span className="text-2xl">💰</span>
            <span className="text-label-small font-semibold text-heat-100 uppercase tracking-wider">
              Credit Saver
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Save API Credits with Smart Filtering
          </h2>
          <p className="text-xl text-black-alpha-64 max-w-2xl mx-auto">
            Automatically categorize and filter emails before enrichment to only process what matters
          </p>
        </motion.div>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel p-8 rounded-16"
        >
          {/* Filter Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Personal Emails Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPersonalEnabled(!personalEnabled)}
              className={`cursor-pointer glass-card p-6 rounded-12 border-2 transition-all ${
                personalEnabled
                  ? "border-heat-100 bg-heat-4"
                  : "border-white/30 hover:border-white/50"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-10 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Personal Emails</h3>
                    <p className="text-body-small text-black-alpha-64">
                      Gmail, Yahoo, Outlook
                    </p>
                  </div>
                </div>
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                    personalEnabled
                      ? "bg-heat-100 border-heat-100"
                      : "border-border-muted"
                  }`}
                >
                  {personalEnabled && <CheckCircle2 className="w-6 h-6 text-white" />}
                </div>
              </div>

              <div className="text-3xl font-bold text-accent-black mb-1">
                {personalCount}
              </div>
              <div className="text-body-small text-black-alpha-64">
                emails detected
              </div>
            </motion.div>

            {/* Company Emails Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCompanyEnabled(!companyEnabled)}
              className={`cursor-pointer glass-card p-6 rounded-12 border-2 transition-all ${
                companyEnabled
                  ? "border-heat-100 bg-heat-4"
                  : "border-white/30 hover:border-white/50"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-10 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Company Emails</h3>
                    <p className="text-body-small text-black-alpha-64">
                      Custom domains
                    </p>
                  </div>
                </div>
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                    companyEnabled
                      ? "bg-heat-100 border-heat-100"
                      : "border-border-muted"
                  }`}
                >
                  {companyEnabled && <CheckCircle2 className="w-6 h-6 text-white" />}
                </div>
              </div>

              <div className="text-3xl font-bold text-accent-black mb-1">
                {companyCount}
              </div>
              <div className="text-body-small text-black-alpha-64">
                emails detected
              </div>
            </motion.div>
          </div>

          {/* Summary Bar */}
          <div className="glass-gradient-blue p-6 rounded-12 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-label-medium text-black-alpha-64 mb-1">
                  Selected for enrichment
                </div>
                <div className="text-3xl font-bold text-accent-black">
                  {selectedCount} <span className="text-xl text-black-alpha-64">/ {totalCount}</span>
                </div>
              </div>

              {savingsPercent > 0 && (
                <div className="text-right">
                  <div className="inline-flex items-center gap-2 glass-subtle px-4 py-2 rounded-full">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">
                      {savingsPercent}%
                    </span>
                    <span className="text-body-small text-black-alpha-64">
                      saved
                    </span>
                  </div>
                </div>
              )}
            </div>

            {selectedCount === 0 && (
              <div className="flex items-start gap-3 p-4 bg-yellow-50/80 rounded-8 border border-yellow-200/50">
                <XCircle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-label-small font-semibold text-yellow-800">
                    No emails selected
                  </p>
                  <p className="text-body-small text-yellow-700">
                    Select at least one email type to proceed
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Stats Footer */}
          <div className="mt-8 text-center">
            <p className="text-body-small text-black-alpha-64">
              Based on 12,345 enrichments this month, users save an average of{" "}
              <span className="font-semibold text-heat-100">47%</span> on API costs
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

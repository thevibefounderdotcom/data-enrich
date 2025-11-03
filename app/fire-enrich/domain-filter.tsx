"use client";

import { useState, useEffect } from "react";
import { Mail, Building2, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  categorizeEmails,
  getUniqueDomains,
  type DomainBreakdown,
} from "@/lib/utils/email-categorization";
import { CSVRow } from "@/lib/types";

interface DomainFilterProps {
  rows: CSVRow[];
  emailColumn: string;
  onFilterChange: (filter: {
    includePersonal: boolean;
    includeCompany: boolean;
    filteredRowCount: number;
  }) => void;
}

export function DomainFilter({
  rows,
  emailColumn,
  onFilterChange,
}: DomainFilterProps) {
  const [includePersonal, setIncludePersonal] = useState(true);
  const [includeCompany, setIncludeCompany] = useState(false);
  const [breakdown, setBreakdown] = useState<DomainBreakdown | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Extract emails from rows
    const emails = rows
      .map((row) => row[emailColumn])
      .filter((email): email is string => typeof email === "string");

    // Categorize emails
    const emailBreakdown = categorizeEmails(emails);
    setBreakdown(emailBreakdown);
  }, [rows, emailColumn]);

  useEffect(() => {
    if (!breakdown) return;

    // Calculate filtered row count
    let filteredCount = 0;
    if (includePersonal) filteredCount += breakdown.totalPersonal;
    if (includeCompany) filteredCount += breakdown.totalCompany;

    onFilterChange({
      includePersonal,
      includeCompany,
      filteredRowCount: filteredCount,
    });
  }, [includePersonal, includeCompany, breakdown, onFilterChange]);

  if (!breakdown) {
    return null;
  }

  const filteredCount =
    (includePersonal ? breakdown.totalPersonal : 0) +
    (includeCompany ? breakdown.totalCompany : 0);

  const personalDomains = getUniqueDomains(breakdown.personal);
  const companyDomains = getUniqueDomains(breakdown.company);

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="glass-panel p-4 rounded-12">
        <h3 className="text-label-large font-semibold mb-3 flex items-center gap-2">
          <Mail className="w-18 h-18 text-heat-100" />
          Email Domain Filter
        </h3>
        <p className="text-body-small text-black-alpha-64 mb-4">
          Choose which email types to enrich. This helps you save API credits by
          skipping unwanted contacts.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {/* Personal Emails */}
          <div
            className={`glass-card p-4 rounded-8 cursor-pointer transition-all duration-200 ${
              includePersonal
                ? "ring-2 ring-heat-100 bg-heat-4"
                : "hover:bg-white/15"
            }`}
            onClick={() => setIncludePersonal(!includePersonal)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Mail className="w-16 h-16 text-blue-500" />
                <span className="text-label-small font-medium">
                  Personal Emails
                </span>
              </div>
              <div
                className={`w-20 h-20 rounded-4 border-2 flex items-center justify-center transition-all ${
                  includePersonal
                    ? "bg-heat-100 border-heat-100"
                    : "border-border-muted"
                }`}
              >
                {includePersonal && (
                  <CheckCircle2 className="w-14 h-14 text-white" />
                )}
              </div>
            </div>
            <div className="text-title-h4 font-semibold mb-1">
              {breakdown.totalPersonal}
            </div>
            <div className="text-body-small text-black-alpha-64">
              Gmail, Yahoo, Outlook, etc.
            </div>
          </div>

          {/* Company Emails */}
          <div
            className={`glass-card p-4 rounded-8 cursor-pointer transition-all duration-200 ${
              includeCompany
                ? "ring-2 ring-heat-100 bg-heat-4"
                : "hover:bg-white/15"
            }`}
            onClick={() => setIncludeCompany(!includeCompany)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-16 h-16 text-purple-500" />
                <span className="text-label-small font-medium">
                  Company Emails
                </span>
              </div>
              <div
                className={`w-20 h-20 rounded-4 border-2 flex items-center justify-center transition-all ${
                  includeCompany
                    ? "bg-heat-100 border-heat-100"
                    : "border-border-muted"
                }`}
              >
                {includeCompany && (
                  <CheckCircle2 className="w-14 h-14 text-white" />
                )}
              </div>
            </div>
            <div className="text-title-h4 font-semibold mb-1">
              {breakdown.totalCompany}
            </div>
            <div className="text-body-small text-black-alpha-64">
              Custom company domains
            </div>
          </div>

          {/* Invalid Emails */}
          {breakdown.totalInvalid > 0 && (
            <div className="glass-card p-4 rounded-8 bg-red-50/50 border-red-200/30">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-16 h-16 text-red-500" />
                  <span className="text-label-small font-medium text-red-700">
                    Invalid Emails
                  </span>
                </div>
              </div>
              <div className="text-title-h4 font-semibold mb-1 text-red-700">
                {breakdown.totalInvalid}
              </div>
              <div className="text-body-small text-red-600">
                Will be skipped automatically
              </div>
            </div>
          )}
        </div>

        {/* Selection Summary */}
        <div className="glass-subtle p-3 rounded-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-label-medium font-medium">
              Selected for enrichment:
            </span>
            <span className="text-title-h5 font-semibold text-heat-100">
              {filteredCount}
            </span>
            <span className="text-body-small text-black-alpha-64">
              / {breakdown.total} total
            </span>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-label-small text-heat-100 hover:underline"
          >
            {showDetails ? "Hide details" : "View details"}
          </button>
        </div>

        {/* Details Section */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3">
                {/* Personal Domains */}
                {breakdown.totalPersonal > 0 && (
                  <div className="glass-subtle p-3 rounded-8">
                    <h4 className="text-label-small font-semibold mb-2 flex items-center gap-2">
                      <Mail className="w-14 h-14 text-blue-500" />
                      Personal Email Domains ({personalDomains.size} unique)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(personalDomains.entries())
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 10)
                        .map(([domain, count]) => (
                          <span
                            key={domain}
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded-4 text-mono-small"
                          >
                            {domain} ({count})
                          </span>
                        ))}
                      {personalDomains.size > 10 && (
                        <span className="px-2 py-1 text-black-alpha-64 text-mono-small">
                          +{personalDomains.size - 10} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Company Domains */}
                {breakdown.totalCompany > 0 && (
                  <div className="glass-subtle p-3 rounded-8">
                    <h4 className="text-label-small font-semibold mb-2 flex items-center gap-2">
                      <Building2 className="w-14 h-14 text-purple-500" />
                      Company Email Domains ({companyDomains.size} unique)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(companyDomains.entries())
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 10)
                        .map(([domain, count]) => (
                          <span
                            key={domain}
                            className="px-2 py-1 bg-purple-50 text-purple-700 rounded-4 text-mono-small"
                          >
                            {domain} ({count})
                          </span>
                        ))}
                      {companyDomains.size > 10 && (
                        <span className="px-2 py-1 text-black-alpha-64 text-mono-small">
                          +{companyDomains.size - 10} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Warning if nothing selected */}
        {filteredCount === 0 && (
          <div className="mt-4 p-3 glass-panel border-yellow-300/50 bg-yellow-50/80 rounded-8">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-16 h-16 text-yellow-600 mt-1 shrink-0" />
              <div>
                <p className="text-label-small font-semibold text-yellow-800">
                  No emails selected
                </p>
                <p className="text-body-small text-yellow-700">
                  Please select at least one email type to proceed with
                  enrichment.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

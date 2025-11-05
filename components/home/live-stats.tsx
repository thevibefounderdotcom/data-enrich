"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LiveStats {
  todayEnriched: number;
  totalEnriched: number;
  avgSavings: number;
  avgProcessingTime: string;
  activeUsers: number;
}

export function LiveStats() {
  const [stats, setStats] = useState<LiveStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setStats(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchStats();

    // Refresh every 60 seconds
    const interval = setInterval(fetchStats, 60000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="flex items-center gap-6 text-body-small text-black-alpha-64">
        <span>Loading stats...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex flex-wrap items-center justify-center gap-6 text-body-small"
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">🔥</span>
        <span className="font-medium text-accent-black">
          {stats.todayEnriched.toLocaleString()}
        </span>
        <span className="text-black-alpha-64">enriched today</span>
      </div>

      <span className="text-black-alpha-32">•</span>

      <div className="flex items-center gap-2">
        <span className="text-2xl">⚡</span>
        <span className="font-medium text-accent-black">
          {stats.totalEnriched.toLocaleString()}
        </span>
        <span className="text-black-alpha-64">total processed</span>
      </div>

      {stats.activeUsers && (
        <>
          <span className="text-black-alpha-32">•</span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-medium text-accent-black">
              {stats.activeUsers}
            </span>
            <span className="text-black-alpha-64">active now</span>
          </div>
        </>
      )}
    </motion.div>
  );
}

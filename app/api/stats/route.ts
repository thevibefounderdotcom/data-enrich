import { NextResponse } from 'next/server';

// In-memory stats (replace with database in production)
let stats = {
  todayEnriched: 0,
  totalEnriched: 0,
  lastReset: new Date().toDateString(),
};

export async function GET() {
  // Reset daily counter if it's a new day
  const today = new Date().toDateString();
  if (stats.lastReset !== today) {
    stats.todayEnriched = 0;
    stats.lastReset = today;
  }

  // Calculate some sample metrics
  // In production, these would come from your database
  const response = {
    todayEnriched: stats.todayEnriched || 1234,
    totalEnriched: stats.totalEnriched || 345678,
    avgSavings: 47, // Average percentage saved with filtering
    avgProcessingTime: "2.3s",
    activeUsers: Math.floor(Math.random() * 20) + 10, // Simulated for now
  };

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  // Increment counters when enrichments happen
  const body = await request.json();
  const { count = 1 } = body;

  stats.todayEnriched += count;
  stats.totalEnriched += count;

  return NextResponse.json({ success: true, stats });
}

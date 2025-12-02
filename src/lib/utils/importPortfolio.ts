import type { PortfolioHolding } from "$lib/stores/portfolio";

export const userPortfolio: Array<{
  ticker: string;
  shares: number;
  avgCost: number;
}> = [
  { ticker: "MSTX", shares: 600, avgCost: 5.25 },
  { ticker: "ARKK", shares: 19.74, avgCost: 76.5 },
  { ticker: "VBK", shares: 3.68, avgCost: 293.59 },
  { ticker: "IWMI", shares: 31.12, avgCost: 47.78 },
  { ticker: "SCHG", shares: 25.11, avgCost: 32.46 },
  { ticker: "VXUS", shares: 10.36, avgCost: 73.81 },
  { ticker: "QQQI", shares: 40.05, avgCost: 54.39 },
  { ticker: "SPYI", shares: 54.57, avgCost: 52.44 },
  { ticker: "CHAT", shares: 5.85, avgCost: 60.89 },
  { ticker: "IBIT", shares: 3.13, avgCost: 51.95 },
  { ticker: "ETH", shares: 5.71, avgCost: 28.45 },
  { ticker: "SGOV", shares: 258.45, avgCost: 100.6 },
  { ticker: "BNDI", shares: 6.62, avgCost: 47.83 },
  { ticker: "UNH", shares: 10, avgCost: 327.38 },
];

export function createPortfolioHoldings(): PortfolioHolding[] {
  return userPortfolio.map((item, index) => ({
    id: `import-${Date.now()}-${index}`,
    ticker: item.ticker.toUpperCase(),
    shares: item.shares,
    avgCost: item.avgCost,
  }));
}

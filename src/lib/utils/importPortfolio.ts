import type { PortfolioHolding } from '$lib/stores/portfolio';

export const userPortfolio: Array<{ ticker: string; shares: number; avgCost: number }> = [
	{ ticker: 'MSTX', shares: 600, avgCost: 5.44 },
	{ ticker: 'VBK', shares: 3.68, avgCost: 293.75 },
	{ ticker: 'ARKK', shares: 19.74, avgCost: 54.25 },
	{ ticker: 'IWMI', shares: 31.12, avgCost: 12.50 },
	{ ticker: 'VXUS', shares: 10.36, avgCost: 68.50 },
	{ ticker: 'SCHG', shares: 25.11, avgCost: 85.25 },
	{ ticker: 'SPYI', shares: 54.57, avgCost: 52.45 },
	{ ticker: 'QQQI', shares: 40.05, avgCost: 18.75 },
	{ ticker: 'CHAT', shares: 5.85, avgCost: 12.50 },
	{ ticker: 'SGOV', shares: 258.45, avgCost: 100.25 },
	{ ticker: 'BNDI', shares: 6.62, avgCost: 24.50 },
	{ ticker: 'UNH', shares: 10, avgCost: 525.00 },
	{ ticker: 'ETH', shares: 5.71, avgCost: 3200.00 },
	{ ticker: 'IBIT', shares: 3.13, avgCost: 42.50 }
];

export function createPortfolioHoldings(): PortfolioHolding[] {
	return userPortfolio.map((item, index) => ({
		id: `import-${Date.now()}-${index}`,
		ticker: item.ticker.toUpperCase(),
		shares: item.shares,
		avgCost: item.avgCost
	}));
}

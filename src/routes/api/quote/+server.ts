import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const symbol = url.searchParams.get('symbol');
	
	if (!symbol) {
		return json({ error: 'Symbol required' }, { status: 400 });
	}
	
	try {
		const response = await fetch(
			`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
			{
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
				}
			}
		);
		
		if (!response.ok) {
			return json({ error: `API returned ${response.status}` }, { status: response.status });
		}
		
		const data = await response.json();
		
		if (!data.chart || !data.chart.result) {
			return json({ error: 'Symbol not found' }, { status: 404 });
		}
		
		const result = Array.isArray(data.chart.result) ? data.chart.result[0] : data.chart.result;
		
		if (!result || !result.meta) {
			return json({ error: 'Invalid quote data' }, { status: 404 });
		}
		
		const meta = result.meta;
		const currentPrice = meta.regularMarketPrice ?? meta.previousClose ?? 0;
		const previousClose = meta.previousClose ?? currentPrice;
		const change = currentPrice - previousClose;
		const changePercent = previousClose > 0 ? (change / previousClose) * 100 : 0;
		
		let dividendYield = 0;
		if (meta.dividendYield != null) {
			dividendYield = meta.dividendYield * 100;
		} else if (meta.trailingAnnualDividendYield != null) {
			dividendYield = meta.trailingAnnualDividendYield * 100;
		} else if (meta.dividendRate != null && currentPrice > 0) {
			dividendYield = (meta.dividendRate / currentPrice) * 100;
		}
		
		// averageYield will be calculated on the client side based on user's average cost
		// This is "yield on cost" - the dividend yield based on purchase price
		const averageYield = dividendYield; // Will be recalculated as yield on cost
		
		const quote = {
			symbol: meta.symbol || symbol,
			name: meta.longName || meta.shortName || symbol,
			price: currentPrice,
			change: change,
			changePercent: changePercent,
			currentYield: dividendYield,
			averageYield: averageYield,
			currency: meta.currency || 'USD',
			exchange: meta.exchangeName || meta.fullExchangeName || 'N/A'
		};
		
		return json(quote);
	} catch (error: any) {
		return json({ 
			error: 'Failed to fetch quote',
			details: error.message 
		}, { status: 500 });
	}
};


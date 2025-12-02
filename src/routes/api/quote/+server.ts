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
			console.error('Yahoo Finance API error:', response.status, response.statusText);
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
		
		const quote = {
			symbol: meta.symbol || symbol,
			name: meta.longName || meta.shortName || symbol,
			price: currentPrice,
			change: change,
			changePercent: changePercent,
			currency: meta.currency || 'USD',
			exchange: meta.exchangeName || meta.fullExchangeName || 'N/A'
		};
		
		return json(quote);
	} catch (error: any) {
		console.error('Error fetching quote:', error);
		return json({ 
			error: 'Failed to fetch quote',
			details: error.message 
		}, { status: 500 });
	}
};


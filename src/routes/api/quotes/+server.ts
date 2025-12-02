import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const symbolsParam = url.searchParams.get('symbols');
	if (!symbolsParam) {
		return json({ error: 'Symbols parameter required' }, { status: 400 });
	}
	
	try {
		const apiUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbolsParam}?interval=1d&range=1d`;
		
		const response = await fetch(apiUrl, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
			}
		});
		
		if (!response.ok) {
			console.error('Yahoo Finance API error:', response.status, response.statusText);
			return json({ error: `API returned ${response.status}` }, { status: response.status });
		}
		
		const data = await response.json();
		
		if (!data.chart || !data.chart.result) {
			console.error('Unexpected API response structure:', data);
			return json({ error: 'Invalid API response' }, { status: 500 });
		}
		
		const results = Array.isArray(data.chart.result) ? data.chart.result : [data.chart.result];
		
		const quotes = results
			.filter((result: any) => result && result.meta)
			.map((result: any) => {
				const meta = result.meta;
				const currentPrice = meta.regularMarketPrice ?? meta.previousClose ?? 0;
				const previousClose = meta.previousClose ?? currentPrice;
				const change = currentPrice - previousClose;
				const changePercent = previousClose > 0 ? (change / previousClose) * 100 : 0;
				
				return {
					symbol: meta.symbol || 'UNKNOWN',
					name: meta.longName || meta.shortName || meta.symbol || 'Unknown',
					price: currentPrice,
					change: change,
					changePercent: changePercent,
					currency: meta.currency || 'USD',
					exchange: meta.exchangeName || meta.fullExchangeName || 'N/A'
				};
			});
		
		if (quotes.length === 0) {
			return json({ error: 'No valid quotes found' }, { status: 404 });
		}
		
		return json({ quotes });
	} catch (error: any) {
		console.error('Error fetching quotes:', error);
		return json({ 
			error: 'Failed to fetch quotes', 
			details: error.message 
		}, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { symbols } = await request.json();
		
		if (!Array.isArray(symbols) || symbols.length === 0) {
			return json({ error: 'Symbols array required' }, { status: 400 });
		}
		
		const quotes: any[] = [];
		
		for (const symbol of symbols) {
			try {
				const apiUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
				
				const response = await fetch(apiUrl, {
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
					}
				});
				
				if (!response.ok) {
					console.warn(`Failed to fetch ${symbol}: ${response.status}`);
					continue;
				}
				
				const data = await response.json();
				
				if (!data.chart || !data.chart.result) {
					console.warn(`No data for ${symbol}`);
					continue;
				}
				
				const result = Array.isArray(data.chart.result) ? data.chart.result[0] : data.chart.result;
				
				if (!result || !result.meta) {
					console.warn(`No meta data for ${symbol}`);
					continue;
				}
				
				const meta = result.meta;
				const currentPrice = meta.regularMarketPrice ?? meta.previousClose ?? 0;
				const previousClose = meta.previousClose ?? currentPrice;
				const change = currentPrice - previousClose;
				const changePercent = previousClose > 0 ? (change / previousClose) * 100 : 0;
				
				quotes.push({
					symbol: (meta.symbol || symbol).toUpperCase(),
					name: meta.longName || meta.shortName || symbol || 'Unknown',
					price: currentPrice,
					change: change,
					changePercent: changePercent,
					currency: meta.currency || 'USD',
					exchange: meta.exchangeName || meta.fullExchangeName || 'N/A'
				});
				
				await new Promise(resolve => setTimeout(resolve, 100));
			} catch (error: any) {
				console.error(`Error fetching ${symbol}:`, error.message);
				continue;
			}
		}
		
		console.log(`Fetched ${quotes.length}/${symbols.length} quotes`);
		
		return json({ quotes });
	} catch (error: any) {
		console.error('Error fetching quotes:', error);
		return json({ 
			error: 'Failed to fetch quotes', 
			details: error.message 
		}, { status: 500 });
	}
};


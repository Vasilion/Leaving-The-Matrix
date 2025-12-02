import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const symbolsParam = url.searchParams.get("symbols");
  if (!symbolsParam) {
    return json({ error: "Symbols parameter required" }, { status: 400 });
  }

  try {
    const apiUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbolsParam}?interval=1d&range=1d`;

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      return json(
        { error: `API returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.chart || !data.chart.result) {
      return json({ error: "Invalid API response" }, { status: 500 });
    }

    const results = Array.isArray(data.chart.result)
      ? data.chart.result
      : [data.chart.result];

    const quotes = results
      .filter((result: any) => result && result.meta)
      .map((result: any) => {
        const meta = result.meta;
        const currentPrice = meta.regularMarketPrice ?? meta.previousClose ?? 0;
        const previousClose = meta.previousClose ?? currentPrice;

        return {
          symbol: meta.symbol || "UNKNOWN",
          name: meta.longName || meta.shortName || meta.symbol || "Unknown",
          price: currentPrice,
          previousClose: previousClose,
          currency: meta.currency || "USD",
          exchange: meta.exchangeName || meta.fullExchangeName || "N/A",
        };
      });

    if (quotes.length === 0) {
      return json({ error: "No valid quotes found" }, { status: 404 });
    }

    return json({ quotes });
  } catch (error: any) {
    return json(
      {
        error: "Failed to fetch quotes",
        details: error.message,
      },
      { status: 500 }
    );
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { symbols } = await request.json();

    if (!Array.isArray(symbols) || symbols.length === 0) {
      return json({ error: "Symbols array required" }, { status: 400 });
    }

    const quotes: any[] = [];

    for (const symbol of symbols) {
      try {
        const apiUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;

        const response = await fetch(apiUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        });

        if (!response.ok) {
          continue;
        }

        const data = await response.json();

        if (!data.chart || !data.chart.result) {
          continue;
        }

        const result = Array.isArray(data.chart.result)
          ? data.chart.result[0]
          : data.chart.result;

        if (!result || !result.meta) {
          continue;
        }

        const meta = result.meta;
        const currentPrice = meta.regularMarketPrice ?? meta.previousClose ?? 0;
        const previousClose = meta.previousClose ?? currentPrice;

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
        // For now, we'll just use the same dividend yield
        // The client will calculate yield on cost when it has the avgCost data
        const averageYield = dividendYield; // Will be recalculated as yield on cost

        quotes.push({
          symbol: (meta.symbol || symbol).toUpperCase(),
          name: meta.longName || meta.shortName || symbol || "Unknown",
          price: currentPrice,
          previousClose: previousClose,
          currentYield: dividendYield,
          averageYield: averageYield,
          currency: meta.currency || "USD",
          exchange: meta.exchangeName || meta.fullExchangeName || "N/A",
        });

        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error: any) {
        continue;
      }
    }

    return json({ quotes });
  } catch (error: any) {
    return json(
      {
        error: "Failed to fetch quotes",
        details: error.message,
      },
      { status: 500 }
    );
  }
};

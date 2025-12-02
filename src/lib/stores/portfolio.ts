import { writable } from "svelte/store";

export interface PortfolioHolding {
  id: string;
  ticker: string;
  shares: number;
  avgCost: number;
  currentPrice?: number;
  previousClose?: number;
  currentValue?: number;
  currentYield?: number;
  averageYield?: number;
  lastUpdated?: string;
}

function createPortfolioStore() {
  const { subscribe, set, update } = writable<PortfolioHolding[]>([]);

  return {
    subscribe,
    load: () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("portfolio");
        if (stored) {
          set(JSON.parse(stored));
        } else {
          set([]);
        }
      }
    },
    save: (holdings: PortfolioHolding[]) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("portfolio", JSON.stringify(holdings));
        set(holdings);
      }
    },
    add: (holding: PortfolioHolding) => {
      update((holdings) => {
        const updated = [...holdings, holding];
        if (typeof window !== "undefined") {
          localStorage.setItem("portfolio", JSON.stringify(updated));
        }
        return updated;
      });
    },
    remove: (id: string) => {
      update((holdings) => {
        const updated = holdings.filter((h) => h.id !== id);
        if (typeof window !== "undefined") {
          localStorage.setItem("portfolio", JSON.stringify(updated));
        }
        return updated;
      });
    },
    updatePrices: async (holdings: PortfolioHolding[]) => {
      if (holdings.length === 0) return holdings;

      const now = Date.now();
      const recentlyUpdated = holdings.some(
        (h) => h.lastUpdated && now - new Date(h.lastUpdated).getTime() < 5000
      );

      if (recentlyUpdated) {
        return holdings;
      }

      try {
        const symbols = holdings.map((h) => h.ticker.toUpperCase());

        const response = await fetch("/api/quotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symbols }),
        });

        if (!response.ok) {
          if (response.status === 404) {
            return holdings;
          }
          throw new Error(`Failed to fetch prices: ${response.status}`);
        }

        const responseData = (await response.json()) as {
          quotes: Array<{
            symbol: string;
            price: number;
            previousClose?: number;
            currentYield?: number;
            averageYield?: number;
          }>;
        };

        const { quotes } = responseData;

        if (!quotes || quotes.length === 0) {
          return holdings;
        }

        const priceMap = new Map(
          quotes.map((q) => [q.symbol.toUpperCase(), q])
        );

        const updated = holdings.map((holding) => {
          const tickerUpper = holding.ticker.toUpperCase();
          const quote = priceMap.get(tickerUpper);
          if (quote) {
            // Calculate yield on cost (average yield based on purchase price)
            // This is the dividend yield based on what the user paid, not current price
            let yieldOnCost = 0;
            if (
              quote.currentYield &&
              quote.currentYield > 0 &&
              holding.avgCost > 0 &&
              quote.price > 0
            ) {
              // Yield on cost = (Current dividend yield * Current price) / Average cost
              // This gives you the yield percentage based on your purchase price
              const annualDividendPerShare =
                (quote.currentYield / 100) * quote.price;
              yieldOnCost = (annualDividendPerShare / holding.avgCost) * 100;
            }

            return {
              ...holding,
              currentPrice: quote.price,
              previousClose: quote.previousClose,
              currentValue: quote.price * holding.shares,
              currentYield: quote.currentYield,
              averageYield: yieldOnCost, // Yield on cost based on purchase price
              lastUpdated: new Date().toISOString(),
            };
          }
          return holding;
        });

        if (typeof window !== "undefined") {
          localStorage.setItem("portfolio", JSON.stringify(updated));
        }
        set(updated);
        return updated;
      } catch (error) {
        return holdings;
      }
    },
  };
}

export const portfolio = createPortfolioStore();

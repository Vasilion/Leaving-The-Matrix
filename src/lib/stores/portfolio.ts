import { writable } from "svelte/store";

export interface PortfolioHolding {
  id: string;
  ticker: string;
  shares: number;
  avgCost: number;
  currentPrice?: number;
  currentValue?: number;
  change?: number;
  changePercent?: number;
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
        console.log("Fetching prices for symbols:", symbols);

        const response = await fetch("/api/quotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symbols }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("API error:", response.status, errorData);
          if (response.status === 404) {
            console.warn("API returned 404, but continuing with empty quotes");
            return holdings;
          }
          throw new Error(`Failed to fetch prices: ${response.status}`);
        }

        const responseData = (await response.json()) as {
          quotes: Array<{
            symbol: string;
            price: number;
            change: number;
            changePercent: number;
          }>;
        };

        const { quotes } = responseData;

        if (!quotes || quotes.length === 0) {
          console.warn("No quotes returned from API");
          return holdings;
        }

        console.log(
          "Received quotes:",
          quotes.map((q) => q.symbol)
        );

        const priceMap = new Map(
          quotes.map((q) => [q.symbol.toUpperCase(), q])
        );

        const updated = holdings.map((holding) => {
          const tickerUpper = holding.ticker.toUpperCase();
          const quote = priceMap.get(tickerUpper);
          if (quote) {
            return {
              ...holding,
              currentPrice: quote.price,
              currentValue: quote.price * holding.shares,
              change: quote.change,
              changePercent: quote.changePercent,
              lastUpdated: new Date().toISOString(),
            };
          } else {
            console.warn(`No quote found for ${holding.ticker}`);
          }
          return holding;
        });

        if (typeof window !== "undefined") {
          localStorage.setItem("portfolio", JSON.stringify(updated));
        }
        set(updated);
        return updated;
      } catch (error) {
        console.error("Error updating prices:", error);
        return holdings;
      }
    },
  };
}

export const portfolio = createPortfolioStore();

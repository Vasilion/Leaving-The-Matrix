<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Plus, TrendingUp, DollarSign, Percent, RefreshCw, Download } from 'lucide-svelte';
	import { portfolio, type PortfolioHolding } from '$lib/stores/portfolio';
	import PortfolioCard from '$lib/components/PortfolioCard.svelte';
	import AddHoldingModal from '$lib/components/AddHoldingModal.svelte';
	import { createPortfolioHoldings } from '$lib/utils/importPortfolio';
	
	let holdings = $state<PortfolioHolding[]>([]);
	let showAddModal = $state(false);
	let loading = $state(true);
	let refreshing = $state(false);
	let hasLoadedInitial = $state(false);
	let importing = $state(false);
	
	onMount(() => {
		portfolio.load();
		const unsubscribe = portfolio.subscribe((value) => {
			holdings = value;
			loading = false;
			
			if (!hasLoadedInitial && value.length > 0) {
				hasLoadedInitial = true;
				refreshPrices();
			}
		});
		return unsubscribe;
	});
	
	async function refreshPrices() {
		if (holdings.length === 0 || refreshing) return;
		refreshing = true;
		try {
			const currentHoldings = [...holdings];
			await portfolio.updatePrices(currentHoldings);
		} catch (error) {
			// Error handled silently
		} finally {
			refreshing = false;
		}
	}
	
	const totalInvested = $derived(
		holdings.reduce((sum, h) => sum + h.shares * h.avgCost, 0)
	);
	const totalValue = $derived(
		holdings.reduce((sum, h) => sum + (h.currentValue || h.shares * h.avgCost), 0)
	);
	const totalGainLoss = $derived(totalValue - totalInvested);
	const totalROI = $derived(
		totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0
	);
	
	async function handleAdd(holding: PortfolioHolding) {
		portfolio.add(holding);
		showAddModal = false;
		await new Promise((resolve) => setTimeout(resolve, 300));
		await refreshPrices();
	}
	
	function handleRemove(id: string) {
		portfolio.remove(id);
	}
	
	async function handleImport() {
		if (holdings.length > 0) {
			if (!confirm('This will add your portfolio holdings. Existing holdings will be preserved. Continue?')) {
				return;
			}
		}
		
		importing = true;
		try {
			const importedHoldings = createPortfolioHoldings();
			const existingTickers = new Set(holdings.map(h => h.ticker.toUpperCase()));
			
			const newHoldings = importedHoldings.filter(h => !existingTickers.has(h.ticker.toUpperCase()));
			
			if (newHoldings.length === 0) {
				alert('All holdings from your portfolio are already imported.');
				return;
			}
			
			for (const holding of newHoldings) {
				portfolio.add(holding);
			}
			
			await new Promise((resolve) => setTimeout(resolve, 500));
			
			if (newHoldings.length > 0) {
				await refreshPrices();
			}
		} catch (error) {
			alert('Error importing portfolio. Please try again.');
		} finally {
			importing = false;
		}
	}
</script>

<svelte:head>
	<title>Portfolio Tracker - Leaving The Matrix</title>
	<meta name="description" content="Track your VC investments and portfolio performance" />
</svelte:head>

<div class="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
	<div class="max-w-7xl mx-auto">
		<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
			<div>
				<h1 class="text-4xl sm:text-5xl font-bold mb-2">Portfolio Tracker</h1>
				<p class="text-gray-400">Monitor your investments with real-time market data</p>
			</div>
			<div class="flex gap-3 flex-wrap">
				<button
					onclick={handleImport}
					disabled={importing}
					class="btn-secondary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<Download class="w-5 h-5 {importing ? 'animate-spin' : ''}" />
					{importing ? 'Importing...' : 'Import Portfolio'}
				</button>
				<button
					onclick={refreshPrices}
					disabled={refreshing || holdings.length === 0}
					class="btn-secondary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<RefreshCw class="w-5 h-5 {refreshing ? 'animate-spin' : ''}" />
					Refresh
				</button>
				{#if holdings.length > 0}
					<a
						href="/portfolio/simulate"
						class="btn-secondary inline-flex items-center gap-2"
					>
						<TrendingUp class="w-5 h-5" />
						Simulate Returns
					</a>
				{/if}
				<button
					onclick={() => showAddModal = true}
					class="btn-primary inline-flex items-center gap-2"
				>
					<Plus class="w-5 h-5" />
					Add Holding
				</button>
			</div>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
			<div class="glass rounded-2xl p-6 card-float">
				<div class="flex items-center gap-3 mb-4">
					<div class="p-2 rounded-lg bg-purple-accent/20 text-purple-accent">
						<DollarSign class="w-5 h-5" />
					</div>
					<span class="text-sm text-gray-400">Total Invested</span>
				</div>
				<p class="text-3xl font-bold">
					${(totalInvested).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
				</p>
			</div>
			
			<div class="glass rounded-2xl p-6 card-float">
				<div class="flex items-center gap-3 mb-4">
					<div class="p-2 rounded-lg bg-cyan-accent/20 text-cyan-accent">
						<TrendingUp class="w-5 h-5" />
					</div>
					<span class="text-sm text-gray-400">Current Value</span>
				</div>
				<p class="text-3xl font-bold">
					${(totalValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
				</p>
			</div>
			
			<div class="glass rounded-2xl p-6 card-float">
				<div class="flex items-center gap-3 mb-4">
					<div class="p-2 rounded-lg bg-purple-accent/20 text-purple-accent">
						<Percent class="w-5 h-5" />
					</div>
					<span class="text-sm text-gray-400">Total Return</span>
				</div>
				<p class="text-3xl font-bold {totalROI >= 0 ? 'text-cyan-accent' : 'text-red-400'}">
					{totalROI >= 0 ? '+' : ''}{totalROI.toFixed(2)}%
				</p>
				<p class="text-sm text-gray-400 mt-1">
					{totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
				</p>
			</div>
		</div>
		
		<div>
			<h2 class="text-2xl font-bold mb-6">Your Holdings</h2>
			
			{#if loading}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each Array(6) as _}
						<div class="glass rounded-2xl p-6 animate-pulse">
							<div class="h-12 bg-white/10 rounded-lg mb-4"></div>
							<div class="h-6 bg-white/10 rounded-lg mb-2"></div>
							<div class="h-4 bg-white/10 rounded-lg w-2/3"></div>
						</div>
					{/each}
				</div>
			{:else if holdings.length === 0}
				<div class="glass rounded-2xl p-12 text-center">
					<p class="text-gray-400 mb-4">No holdings yet. Add your first investment to get started.</p>
					<button onclick={() => showAddModal = true} class="btn-primary">
						Add Holding
					</button>
				</div>
			{:else}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each holdings as holding}
						<PortfolioCard {holding} onRemove={handleRemove} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

{#if showAddModal}
	<AddHoldingModal onClose={() => showAddModal = false} onAdd={handleAdd} />
{/if}

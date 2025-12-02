<script lang="ts">
	import { onMount } from 'svelte';
	import { TrendingUp, Calendar, DollarSign, Percent, ArrowLeft } from 'lucide-svelte';
	import { portfolio, type PortfolioHolding } from '$lib/stores/portfolio';
	import { goto } from '$app/navigation';
	
	let holdings = $state<PortfolioHolding[]>([]);
	let loading = $state(true);
	let selectedPeriod = $state<'12' | '60'>('12');
	let expectedReturn = $state(10);
	let manualYield = $state<number | null>(null);
	let manualYieldInput = $state<string>('');
	let dripEnabled = $state(true);
	let simulationResults = $state<any>(null);
	let yieldDebounceTimeout: ReturnType<typeof setTimeout> | null = null;
	
	onMount(() => {
		portfolio.load();
		const unsubscribe = portfolio.subscribe((value) => {
			holdings = value;
			loading = false;
		});
		return unsubscribe;
	});
	
	const totalInvested = $derived(
		holdings.reduce((sum, h) => sum + h.shares * h.avgCost, 0)
	);
	const currentValue = $derived(
		holdings.reduce((sum, h) => sum + (h.currentValue || h.shares * h.avgCost), 0)
	);
	
	// Calculate weighted average yield for the portfolio
	const portfolioYield = $derived.by(() => {
		// If manual yield is set, use that
		if (manualYield !== null && manualYield > 0) {
			return manualYield;
		}
		
		// Otherwise calculate from holdings
		let totalValueWithYield = 0;
		let totalValue = 0;
		
		holdings.forEach((h) => {
			const holdingValue = h.currentValue || h.shares * h.avgCost;
			const yieldPercent = (h.currentYield || 0) / 100; // Convert percentage to decimal
			totalValueWithYield += holdingValue * yieldPercent;
			totalValue += holdingValue;
		});
		
		return totalValue > 0 ? (totalValueWithYield / totalValue) * 100 : 0;
	});
	
	function handleManualYieldInput(value: string) {
		manualYieldInput = value;
		
		// Clear existing timeout
		if (yieldDebounceTimeout) {
			clearTimeout(yieldDebounceTimeout);
		}
		
		// Debounce the update
		yieldDebounceTimeout = setTimeout(() => {
			const numValue = parseFloat(value);
			if (!isNaN(numValue) && numValue >= 0) {
				manualYield = numValue;
			} else if (value === '' || value === null) {
				manualYield = null;
			}
		}, 500); // 500ms debounce
	}
	
	function calculateSimulation() {
		if (holdings.length === 0) return;
		
		const annualReturn = expectedReturn / 100;
		const annualYield = portfolioYield / 100; // Portfolio yield as decimal
		const months = selectedPeriod === '12' ? 12 : 60;
		const monthlyReturn = Math.pow(1 + annualReturn, 1/12) - 1;
		const monthlyYield = annualYield / 12; // Monthly dividend yield
		
		let runningValue = currentValue;
		let totalDividends = 0;
		const monthlyBreakdown = [];
		
		for (let i = 1; i <= months; i++) {
			// Calculate capital appreciation
			const capitalAppreciation = runningValue * monthlyReturn;
			
			// Calculate dividends for this month
			const monthlyDividend = runningValue * monthlyYield;
			totalDividends += monthlyDividend;
			
			if (dripEnabled) {
				// DRIP ON: Reinvest dividends back into portfolio
				runningValue = runningValue + capitalAppreciation + monthlyDividend;
			} else {
				// DRIP OFF: Keep dividends separate, only compound capital appreciation
				runningValue = runningValue + capitalAppreciation;
			}
			
			const totalGain = runningValue - currentValue;
			const totalGainPercent = (totalGain / currentValue) * 100;
			
			monthlyBreakdown.push({
				month: i,
				value: runningValue,
				capitalGain: capitalAppreciation,
				dividends: monthlyDividend,
				totalGain: totalGain,
				gainPercent: totalGainPercent,
				cumulativeDividends: totalDividends
			});
		}
		
		const projectedValue = runningValue;
		const projectedGain = projectedValue - currentValue;
		const projectedGainPercent = (projectedGain / currentValue) * 100;
		
		const totalReturn = projectedValue - totalInvested;
		const totalReturnPercent = (totalReturn / totalInvested) * 100;
		
		simulationResults = {
			projectedValue,
			projectedGain,
			projectedGainPercent,
			totalReturn,
			totalReturnPercent,
			totalDividends,
			portfolioYield: portfolioYield,
			monthlyBreakdown,
			period: selectedPeriod,
			dripEnabled
		};
	}
	
	$effect(() => {
		if (holdings.length > 0 && currentValue > 0) {
			calculateSimulation();
		}
	});
	
	// Recalculate when DRIP toggle, period, expected return, or manual yield changes
	$effect(() => {
		dripEnabled; // Track this variable
		selectedPeriod; // Track this variable
		expectedReturn; // Track this variable
		manualYield; // Track this variable
		if (holdings.length > 0 && currentValue > 0) {
			calculateSimulation();
		}
	});
</script>

<svelte:head>
	<title>Portfolio Simulation - Leaving The Matrix</title>
	<meta name="description" content="Simulate portfolio returns over 12 and 60 month periods" />
</svelte:head>

<div class="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
	<div class="max-w-7xl mx-auto">
		<button
			onclick={() => goto('/portfolio')}
			class="flex items-center gap-2 text-gray-400 hover:text-cyan-accent mb-6 transition-colors"
		>
			<ArrowLeft class="w-4 h-4" />
			Back to Portfolio
		</button>
		
		<div class="mb-8">
			<h1 class="text-4xl sm:text-5xl font-bold mb-2">Portfolio Simulation</h1>
			<p class="text-gray-400">Project your portfolio returns based on expected annual returns</p>
		</div>
		
		{#if loading}
			<div class="glass rounded-2xl p-12 text-center">
				<p class="text-gray-400">Loading portfolio...</p>
			</div>
		{:else if holdings.length === 0}
			<div class="glass rounded-2xl p-12 text-center">
				<p class="text-gray-400 mb-4">No holdings to simulate. Add holdings to your portfolio first.</p>
				<button onclick={() => goto('/portfolio')} class="btn-primary">
					Go to Portfolio
				</button>
			</div>
		{:else}
			<div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
				<div class="glass rounded-2xl p-6 card-float">
					<div class="flex items-center gap-3 mb-4">
						<div class="p-2 rounded-lg bg-purple-accent/20 text-purple-accent">
							<DollarSign class="w-5 h-5" />
						</div>
						<span class="text-sm text-gray-400">Current Value</span>
					</div>
					<p class="text-3xl font-bold">
						${(currentValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
					</p>
				</div>
				
				<div class="glass rounded-2xl p-6 card-float">
					<div class="flex items-center gap-3 mb-4">
						<div class="p-2 rounded-lg bg-cyan-accent/20 text-cyan-accent">
							<Calendar class="w-5 h-5" />
						</div>
						<span class="text-sm text-gray-400">Time Period</span>
					</div>
					<div class="flex gap-2">
						<button
							onclick={() => selectedPeriod = '12'}
							class="flex-1 px-4 py-2 rounded-lg font-semibold transition-all {selectedPeriod === '12'
								? 'bg-gradient-to-r from-purple-accent to-cyan-accent text-white'
								: 'glass text-gray-400 hover:text-white'}"
						>
							12 Months
						</button>
						<button
							onclick={() => selectedPeriod = '60'}
							class="flex-1 px-4 py-2 rounded-lg font-semibold transition-all {selectedPeriod === '60'
								? 'bg-gradient-to-r from-purple-accent to-cyan-accent text-white'
								: 'glass text-gray-400 hover:text-white'}"
						>
							60 Months
						</button>
					</div>
				</div>
				
				<div class="glass rounded-2xl p-6 card-float">
					<div class="flex items-center gap-3 mb-4">
						<div class="p-2 rounded-lg bg-purple-accent/20 text-purple-accent">
							<Percent class="w-5 h-5" />
						</div>
						<span class="text-sm text-gray-400">Expected Annual Return</span>
					</div>
					<div class="flex items-center gap-3">
						<input
							type="number"
							step="0.1"
							bind:value={expectedReturn}
							class="w-24 px-3 py-2 rounded-lg glass border border-white/20 focus:border-purple-accent focus:outline-none"
						/>
						<span class="text-2xl font-bold">%</span>
					</div>
					<p class="text-xs text-gray-400 mt-2">Based on historical market averages</p>
				</div>
				
				<div class="glass rounded-2xl p-6 card-float">
					<div class="flex items-center justify-between mb-4">
						<div class="flex items-center gap-3">
							<div class="p-2 rounded-lg bg-cyan-accent/20 text-cyan-accent">
								<TrendingUp class="w-5 h-5" />
							</div>
							<span class="text-sm text-gray-400">DRIP</span>
						</div>
						<label class="relative inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								bind:checked={dripEnabled}
								class="sr-only peer"
							/>
							<div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-accent peer-checked:to-cyan-accent"></div>
						</label>
					</div>
					<p class="text-xs text-gray-400">
						{dripEnabled ? 'Dividends reinvested' : 'Dividends as cash'}
					</p>
					<p class="text-xs {portfolioYield > 0 ? 'text-cyan-accent' : 'text-yellow-400'} mt-2">
						Portfolio Yield: {portfolioYield > 0 ? portfolioYield.toFixed(2) + '%' : 'No yield data'}
					</p>
					{#if portfolioYield === 0 || manualYield !== null}
						<div class="mt-2">
							<label class="block text-xs text-gray-400 mb-1">Manual Yield (%)</label>
							<input
								type="text"
								inputmode="decimal"
								value={manualYieldInput}
								oninput={(e) => handleManualYieldInput(e.currentTarget.value)}
								placeholder="e.g., 2.5"
								class="w-full px-2 py-1 rounded-lg glass border border-white/20 focus:border-purple-accent focus:outline-none text-sm"
							/>
							{#if manualYield !== null && manualYield > 0}
								<button
									onclick={() => { manualYield = null; manualYieldInput = ''; }}
									class="text-xs text-gray-400 hover:text-red-400 mt-1"
								>
									Clear manual yield
								</button>
							{/if}
						</div>
					{/if}
				</div>
			</div>
			
			{#if simulationResults}
				<div class="glass rounded-2xl p-6 sm:p-8 mb-8">
					<h2 class="text-2xl font-bold mb-6">Projected Results</h2>
					
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
						<div>
							<p class="text-sm text-gray-400 mb-2">Projected Value</p>
							<p class="text-3xl font-bold text-cyan-accent">
								${(simulationResults.projectedValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
							</p>
						</div>
						<div>
							<p class="text-sm text-gray-400 mb-2">Projected Gain</p>
							<p class="text-3xl font-bold text-cyan-accent">
								+${(simulationResults.projectedGain).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
							</p>
							<p class="text-sm text-gray-400 mt-1">
								+{simulationResults.projectedGainPercent.toFixed(2)}%
							</p>
						</div>
						<div>
							<p class="text-sm text-gray-400 mb-2">Total Dividends</p>
							<p class="text-3xl font-bold text-purple-accent">
								${(simulationResults.totalDividends).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
							</p>
							<p class="text-sm text-gray-400 mt-1">
								{dripEnabled ? 'Reinvested' : 'As cash'}
							</p>
							{#if simulationResults.totalDividends === 0 && simulationResults.portfolioYield === 0}
								<p class="text-xs text-yellow-400 mt-1">
									No yield data - refresh portfolio prices
								</p>
							{/if}
						</div>
						<div>
							<p class="text-sm text-gray-400 mb-2">Total Return</p>
							<p class="text-3xl font-bold {simulationResults.totalReturn >= 0 ? 'text-cyan-accent' : 'text-red-400'}">
								{simulationResults.totalReturn >= 0 ? '+' : ''}${(simulationResults.totalReturn).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
							</p>
							<p class="text-sm text-gray-400 mt-1">
								{simulationResults.totalReturnPercent >= 0 ? '+' : ''}{simulationResults.totalReturnPercent.toFixed(2)}%
							</p>
						</div>
						<div>
							<p class="text-sm text-gray-400 mb-2">Annualized Return</p>
							<p class="text-3xl font-bold text-purple-accent">
								{expectedReturn.toFixed(1)}%
							</p>
							<p class="text-sm text-gray-400 mt-1">Per year</p>
						</div>
					</div>
					
					<div class="mt-8">
						<h3 class="text-xl font-bold mb-4">Monthly Projection</h3>
						<div class="overflow-x-auto">
							<table class="w-full">
								<thead>
									<tr class="border-b border-white/10">
										<th class="text-left py-3 px-4 text-sm text-gray-400">Month</th>
										<th class="text-right py-3 px-4 text-sm text-gray-400">Portfolio Value</th>
										<th class="text-right py-3 px-4 text-sm text-gray-400">Capital Gain</th>
										<th class="text-right py-3 px-4 text-sm text-gray-400">Dividends</th>
										<th class="text-right py-3 px-4 text-sm text-gray-400">Total Gain</th>
										<th class="text-right py-3 px-4 text-sm text-gray-400">Gain %</th>
									</tr>
								</thead>
								<tbody>
									{#each simulationResults.monthlyBreakdown as month}
										<tr class="border-b border-white/5 hover:bg-white/5">
											<td class="py-3 px-4 font-semibold">{month.month}</td>
											<td class="py-3 px-4 text-right">
												${(month.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
											</td>
											<td class="py-3 px-4 text-right text-cyan-accent">
												+${(month.capitalGain).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
											</td>
											<td class="py-3 px-4 text-right text-purple-accent">
												+${(month.dividends).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
											</td>
											<td class="py-3 px-4 text-right text-cyan-accent">
												+${(month.totalGain).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
											</td>
											<td class="py-3 px-4 text-right text-cyan-accent">
												+{month.gainPercent.toFixed(2)}%
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			{/if}
		{/if}
	</div>
</div>


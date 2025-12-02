<script lang="ts">
	import { Trash2, TrendingUp, TrendingDown, RefreshCw } from 'lucide-svelte';
	import type { PortfolioHolding } from '$lib/stores/portfolio';
	
	interface Props {
		holding: PortfolioHolding;
		onRemove: (id: string) => void;
	}
	
	let { holding, onRemove }: Props = $props();
	
	const formatCurrency = (value: number) => {
		if (value == null || isNaN(value)) return '$0.00';
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(value);
	};
	
	const investedValue = $derived((holding.shares || 0) * (holding.avgCost || 0));
	const currentValue = $derived(holding.currentValue || investedValue);
	const gainLoss = $derived(currentValue - investedValue);
	const gainLossPercent = $derived(investedValue > 0 ? (gainLoss / investedValue) * 100 : 0);
</script>

<div class="glass rounded-2xl p-6 card-float glass-hover relative group">
	<button
		onclick={() => onRemove(holding.id)}
		class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
	>
		<Trash2 class="w-4 h-4" />
	</button>
	
	<div class="flex items-center gap-4 mb-4">
		<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-accent to-cyan-accent flex items-center justify-center text-white font-bold text-lg">
			{holding.ticker.charAt(0)}
		</div>
		<div class="flex-1">
			<h3 class="font-bold text-lg">{holding.ticker}</h3>
			<p class="text-sm text-gray-400">{(holding.shares || 0).toFixed(2)} shares</p>
		</div>
	</div>
	
	<div class="mb-4">
		<div class="flex items-center justify-between mb-2">
			<span class="text-sm text-gray-400">Current Price</span>
			<span class="text-xl font-bold">
				{holding.currentPrice ? formatCurrency(holding.currentPrice) : 'Loading...'}
			</span>
		</div>
	</div>
	
	<div class="mb-4">
		<div class="flex items-center justify-between mb-2">
			<span class="text-sm text-gray-400">Gain/Loss</span>
			<span class="text-2xl font-bold {gainLoss >= 0 ? 'text-cyan-accent' : 'text-red-400'} flex items-center gap-1">
				{#if gainLoss >= 0}
					<TrendingUp class="w-5 h-5" />
				{:else}
					<TrendingDown class="w-5 h-5" />
				{/if}
				{gainLossPercent >= 0 ? '+' : ''}{(gainLossPercent || 0).toFixed(2)}%
			</span>
		</div>
		<div class="h-2 bg-white/10 rounded-full overflow-hidden">
			<div
				class="h-full rounded-full transition-all duration-500 {gainLoss >= 0
					? 'bg-gradient-to-r from-purple-accent to-cyan-accent'
					: 'bg-red-500'}"
				style="width: {Math.min(Math.abs(gainLossPercent || 0), 100)}%"
			></div>
		</div>
	</div>
	
	<div class="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
		<div>
			<p class="text-xs text-gray-400 mb-1">Invested</p>
			<p class="font-semibold">{formatCurrency(investedValue)}</p>
		</div>
		<div>
			<p class="text-xs text-gray-400 mb-1">Current Value</p>
			<p class="font-semibold">{formatCurrency(currentValue)}</p>
		</div>
	</div>
	
	{#if (holding.currentYield != null && holding.currentYield > 0) || (holding.averageYield != null && holding.averageYield !== 0)}
		<div class="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 mt-4">
			{#if holding.currentYield != null && holding.currentYield > 0}
				<div>
					<p class="text-xs text-gray-400 mb-1">Current Yield</p>
					<p class="font-semibold text-cyan-accent">{holding.currentYield.toFixed(2)}%</p>
				</div>
			{/if}
			{#if holding.averageYield != null && holding.averageYield > 0}
				<div>
					<p class="text-xs text-gray-400 mb-1">Yield on Cost</p>
					<p class="font-semibold text-purple-accent">{holding.averageYield.toFixed(2)}%</p>
				</div>
			{/if}
		</div>
	{/if}
	
	{#if holding.lastUpdated}
		<p class="text-xs text-gray-500 mt-2">Updated: {new Date(holding.lastUpdated).toLocaleTimeString()}</p>
	{/if}
</div>

<script lang="ts">
	import { X, Loader2 } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';
	import type { PortfolioHolding } from '$lib/stores/portfolio';
	
	interface Props {
		onClose: () => void;
		onAdd: (holding: PortfolioHolding) => void;
	}
	
	let { onClose, onAdd }: Props = $props();
	
	let formData = $state({
		ticker: '',
		shares: 0,
		avgCost: 0
	});
	
	let loading = $state(false);
	let error = $state('');
	let quoteData = $state<any>(null);
	
	async function fetchQuote() {
		if (!formData.ticker.trim()) {
			error = '';
			quoteData = null;
			return;
		}
		
		loading = true;
		error = '';
		
		try {
			const response = await fetch(`/api/quote?symbol=${encodeURIComponent(formData.ticker.toUpperCase())}`);
			if (!response.ok) {
				throw new Error('Symbol not found');
			}
			quoteData = await response.json();
			error = '';
		} catch (err) {
			error = 'Symbol not found. Please check the ticker symbol.';
			quoteData = null;
		} finally {
			loading = false;
		}
	}
	
	function handleSubmit() {
		if (!formData.ticker || formData.shares <= 0 || formData.avgCost <= 0) {
			error = 'Please fill in all fields';
			return;
		}
		
		const holding: PortfolioHolding = {
			id: Date.now().toString(),
			ticker: formData.ticker.toUpperCase(),
			shares: formData.shares,
			avgCost: formData.avgCost
		};
		
		onAdd(holding);
	}
	
	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}
	
	$effect(() => {
		if (formData.ticker) {
			const timeout = setTimeout(() => {
				fetchQuote();
			}, 500);
			return () => clearTimeout(timeout);
		}
	});
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
	onclick={handleBackdropClick}
	onkeydown={(e) => e.key === 'Escape' && onClose()}
	role="dialog"
	aria-modal="true"
	aria-labelledby="modal-title"
	transition:fade={{ duration: 200 }}
>
	<div
		class="glass rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
		transition:slide={{ axis: 'y', duration: 300 }}
	>
		<div class="flex items-center justify-between mb-6">
			<h2 id="modal-title" class="text-2xl font-bold">Add New Holding</h2>
			<button
				onclick={onClose}
				class="p-2 rounded-lg hover:bg-white/10 transition-colors"
			>
				<X class="w-5 h-5" />
			</button>
		</div>
		
		<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
			<div>
				<label for="ticker-input" class="block text-sm font-medium mb-2">Ticker Symbol</label>
				<div class="relative">
					<input
						id="ticker-input"
						type="text"
						bind:value={formData.ticker}
						placeholder="e.g., AAPL, MSFT, TSLA"
						required
						class="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-purple-accent focus:outline-none uppercase"
					/>
					{#if loading}
						<Loader2 class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-gray-400" />
					{/if}
				</div>
				{#if error}
					<p class="text-sm text-red-400 mt-1">{error}</p>
				{/if}
				{#if quoteData}
					<div class="mt-2 p-3 rounded-lg bg-cyan-accent/10 border border-cyan-accent/30">
						<p class="text-sm font-semibold text-cyan-accent">{quoteData.name}</p>
						<p class="text-xs text-gray-400">{quoteData.exchange}</p>
					</div>
				{/if}
			</div>
			
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label for="shares-input" class="block text-sm font-medium mb-2">Shares</label>
					<input
						id="shares-input"
						type="number"
						step="0.01"
						min="0"
						bind:value={formData.shares}
						required
						class="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-purple-accent focus:outline-none"
					/>
				</div>
				<div>
					<label for="avgcost-input" class="block text-sm font-medium mb-2">Average Cost ($)</label>
					<input
						id="avgcost-input"
						type="number"
						step="0.01"
						min="0"
						bind:value={formData.avgCost}
						required
						class="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-purple-accent focus:outline-none"
					/>
					{#if formData.shares > 0 && formData.avgCost > 0}
						<p class="text-xs text-gray-400 mt-1">
							Total: ${(formData.shares * formData.avgCost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
						</p>
					{/if}
				</div>
			</div>
			
			<div class="flex gap-4 pt-4">
				<button type="submit" class="btn-primary flex-1">Add Holding</button>
				<button type="button" onclick={onClose} class="btn-secondary flex-1">Cancel</button>
			</div>
		</form>
	</div>
</div>

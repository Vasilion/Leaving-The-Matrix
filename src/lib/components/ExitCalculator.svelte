<script lang="ts">
	import { Target } from 'lucide-svelte';
	
	let investedAmount = $state(2000000);
	let ownershipPercent = $state(10);
	let exitValuation = $state(50000000);
	
	let exitValue = $derived((exitValuation * ownershipPercent) / 100);
	let roi = $derived(investedAmount > 0 ? ((exitValue - investedAmount) / investedAmount) * 100 : 0);
	let moic = $derived(investedAmount > 0 ? exitValue / investedAmount : 0);
</script>

<div>
	<div class="flex items-center gap-3 mb-6">
		<Target class="w-6 h-6 text-purple-accent" />
		<h2 class="text-2xl font-bold">Exit Scenario Modeler</h2>
	</div>
	
	<div class="space-y-6">
		<div>
			<label class="block text-sm font-medium mb-2">Invested Amount ($)</label>
			<input
				type="number"
				bind:value={investedAmount}
				class="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-purple-accent focus:outline-none"
			/>
		</div>
		
		<div>
			<label class="block text-sm font-medium mb-2">Ownership %</label>
			<input
				type="number"
				step="0.1"
				min="0"
				max="100"
				bind:value={ownershipPercent}
				class="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-purple-accent focus:outline-none"
			/>
		</div>
		
		<div>
			<label class="block text-sm font-medium mb-2">Exit Valuation ($)</label>
			<input
				type="number"
				bind:value={exitValuation}
				class="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-purple-accent focus:outline-none"
			/>
		</div>
		
		<div class="space-y-4">
			<div class="glass rounded-xl p-6 bg-gradient-to-r from-purple-accent/20 to-cyan-accent/20 border border-purple-accent/30">
				<p class="text-sm text-gray-400 mb-1">Exit Value</p>
				<p class="text-4xl font-bold text-cyan-accent">${(exitValue / 1000000).toFixed(2)}M</p>
			</div>
			
			<div class="grid grid-cols-2 gap-4">
				<div class="glass rounded-xl p-4">
					<p class="text-xs text-gray-400 mb-1">ROI</p>
					<p class="text-2xl font-bold text-cyan-accent">{roi.toFixed(1)}%</p>
				</div>
				<div class="glass rounded-xl p-4">
					<p class="text-xs text-gray-400 mb-1">MOIC</p>
					<p class="text-2xl font-bold text-cyan-accent">{moic.toFixed(2)}x</p>
				</div>
			</div>
		</div>
	</div>
</div>


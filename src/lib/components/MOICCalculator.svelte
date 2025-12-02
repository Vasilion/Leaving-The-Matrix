<script lang="ts">
	import { DollarSign } from 'lucide-svelte';
	
	let totalInvested = $state(5000000);
	let currentValue = $state(12500000);
	
	let moic = $derived(totalInvested > 0 ? currentValue / totalInvested : 0);
	let totalReturn = $derived(currentValue - totalInvested);
	let returnPercent = $derived(totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0);
</script>

<div>
	<div class="flex items-center gap-3 mb-6">
		<DollarSign class="w-6 h-6 text-purple-accent" />
		<h2 class="text-2xl font-bold">MOIC Calculator</h2>
	</div>
	
	<div class="space-y-6">
		<div>
			<label class="block text-sm font-medium mb-2">Total Invested ($)</label>
			<input
				type="number"
				bind:value={totalInvested}
				class="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-purple-accent focus:outline-none"
			/>
		</div>
		
		<div>
			<label class="block text-sm font-medium mb-2">Current/Exit Value ($)</label>
			<input
				type="number"
				bind:value={currentValue}
				class="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-purple-accent focus:outline-none"
			/>
		</div>
		
		<div class="space-y-4">
			<div class="glass rounded-xl p-6 bg-gradient-to-r from-purple-accent/20 to-cyan-accent/20 border border-purple-accent/30">
				<p class="text-sm text-gray-400 mb-1">Multiple on Invested Capital</p>
				<p class="text-4xl font-bold text-cyan-accent">{moic.toFixed(2)}x</p>
			</div>
			
			<div class="grid grid-cols-2 gap-4">
				<div class="glass rounded-xl p-4">
					<p class="text-xs text-gray-400 mb-1">Total Return</p>
					<p class="text-2xl font-bold {totalReturn >= 0 ? 'text-cyan-accent' : 'text-red-400'}">
						${(totalReturn / 1000000).toFixed(2)}M
					</p>
				</div>
				<div class="glass rounded-xl p-4">
					<p class="text-xs text-gray-400 mb-1">Return %</p>
					<p class="text-2xl font-bold {returnPercent >= 0 ? 'text-cyan-accent' : 'text-red-400'}">
						{returnPercent.toFixed(1)}%
					</p>
				</div>
			</div>
		</div>
	</div>
</div>


<script lang="ts">
	import { TrendingUp } from 'lucide-svelte';
	
	let initialInvestment = $state(1000000);
	let cashFlows = $state([50000, 75000, 100000, 2500000]);
	let years = $state([1, 2, 3, 4]);
	
	let irr = $derived(calculateIRR());
	
	function calculateIRR(): number {
		if (initialInvestment <= 0) return 0;
		
		const tolerance = 0.0001;
		let rate = 0.1;
		let maxIterations = 100;
		let iteration = 0;
		
		while (iteration < maxIterations) {
			let npv = -initialInvestment;
			for (let i = 0; i < cashFlows.length; i++) {
				npv += cashFlows[i] / Math.pow(1 + rate, years[i]);
			}
			
			if (Math.abs(npv) < tolerance) {
				return rate * 100;
			}
			
			let npvDerivative = 0;
			for (let i = 0; i < cashFlows.length; i++) {
				npvDerivative -= (cashFlows[i] * years[i]) / Math.pow(1 + rate, years[i] + 1);
			}
			
			if (Math.abs(npvDerivative) < tolerance) break;
			
			rate = rate - npv / npvDerivative;
			iteration++;
		}
		
		return rate * 100;
	}
	
	function addCashFlow() {
		cashFlows = [...cashFlows, 0];
		years = [...years, years.length + 1];
	}
	
	function removeCashFlow(index: number) {
		cashFlows = cashFlows.filter((_, i) => i !== index);
		years = years.filter((_, i) => i !== index).map((y, i) => i + 1);
	}
</script>

<div>
	<div class="flex items-center gap-3 mb-6">
		<TrendingUp class="w-6 h-6 text-purple-accent" />
		<h2 class="text-2xl font-bold">IRR Calculator</h2>
	</div>
	
	<div class="space-y-6">
		<div>
			<label class="block text-sm font-medium mb-2">Initial Investment ($)</label>
			<input
				type="number"
				bind:value={initialInvestment}
				class="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-purple-accent focus:outline-none"
			/>
		</div>
		
		<div>
			<div class="flex items-center justify-between mb-4">
				<label class="block text-sm font-medium">Cash Flows</label>
				<button onclick={addCashFlow} class="text-sm text-cyan-accent hover:underline">
					+ Add Flow
				</button>
			</div>
			<div class="space-y-3">
				{#each cashFlows as flow, index}
					<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
						<div>
							<label class="block text-xs text-gray-400 mb-1">Year {years[index]}</label>
							<input
								type="number"
								bind:value={cashFlows[index]}
								class="w-full px-4 py-2 rounded-lg glass border border-white/20 focus:border-purple-accent focus:outline-none"
							/>
						</div>
						<div class="flex items-end">
							<button
								onclick={() => removeCashFlow(index)}
								class="px-4 py-2 rounded-lg glass border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
							>
								Remove
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
		
		<div class="glass rounded-xl p-6 bg-gradient-to-r from-purple-accent/20 to-cyan-accent/20 border border-purple-accent/30">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm text-gray-400 mb-1">Internal Rate of Return</p>
					<p class="text-4xl font-bold text-cyan-accent">{irr.toFixed(2)}%</p>
				</div>
			</div>
		</div>
	</div>
</div>


<script lang="ts">
	import { Calculator, TrendingUp, DollarSign, Target } from 'lucide-svelte';
	import IRRCalculator from '$lib/components/IRRCalculator.svelte';
	import MOICCalculator from '$lib/components/MOICCalculator.svelte';
	import ExitCalculator from '$lib/components/ExitCalculator.svelte';
	
	let activeTab = $state<'irr' | 'moic' | 'exit'>('irr');
</script>

<svelte:head>
	<title>Portfolio Calculators - Leaving The Matrix</title>
	<meta name="description" content="Calculate IRR, MOIC, and exit scenarios for your VC investments" />
</svelte:head>

<div class="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
	<div class="max-w-5xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl sm:text-5xl font-bold mb-4">Portfolio Calculators</h1>
			<p class="text-xl text-gray-400">Calculate returns, IRR, MOIC, and model exit scenarios</p>
		</div>
		
		<div class="glass rounded-2xl p-2 mb-8 flex gap-2">
			<button
				onclick={() => activeTab = 'irr'}
				class="flex-1 px-4 py-3 rounded-xl font-semibold transition-all {activeTab === 'irr'
					? 'bg-gradient-to-r from-purple-accent to-cyan-accent text-white'
					: 'text-gray-400 hover:text-white'}"
			>
				IRR Calculator
			</button>
			<button
				onclick={() => activeTab = 'moic'}
				class="flex-1 px-4 py-3 rounded-xl font-semibold transition-all {activeTab === 'moic'
					? 'bg-gradient-to-r from-purple-accent to-cyan-accent text-white'
					: 'text-gray-400 hover:text-white'}"
			>
				MOIC Calculator
			</button>
			<button
				onclick={() => activeTab = 'exit'}
				class="flex-1 px-4 py-3 rounded-xl font-semibold transition-all {activeTab === 'exit'
					? 'bg-gradient-to-r from-purple-accent to-cyan-accent text-white'
					: 'text-gray-400 hover:text-white'}"
			>
				Exit Modeler
			</button>
		</div>
		
		<div class="glass rounded-2xl p-6 sm:p-8">
			{#if activeTab === 'irr'}
				<IRRCalculator />
			{:else if activeTab === 'moic'}
				<MOICCalculator />
			{:else}
				<ExitCalculator />
			{/if}
		</div>
	</div>
</div>


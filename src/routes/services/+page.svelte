<script lang="ts">
	const subscriptionUrl = 'https://mee6.xyz/en/m/1384673721599397948';
	
	const pricingTiers = [
		{
			name: 'STOCK PICKS STANDARD',
			price: '$29.99',
			period: '/month',
			description: 'My standard service is designed to provide comprehensive insights and actionable guidance for traders and investors focusing on swing trades and long-term investment opportunities in the stock market. I deliver meticulously researched signals and execution strategies for stocks identified as prime candidates based on rigorous analysis and market trends.',
			features: [
				'ETF Portfolio',
				'Long Term Picks',
				'Swing Trades',
				'Day Trades',
				'Education',
				'Chat',
				'Live Streams'
			]
		},
		{
			name: 'STOCK PICKS PRO',
			price: '$69.99',
			period: '/month',
			description: 'My standard service is designed to provide comprehensive insights and actionable guidance for traders and investors focusing on swing trades and long-term investment opportunities in the stock market. I deliver meticulously researched signals and execution strategies for stocks identified as prime candidates based on rigorous analysis and market trends.',
			premiumDescription: 'With this premium service, you\'ll receive direct communication and advice from me, the founder of Unycross LLC. I\'ll be available to answer your questions, provide guidance, and help you make informed decisions.',
			features: [
				'ETF Portfolio',
				'Long Term Picks',
				'Swing Trades',
				'Day Trades',
				'Education',
				'Chat',
				'Live Streams',
				'1 on 1 Help',
				'Portfolio Assessment',
				'Options'
			],
			popular: true
		}
	];
	
	function handleSubscribe() {
		window.open(subscriptionUrl, '_blank');
	}
</script>

<svelte:head>
	<title>Services - Leaving The Matrix</title>
	<meta name="description" content="Stock picks and trading education services - Standard and Pro tiers available" />
</svelte:head>

<div class="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-16">
			<h1 class="text-4xl sm:text-5xl font-bold mb-4">Stock Picks Services</h1>
			<p class="text-xl text-gray-400 max-w-2xl mx-auto">
				Comprehensive trading insights and actionable guidance for traders and investors
			</p>
		</div>
		
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
			{#each pricingTiers as tier}
				<div
					class="glass rounded-2xl p-8 card-float glass-hover relative {tier.popular
						? 'border-2 border-purple-accent'
						: ''}"
				>
					{#if tier.popular}
						<div
							class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-accent to-cyan-accent text-white text-xs font-bold px-4 py-1 rounded-full"
						>
							Most Popular
						</div>
					{/if}
					
					<div class="mb-6">
						<h3 class="text-3xl font-bold text-purple-accent mb-4">{tier.name}</h3>
						<div class="flex items-baseline gap-2 mb-6">
							<span class="text-4xl font-bold">{tier.price}</span>
							<span class="text-gray-400 text-lg">{tier.period}</span>
						</div>
						<p class="text-gray-300 text-sm leading-relaxed mb-4">{tier.description}</p>
						{#if tier.premiumDescription}
							<p class="text-gray-300 text-sm leading-relaxed">{tier.premiumDescription}</p>
						{/if}
					</div>
					
					<div class="mb-8">
						<h4 class="text-cyan-accent font-semibold mb-4">KEY FEATURES:</h4>
						<ul class="space-y-3">
							{#each tier.features as feature}
								<li class="text-gray-300 text-sm flex items-center gap-2">
									<span class="text-cyan-accent">→</span>
									{feature}
								</li>
							{/each}
						</ul>
					</div>
					
					<button
						onclick={handleSubscribe}
						class="w-full {tier.popular
							? 'bg-gradient-to-r from-purple-accent to-cyan-accent'
							: 'bg-purple-accent'} text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
					>
						Subscribe Now
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>

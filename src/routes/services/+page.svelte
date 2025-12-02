<script lang="ts">
	import { Sparkles, TrendingUp, FileSearch, Users, Zap, Shield } from 'lucide-svelte';
	
	const services = [
		{
			id: 1,
			title: 'Deal Sourcing',
			description: 'Access exclusive investment opportunities from our curated network of startups and founders.',
			icon: Sparkles,
			features: ['Curated deal flow', 'Early access to rounds', 'Direct founder intros']
		},
		{
			id: 2,
			title: 'Due Diligence',
			description: 'Comprehensive analysis and risk assessment for your investment decisions.',
			icon: FileSearch,
			features: ['Financial analysis', 'Market research', 'Legal review']
		},
		{
			id: 3,
			title: 'Portfolio Management',
			description: 'Track, analyze, and optimize your investment portfolio with advanced tools.',
			icon: TrendingUp,
			features: ['Real-time tracking', 'Performance analytics', 'Risk assessment']
		},
		{
			id: 4,
			title: 'LP Relations',
			description: 'Streamline communication and reporting with your Limited Partners.',
			icon: Users,
			features: ['Automated reporting', 'Quarterly updates', 'LP portal access']
		},
		{
			id: 5,
			title: 'Deal Structuring',
			description: 'Expert guidance on term sheets, valuations, and deal negotiations.',
			icon: Zap,
			features: ['Term sheet review', 'Valuation analysis', 'Negotiation support']
		},
		{
			id: 6,
			title: 'Compliance & Legal',
			description: 'Stay compliant with regulatory requirements and legal best practices.',
			icon: Shield,
			features: ['Regulatory compliance', 'Legal documentation', 'Risk management']
		}
	];
	
	const pricingTiers = [
		{
			name: 'Starter',
			price: '$99',
			period: '/month',
			description: 'Perfect for individual investors',
			features: [
				'Portfolio tracking (up to 10 holdings)',
				'Basic calculators',
				'Forum access',
				'Email support'
			],
			popular: false
		},
		{
			name: 'Professional',
			price: '$299',
			period: '/month',
			description: 'For active VCs and fund managers',
			features: [
				'Unlimited portfolio tracking',
				'Advanced calculators',
				'Deal sourcing access',
				'Due diligence tools',
				'Priority support',
				'LP reporting'
			],
			popular: true
		},
		{
			name: 'Enterprise',
			price: 'Custom',
			period: '',
			description: 'For funds and institutions',
			features: [
				'Everything in Professional',
				'Custom integrations',
				'Dedicated account manager',
				'White-label options',
				'API access',
				'Custom reporting'
			],
			popular: false
		}
	];
</script>

<svelte:head>
	<title>Services - Leaving The Matrix</title>
	<meta name="description" content="Premium VC services including deal sourcing, due diligence, and portfolio management" />
</svelte:head>

<div class="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-16">
			<h1 class="text-4xl sm:text-5xl font-bold mb-4">Our Services</h1>
			<p class="text-xl text-gray-400 max-w-2xl mx-auto">
				Comprehensive tools and services to power your VC investment strategy
			</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
			{#each services as service}
				<div class="glass rounded-2xl p-6 card-float glass-hover">
					<div class="p-3 rounded-xl bg-purple-accent/20 text-purple-accent w-fit mb-4">
						<svelte:component this={service.icon} class="w-6 h-6" />
					</div>
					<h3 class="text-xl font-bold mb-2">{service.title}</h3>
					<p class="text-gray-400 text-sm mb-4">{service.description}</p>
					<ul class="space-y-2">
						{#each service.features as feature}
							<li class="text-sm text-gray-300 flex items-center gap-2">
								<div class="w-1.5 h-1.5 rounded-full bg-cyan-accent"></div>
								{feature}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
		
		<div class="text-center mb-12">
			<h2 class="text-3xl sm:text-4xl font-bold mb-4">Pricing</h2>
			<p class="text-gray-400">Choose the plan that fits your needs</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
					<div class="text-center mb-6">
						<h3 class="text-2xl font-bold mb-2">{tier.name}</h3>
						<p class="text-gray-400 text-sm mb-4">{tier.description}</p>
						<div class="flex items-baseline justify-center gap-1">
							<span class="text-4xl font-bold">{tier.price}</span>
							<span class="text-gray-400">{tier.period}</span>
						</div>
					</div>
					<ul class="space-y-3 mb-8">
						{#each tier.features as feature}
							<li class="text-sm text-gray-300 flex items-start gap-2">
								<div class="w-1.5 h-1.5 rounded-full bg-cyan-accent mt-1.5 flex-shrink-0"></div>
								<span>{feature}</span>
							</li>
						{/each}
					</ul>
					<button class="w-full {tier.popular ? 'btn-primary' : 'btn-secondary'}">
						Get Started
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>


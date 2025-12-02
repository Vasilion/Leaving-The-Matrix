<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, TrendingUp, Calculator, BookOpen, MessageSquare, Sparkles } from 'lucide-svelte';
	import QuickAccessCard from '$lib/components/QuickAccessCard.svelte';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	
	let particles: { x: number; y: number; vx: number; vy: number }[] = $state([]);
	
	onMount(() => {
		if (typeof window !== 'undefined') {
			for (let i = 0; i < 50; i++) {
				particles.push({
					x: Math.random() * window.innerWidth,
					y: Math.random() * window.innerHeight,
					vx: (Math.random() - 0.5) * 0.5,
					vy: (Math.random() - 0.5) * 0.5
				});
			}
			
			const animate = () => {
				particles = particles.map((p) => ({
					...p,
					x: (p.x + p.vx + window.innerWidth) % window.innerWidth,
					y: (p.y + p.vy + window.innerHeight) % window.innerHeight
				}));
				requestAnimationFrame(animate);
			};
			animate();
		}
	});
	
	const latestNews = [
		{
			id: 1,
			title: 'AI Startup Raises $50M Series B',
			excerpt: 'Revolutionary AI platform secures major funding round led by top-tier VCs',
			date: '2 hours ago',
			category: 'Funding'
		},
		{
			id: 2,
			title: 'New Regulatory Framework for Crypto Investments',
			excerpt: 'SEC announces updated guidelines affecting venture capital crypto holdings',
			date: '5 hours ago',
			category: 'Regulation'
		},
		{
			id: 3,
			title: 'Biotech Breakthrough: $200M Exit',
			excerpt: 'Portfolio company achieves successful exit, delivering 10x returns to early investors',
			date: '1 day ago',
			category: 'Exit'
		}
	];
	
	const featuredServices = [
		{
			id: 1,
			title: 'Deal Sourcing',
			description: 'Access exclusive investment opportunities',
			icon: Sparkles
		},
		{
			id: 2,
			title: 'Due Diligence',
			description: 'Comprehensive analysis and risk assessment',
			icon: TrendingUp
		},
		{
			id: 3,
			title: 'Portfolio Management',
			description: 'Track and optimize your investments',
			icon: Calculator
		}
	];
</script>

<div class="relative overflow-hidden">
	<div class="absolute inset-0 pointer-events-none">
		{#each particles as particle}
			<div
				class="absolute w-1 h-1 rounded-full bg-purple-accent/20"
				style="left: {particle.x}px; top: {particle.y}px;"
			></div>
		{/each}
	</div>
	
	<section class="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
		<div class="max-w-7xl mx-auto text-center">
			<h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
				<span class="text-gradient-purple">Leaving The Matrix</span>
			</h1>
			<p class="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
				Premium VC investment platform. Track portfolios, calculate returns, and connect with the community.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/portfolio" class="btn-primary inline-flex items-center gap-2">
					View Portfolio
					<ArrowRight class="w-5 h-5" />
				</a>
				<a href="/services" class="btn-secondary inline-flex items-center gap-2">
					Explore Services
					<ArrowRight class="w-5 h-5" />
				</a>
			</div>
		</div>
	</section>
	
	<section class="px-4 sm:px-6 lg:px-8 py-16">
		<div class="max-w-7xl mx-auto">
			<h2 class="text-3xl font-bold mb-8">Quick Access</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<QuickAccessCard
					title="Portfolio Tracker"
					description="Monitor your investments"
					icon={TrendingUp}
					href="/portfolio"
					color="purple"
				/>
				<QuickAccessCard
					title="Calculators"
					description="IRR, MOIC & more"
					icon={Calculator}
					href="/calculators"
					color="cyan"
				/>
				<QuickAccessCard
					title="Forum"
					description="Join discussions"
					icon={MessageSquare}
					href="/forum"
					color="purple"
				/>
				<QuickAccessCard
					title="Education"
					description="Learn VC fundamentals"
					icon={BookOpen}
					href="/education"
					color="cyan"
				/>
			</div>
		</div>
	</section>
	
	<section class="px-4 sm:px-6 lg:px-8 py-16">
		<div class="max-w-7xl mx-auto">
			<h2 class="text-3xl font-bold mb-8">Latest Ideas & News</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each latestNews as news}
					<NewsCard {...news} />
				{/each}
			</div>
		</div>
	</section>
	
	<section class="px-4 sm:px-6 lg:px-8 py-16">
		<div class="max-w-7xl mx-auto">
			<h2 class="text-3xl font-bold mb-8">Featured Services</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				{#each featuredServices as service}
					<ServiceCard {...service} />
				{/each}
			</div>
		</div>
	</section>
	
	<section class="px-4 sm:px-6 lg:px-8 py-16">
		<div class="max-w-7xl mx-auto">
			<div class="glass rounded-2xl p-6 md:p-8">
				<div class="flex flex-col md:flex-row items-center justify-between gap-4">
					<div>
						<h3 class="text-2xl font-bold mb-2">Announcements</h3>
						<p class="text-gray-300">New portfolio tracking features now live • Discord community reaches 10K members</p>
					</div>
					<a href="/announcements" class="btn-secondary whitespace-nowrap">View All</a>
				</div>
			</div>
		</div>
	</section>
</div>


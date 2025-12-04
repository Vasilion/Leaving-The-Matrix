<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, TrendingUp, Calculator, BookOpen, Sparkles } from 'lucide-svelte';
	import QuickAccessCard from '$lib/components/QuickAccessCard.svelte';
	import banner from '../assets/imgs/banner.png';
	
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
	
	<section class="relative px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8 overflow-hidden">
		<div class="max-w-7xl mx-auto">
			<div class="flex flex-col gap-8 items-center">
				<div class="w-full max-w-4xl relative">
					<div class="relative rounded-2xl overflow-hidden glass border border-white/10">
						<img
							src={banner}
							alt="Leaving The Matrix"
							class="w-full h-auto object-cover max-h-[400px]"
							loading="eager"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent pointer-events-none"></div>
					</div>
				</div>
				<div class="text-center max-w-3xl mx-auto">
					<p class="text-xl sm:text-2xl text-gray-300 mb-8">
						Track your stock portfolio, learn trading strategies, and access premium stock picks. Master the markets with real-time data and expert guidance.
					</p>
					<div class="flex flex-col sm:flex-row gap-4 justify-center">
						<a href="/portfolio" class="btn-primary inline-flex items-center justify-center gap-2">
							View Portfolio
							<ArrowRight class="w-5 h-5" />
						</a>
						<a href="/services" class="btn-secondary inline-flex items-center justify-center gap-2">
							Explore Services
							<ArrowRight class="w-5 h-5" />
						</a>
					</div>
				</div>
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
					title="Education"
					description="Trading strategies & market analysis"
					icon={BookOpen}
					href="/education"
					color="cyan"
				/>
				<QuickAccessCard
					title="Services"
					description="Stock picks & trading"
					icon={Sparkles}
					href="/services"
					color="purple"
				/>
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


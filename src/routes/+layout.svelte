<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	
	let mouseTrail: { x: number; y: number; id: number; timestamp: number }[] = $state([]);
	let trailId = $state(0);
	let animationFrameId: number | null = null;
	
	onMount(() => {
		if (typeof window !== 'undefined') {
			let lastUpdate = 0;
			const throttleDelay = 16;
			
			const cleanupOldParticles = () => {
				const now = Date.now();
				mouseTrail = mouseTrail.filter((particle) => now - particle.timestamp < 1000);
				
				if (mouseTrail.length > 0) {
					animationFrameId = requestAnimationFrame(cleanupOldParticles);
				} else {
					animationFrameId = null;
				}
			};
			
			const handleMouseMove = (e: MouseEvent) => {
				if (window.innerWidth > 768) {
					const now = Date.now();
					if (now - lastUpdate < throttleDelay) return;
					lastUpdate = now;
					
					trailId++;
					const newParticle = { x: e.clientX, y: e.clientY, id: trailId, timestamp: now };
					mouseTrail = [...mouseTrail.slice(-4), newParticle];
					
					if (animationFrameId === null) {
						animationFrameId = requestAnimationFrame(cleanupOldParticles);
					}
				}
			};
			
			window.addEventListener('mousemove', handleMouseMove, { passive: true });
			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
				if (animationFrameId !== null) {
					cancelAnimationFrame(animationFrameId);
				}
			};
		}
	});
</script>

<svelte:head>
	<title>Leaving The Matrix - VC Investment Platform</title>
	<meta name="description" content="Premium VC investment platform with portfolio tracking, calculators, and trading education" />
	<meta property="og:title" content="Leaving The Matrix - VC Investment Platform" />
	<meta property="og:description" content="Premium VC investment platform with portfolio tracking, calculators, and trading education" />
	<meta property="og:type" content="website" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Navbar />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
	
	<a
		href="/services"
		class="fixed bottom-6 right-6 z-40 btn-primary shadow-glow-cyan animate-pulse hover:animate-none"
	>
		Leave The Matrix
	</a>
</div>

{#if mouseTrail.length > 0}
	{#each mouseTrail as particle (particle.id)}
		<div
			class="fixed pointer-events-none z-50 w-2 h-2 rounded-full bg-cyan-accent/30 blur-sm transition-opacity duration-1000"
			style="left: {particle.x}px; top: {particle.y}px; transform: translate(-50%, -50%);"
		></div>
	{/each}
{/if}


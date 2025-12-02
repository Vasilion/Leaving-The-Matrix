<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	
	let mouseTrail: { x: number; y: number; id: number }[] = $state([]);
	let trailId = $state(0);
	
	onMount(() => {
		if (typeof window !== 'undefined') {
			const handleMouseMove = (e: MouseEvent) => {
				if (window.innerWidth > 768) {
					trailId++;
					mouseTrail = [...mouseTrail.slice(-4), { x: e.clientX, y: e.clientY, id: trailId }];
					
					setTimeout(() => {
						mouseTrail = mouseTrail.filter((particle) => particle.id !== trailId);
					}, 1000);
				}
			};
			
			window.addEventListener('mousemove', handleMouseMove);
			return () => window.removeEventListener('mousemove', handleMouseMove);
		}
	});
</script>

<svelte:head>
	<title>Leaving The Matrix - VC Investment Platform</title>
	<meta name="description" content="Premium VC investment platform with portfolio tracking, calculators, and community forum" />
	<meta property="og:title" content="Leaving The Matrix - VC Investment Platform" />
	<meta property="og:description" content="Premium VC investment platform with portfolio tracking, calculators, and community forum" />
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
		Upgrade
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


<script lang="ts">
	import { Menu, X, TrendingUp } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	
	let mobileMenuOpen = $state(false);
	let currentPath = $state('');
	
	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/portfolio', label: 'Portfolio' },
		{ href: '/calculators', label: 'Calculators' },
		{ href: '/forum', label: 'Forum' },
		{ href: '/education', label: 'Education' },
		{ href: '/services', label: 'Services' }
	];
	
	$effect(() => {
		currentPath = $page?.url?.pathname || '';
	});
</script>

<nav class="glass border-b border-white/10 sticky top-0 z-40">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<a href="/" class="flex items-center gap-2 text-xl font-bold text-gradient-purple">
				<TrendingUp class="w-6 h-6" />
				<span>LTM</span>
			</a>
			
			<div class="hidden md:flex items-center gap-8">
				{#each navLinks as link}
					<a
						href={link.href}
						class="text-gray-300 hover:text-cyan-accent transition-colors {currentPath === link.href
							? 'text-cyan-accent'
							: ''}"
					>
						{link.label}
					</a>
				{/each}
			</div>
			
			<div class="hidden md:flex items-center gap-4">
				<a href="/announcements" class="text-sm text-gray-400 hover:text-cyan-accent transition-colors">
					Announcements
				</a>
				<a href="/services" class="btn-primary text-sm py-2 px-4">Upgrade</a>
			</div>
			
			<button
				class="md:hidden text-gray-300 hover:text-white"
				onclick={() => mobileMenuOpen = !mobileMenuOpen}
			>
				{#if mobileMenuOpen}
					<X class="w-6 h-6" />
				{:else}
					<Menu class="w-6 h-6" />
				{/if}
			</button>
		</div>
	</div>
	
	{#if mobileMenuOpen}
		<div class="md:hidden border-t border-white/10">
			<div class="px-4 py-4 space-y-3">
				{#each navLinks as link}
					<a
						href={link.href}
						class="block text-gray-300 hover:text-cyan-accent transition-colors {currentPath === link.href
							? 'text-cyan-accent'
							: ''}"
						onclick={() => mobileMenuOpen = false}
					>
						{link.label}
					</a>
				{/each}
				<a href="/announcements" class="block text-gray-300 hover:text-cyan-accent transition-colors">
					Announcements
				</a>
				<a href="/services" class="btn-primary text-sm py-2 px-4 inline-block">Upgrade</a>
			</div>
		</div>
	{/if}
</nav>


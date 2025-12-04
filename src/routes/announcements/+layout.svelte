<script lang="ts">
	import { onMount } from 'svelte';
	import { Users, CheckCircle, XCircle } from 'lucide-svelte';
	
	let discordStatus = $state({
		online: true,
		members: 10247,
		loading: true
	});
	
	onMount(async () => {
		discordStatus.loading = false;
	});
</script>

<div class="px-4 sm:px-6 lg:px-8 py-8">
	<div class="max-w-4xl mx-auto mb-8">
		<div class="glass rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
			<div class="flex items-center gap-4">
				<div class="p-3 rounded-xl bg-purple-accent/20 text-purple-accent">
					<Users class="w-6 h-6" />
				</div>
				<div>
					<div class="flex items-center gap-2 mb-1">
						<h3 class="font-bold">Discord Community</h3>
						{#if discordStatus.loading}
							<div class="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
						{:else if discordStatus.online}
							<CheckCircle class="w-4 h-4 text-cyan-accent" />
						{:else}
							<XCircle class="w-4 h-4 text-red-400" />
						{/if}
					</div>
					<p class="text-sm text-gray-400">
						Leaving The Matrix is a community of like minded people looking to supplement or replace their income through the power of financial markets
					</p>
				</div>
			</div>
			<a
				href="https://mee6.xyz/en/m/1384673721599397948"
				target="_blank"
				rel="noopener noreferrer"
				class="btn-primary whitespace-nowrap"
			>
				Join Discord
			</a>
		</div>
	</div>
	
	<slot />
</div>


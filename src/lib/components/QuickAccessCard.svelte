<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { ArrowRight } from 'lucide-svelte';
	
	interface Props {
		title: string;
		description: string;
		icon: ComponentType;
		href: string;
		color: 'purple' | 'cyan';
	}
	
	let { title, description, icon: Icon, href, color }: Props = $props();
</script>

<a
	href={href}
	class="glass rounded-2xl p-6 card-float glass-hover block group"
>
	<div class="flex items-start justify-between mb-4">
		<div
			class="p-3 rounded-xl {color === 'purple'
				? 'bg-purple-accent/20 text-purple-accent'
				: 'bg-cyan-accent/20 text-cyan-accent'}"
		>
			<Icon class="w-6 h-6" />
		</div>
		<ArrowRight
			class="w-5 h-5 text-gray-400 group-hover:text-cyan-accent group-hover:translate-x-1 transition-all"
		/>
	</div>
	<h3 class="text-xl font-bold mb-2">{title}</h3>
	<p class="text-gray-400 text-sm">{description}</p>
</a>


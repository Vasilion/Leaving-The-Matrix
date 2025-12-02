<script lang="ts">
	import type { ComponentType } from 'svelte';
	
	interface Props {
		id: number;
		title: string;
		description: string;
		icon: ComponentType;
	}
	
	let { title, description, icon: Icon }: Props = $props();
</script>

<div class="glass rounded-2xl p-6 card-float glass-hover">
	<div class="p-3 rounded-xl bg-purple-accent/20 text-purple-accent w-fit mb-4">
		<Icon class="w-6 h-6" />
	</div>
	<h3 class="text-xl font-bold mb-2">{title}</h3>
	<p class="text-gray-400 text-sm">{description}</p>
</div>


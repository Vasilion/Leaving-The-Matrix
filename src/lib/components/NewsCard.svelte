<script lang="ts">
	interface Props {
		id: number;
		title: string;
		excerpt: string;
		date: string;
		category: string;
	}
	
	let { title, excerpt, date, category }: Props = $props();
</script>

<article class="glass rounded-2xl p-6 card-float glass-hover">
	<div class="flex items-center justify-between mb-3">
		<span class="text-xs font-semibold text-purple-accent bg-purple-accent/20 px-3 py-1 rounded-full">
			{category}
		</span>
		<span class="text-xs text-gray-500">{date}</span>
	</div>
	<h3 class="text-xl font-bold mb-2">{title}</h3>
	<p class="text-gray-400 text-sm">{excerpt}</p>
</article>


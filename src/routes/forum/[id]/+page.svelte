<script lang="ts">
	import { page } from '$app/stores';
	import { ArrowLeft, TrendingUp, TrendingDown, MessageSquare, Clock } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	
	let thread = $state({
		id: '1',
		title: 'Best practices for Series A due diligence?',
		author: 'VC_Expert',
		content: 'I\'ve been working on several Series A deals recently and wanted to share some best practices I\'ve learned. What are your thoughts on structuring due diligence for Series A investments?',
		upvotes: 156,
		downvotes: 3,
		createdAt: '2 hours ago',
		category: 'Strategy'
	});
	
	let replies = $state([
		{
			id: '1',
			author: 'SeniorVC',
			content: 'Great question! I always start with the cap table and founder equity structure. Then move to financials and unit economics.',
			upvotes: 42,
			downvotes: 0,
			createdAt: '1 hour ago',
			replies: []
		},
		{
			id: '2',
			author: 'DealMaker',
			content: 'Don\'t forget to check IP ownership and any potential legal issues. I\'ve seen deals fall apart over IP disputes.',
			upvotes: 28,
			downvotes: 1,
			createdAt: '45 minutes ago',
			replies: []
		}
	]);
	
	let newReply = $state('');
	let showEditor = $state(false);
	
	function handleUpvote(id: string) {
		// Implementation would update votes
	}
	
	function handleDownvote(id: string) {
		// Implementation would update votes
	}
</script>

<svelte:head>
	<title>{thread.title} - Forum - Leaving The Matrix</title>
</svelte:head>

<div class="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
	<div class="max-w-4xl mx-auto">
		<button
			onclick={() => goto('/forum')}
			class="flex items-center gap-2 text-gray-400 hover:text-cyan-accent mb-6 transition-colors"
		>
			<ArrowLeft class="w-4 h-4" />
			Back to Forum
		</button>
		
		<article class="glass rounded-2xl p-6 sm:p-8 mb-6">
			<div class="flex items-start justify-between mb-4">
				<div>
					<span class="text-xs font-semibold text-purple-accent bg-purple-accent/20 px-3 py-1 rounded-full inline-block mb-3">
						{thread.category}
					</span>
					<h1 class="text-3xl font-bold mb-4">{thread.title}</h1>
					<div class="flex items-center gap-4 text-sm text-gray-400 mb-6">
						<span>by {thread.author}</span>
						<span>•</span>
						<span class="flex items-center gap-1">
							<Clock class="w-3 h-3" />
							{thread.createdAt}
						</span>
					</div>
				</div>
			</div>
			
			<div class="prose prose-invert max-w-none mb-6">
				<p class="text-gray-300 leading-relaxed">{thread.content}</p>
			</div>
			
			<div class="flex items-center gap-4 pt-6 border-t border-white/10">
				<button
					onclick={() => handleUpvote(thread.id)}
					class="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 transition-colors"
				>
					<TrendingUp class="w-4 h-4 text-cyan-accent" />
					<span class="font-semibold">{thread.upvotes}</span>
				</button>
				<button
					onclick={() => handleDownvote(thread.id)}
					class="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 transition-colors"
				>
					<TrendingDown class="w-4 h-4 text-gray-400" />
					<span>{thread.downvotes}</span>
				</button>
			</div>
		</article>
		
		<div class="mb-6">
			<h2 class="text-2xl font-bold mb-4">Replies ({replies.length})</h2>
			
			{#if !showEditor}
				<button
					onclick={() => showEditor = true}
					class="btn-secondary w-full sm:w-auto"
				>
					Add Reply
				</button>
			{:else}
				<div class="glass rounded-2xl p-6 mb-6">
					<textarea
						bind:value={newReply}
						placeholder="Write your reply..."
						class="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-purple-accent focus:outline-none mb-4 min-h-[120px] bg-transparent"
					></textarea>
					<div class="flex gap-4">
						<button
							onclick={() => {
								if (newReply.trim()) {
									replies = [
										...replies,
										{
											id: Date.now().toString(),
											author: 'You',
											content: newReply,
											upvotes: 0,
											downvotes: 0,
											createdAt: 'just now',
											replies: []
										}
									];
									newReply = '';
									showEditor = false;
								}
							}}
							class="btn-primary"
						>
							Post Reply
						</button>
						<button
							onclick={() => {
								showEditor = false;
								newReply = '';
							}}
							class="btn-secondary"
						>
							Cancel
						</button>
					</div>
				</div>
			{/if}
		</div>
		
		<div class="space-y-4">
			{#each replies as reply}
				<div class="glass rounded-2xl p-6">
					<div class="flex items-start justify-between mb-4">
						<div>
							<div class="flex items-center gap-3 mb-2">
								<div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-accent to-cyan-accent flex items-center justify-center text-white font-bold text-sm">
									{reply.author.charAt(0)}
								</div>
								<span class="font-semibold">{reply.author}</span>
								<span class="text-xs text-gray-500 flex items-center gap-1">
									<Clock class="w-3 h-3" />
									{reply.createdAt}
								</span>
							</div>
							<p class="text-gray-300">{reply.content}</p>
						</div>
					</div>
					<div class="flex items-center gap-4 pt-4 border-t border-white/10">
						<button
							onclick={() => handleUpvote(reply.id)}
							class="flex items-center gap-2 text-sm"
						>
							<TrendingUp class="w-4 h-4 text-cyan-accent" />
							<span>{reply.upvotes}</span>
						</button>
						<button
							onclick={() => handleDownvote(reply.id)}
							class="flex items-center gap-2 text-sm text-gray-400"
						>
							<TrendingDown class="w-4 h-4" />
							<span>{reply.downvotes}</span>
						</button>
						<button class="text-sm text-gray-400 hover:text-cyan-accent transition-colors ml-auto">
							Reply
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>


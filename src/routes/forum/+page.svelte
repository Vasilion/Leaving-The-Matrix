<script lang="ts">
	import { MessageSquare, TrendingUp, Clock } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	
	const categories = [
		{ id: 'all', name: 'All Topics', count: 42 },
		{ id: 'investments', name: 'Investments', count: 15 },
		{ id: 'strategy', name: 'Strategy', count: 12 },
		{ id: 'deals', name: 'Deal Flow', count: 8 },
		{ id: 'general', name: 'General', count: 7 }
	];
	
	const threads = [
		{
			id: '1',
			title: 'Best practices for Series A due diligence?',
			author: 'VC_Expert',
			category: 'strategy',
			replies: 24,
			upvotes: 156,
			lastActivity: '2 hours ago',
			excerpt: 'Looking for advice on structuring due diligence for Series A investments...'
		},
		{
			id: '2',
			title: 'AI startup valuation trends 2024',
			author: 'TechAnalyst',
			category: 'investments',
			replies: 18,
			upvotes: 89,
			lastActivity: '5 hours ago',
			excerpt: 'Recent data shows interesting patterns in AI startup valuations...'
		},
		{
			id: '3',
			title: 'Portfolio company exit strategy discussion',
			author: 'PortfolioManager',
			category: 'deals',
			replies: 31,
			upvotes: 203,
			lastActivity: '1 day ago',
			excerpt: 'We\'re exploring exit options for one of our portfolio companies...'
		},
		{
			id: '4',
			title: 'LP relations: quarterly reporting best practices',
			author: 'FundAdmin',
			category: 'general',
			replies: 12,
			upvotes: 67,
			lastActivity: '2 days ago',
			excerpt: 'What metrics and format do LPs find most valuable?'
		}
	];
	
	let selectedCategory = $state('all');
	let filteredThreads = $derived(
		selectedCategory === 'all'
			? threads
			: threads.filter((t) => t.category === selectedCategory)
	);
</script>

<svelte:head>
	<title>Forum - Leaving The Matrix</title>
	<meta name="description" content="Join discussions about VC investments, strategy, and deal flow" />
</svelte:head>

<div class="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
	<div class="max-w-7xl mx-auto">
		<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
			<div>
				<h1 class="text-4xl sm:text-5xl font-bold mb-2">Forum</h1>
				<p class="text-gray-400">Join the community discussion</p>
			</div>
			<button class="btn-primary inline-flex items-center gap-2">
				<MessageSquare class="w-5 h-5" />
				New Thread
			</button>
		</div>
		
		<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
			<aside class="lg:col-span-1">
				<div class="glass rounded-2xl p-6 sticky top-24">
					<h2 class="font-bold mb-4">Categories</h2>
					<div class="space-y-2">
						{#each categories as category}
							<button
								onclick={() => selectedCategory = category.id}
								class="w-full text-left px-4 py-2 rounded-lg transition-colors {selectedCategory === category.id
									? 'bg-purple-accent/20 text-purple-accent'
									: 'hover:bg-white/5 text-gray-300'}"
							>
								<div class="flex items-center justify-between">
									<span>{category.name}</span>
									<span class="text-xs text-gray-500">{category.count}</span>
								</div>
							</button>
						{/each}
					</div>
				</div>
			</aside>
			
			<main class="lg:col-span-3">
				<div class="space-y-4">
					{#each filteredThreads as thread}
						<article
							onclick={() => goto(`/forum/${thread.id}`)}
							class="glass rounded-2xl p-6 card-float glass-hover cursor-pointer"
						>
							<div class="flex items-start justify-between gap-4 mb-3">
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">{thread.title}</h3>
									<p class="text-gray-400 text-sm mb-3">{thread.excerpt}</p>
									<div class="flex items-center gap-4 text-xs text-gray-500">
										<span>by {thread.author}</span>
										<span>•</span>
										<span class="flex items-center gap-1">
											<Clock class="w-3 h-3" />
											{thread.lastActivity}
										</span>
									</div>
								</div>
							</div>
							<div class="flex items-center gap-6 pt-4 border-t border-white/10">
								<div class="flex items-center gap-2 text-cyan-accent">
									<TrendingUp class="w-4 h-4" />
									<span class="text-sm font-semibold">{thread.upvotes}</span>
								</div>
								<div class="flex items-center gap-2 text-gray-400">
									<MessageSquare class="w-4 h-4" />
									<span class="text-sm">{thread.replies} replies</span>
								</div>
								<span
									class="text-xs font-semibold text-purple-accent bg-purple-accent/20 px-3 py-1 rounded-full ml-auto"
								>
									{categories.find((c) => c.id === thread.category)?.name || thread.category}
								</span>
							</div>
						</article>
					{/each}
				</div>
			</main>
		</div>
	</div>
</div>


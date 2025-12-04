<script lang="ts">
	import { Play, TrendingUp, Shield, BarChart3, Target, BookOpen, Star } from 'lucide-svelte';
	
	interface Video {
		id: string;
		title: string;
		description: string;
		categories: string[];
		url: string;
	}
	
	const categories = [
		{ id: 'all', name: 'All Videos', icon: BookOpen },
		{ id: 'must-watch', name: 'Must Watch', icon: Star },
		{ id: 'options', name: 'Options Trading', icon: TrendingUp },
		{ id: 'risk', name: 'Risk Management', icon: Shield },
		{ id: 'market', name: 'Reading Markets', icon: BarChart3 },
		{ id: 'strategy', name: 'Trading Strategy', icon: Target }
	];
	
	const videos: Video[] = [
		{
			id: 'VyS7gum3eRE',
			title: 'The Power of Compounding and Why My Income Portfolio Strategy Might Make Sense For You',
			description: 'A lesson on the power of compounding and why your income portfolio strategy might make sense for you.',
			categories: ['strategy'],
			url: 'https://youtu.be/VyS7gum3eRE'
		},
		{
			id: 'yhHfdgzCHNs',
			title: 'Iron Butterfly',
			description: 'A lesson on how to use an iron butterfly to make money in the market.',
			categories: ['options'],
			url: 'https://youtu.be/yhHfdgzCHNs'
		},
		{
			id: '111GYm3nfRY',
			title: 'Poor Mans Covered Calls, Riskless Trading (if done correctly).',
			description: 'A lesson on how to use poor man\'s covered calls to make money in the market.',
			categories: ['options'],
			url: 'https://youtu.be/f2RT2lx-Ygg'
		},
		{
			id: 'f2RT2lx-Ygg',
			title: 'Put Credit Spreads, Iron Condors and General Options Strategies',
			description: 'A lesson on how to use put credit spreads, iron condors and general options strategies to make money in the market.',
			categories: ['options'],
			url: 'https://youtu.be/aNMk_0A3Ir8'
		},
		{
			id: 'aNMk_0A3Ir8',
			title: 'IWM Wheel',
			description: 'How to use the IWM wheel to make money in the market.',
			categories: ['options'],
			url: 'https://youtu.be/siKdJ_z2ykg'
		},
		{
			id: 'siKdJ_z2ykg',
			title: 'A Lesson on Warning Signs',
			description: 'A lesson on warning signs and how to spot them in the market.',
			categories: ['market'],
			url: 'https://youtu.be/siKdJ_z2ykg'
		},
		{
			id: 'tnqdOfzXeG8',
			title: 'Free Money Glitch',
			description: 'How to use the wheel to make "free money" in the market.',
			categories: ['market'],
			url: 'https://youtu.be/ABg2ky39qxI'
		},
		{
			id: 'ABg2ky39qxI',
			title: 'Out of the Money vs In The Money Options',
			description: 'A lesson on the difference between out of the money and in the money options.',
			categories: ['options'],
			url: 'https://youtu.be/dLe9sQRn6zY'
		},
		{
			id: 'PX748OZZPmA',
			title: 'Be Active In Your Trades For Better Consistency!',
			description: 'A lesson on how to be active in your trades for better consistency.',
			categories: ['risk'],
			url: 'https://youtu.be/PX748OZZPmA'
		},
		{
			id: '_ORPAN9HgzA',
			title: 'Setting Target and Stop Example (Q n A)',
			description: 'A lesson on how to set targets and stops in the market.',
			categories: ['strategy'],
			url: 'https://youtu.be/_ORPAN9HgzA'
		},
		{
			id: 'XGlkJcaUk6s',
			title: 'The Key To Trading Successful.. The Most Important Video In Leaving The Matrix',
			description: 'The most important video in Leaving The Matrix. This video will teach you the key to trading successfully. It will teach you how to read the market and identify key levels. It will teach you how to trade successfully.',
			categories: ['risk', 'must-watch'],
			url: 'https://youtu.be/XGlkJcaUk6s'
		},
		{
			id: 'srL2lQX5o8U',
			title: 'A Lesson on Manipulation',
			description: 'A lesson on manipulation and how to spot it in the market.',
			categories: ['market'],
			url: 'https://youtu.be/srL2lQX5o8U'
		}
	];
	
	let selectedCategory = $state('all');
	
	const filteredVideos = $derived(
		selectedCategory === 'all'
			? videos
			: videos.filter((v) => v.categories.includes(selectedCategory))
	);
	
	function getThumbnailUrl(videoId: string): string {
		return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
	}
	
	function openVideo(url: string) {
		window.open(url, '_blank');
	}
</script>

<svelte:head>
	<title>Education Hub - Leaving The Matrix</title>
	<meta name="description" content="Learn trading strategies, options, risk management, and market analysis" />
</svelte:head>

<div class="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl sm:text-5xl font-bold mb-4">Education Hub</h1>
			<p class="text-xl text-gray-400">Master trading strategies, options, and market analysis with our video library</p>
		</div>
		
		<div class="flex flex-wrap gap-3 mb-8 justify-center">
			{#each categories as category}
				{@const IconComponent = category.icon}
				<button
					onclick={() => selectedCategory = category.id}
					class="flex items-center gap-2 px-4 py-2 rounded-xl transition-all {selectedCategory === category.id
						? 'bg-gradient-to-r from-purple-accent to-cyan-accent text-white'
						: 'glass text-gray-300 hover:text-white'}"
				>
					<IconComponent class="w-4 h-4" />
					{category.name}
				</button>
			{/each}
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredVideos as video}
				<div 
					class="glass rounded-2xl overflow-hidden card-float glass-hover group cursor-pointer" 
					onclick={() => openVideo(video.url)}
					onkeydown={(e) => e.key === 'Enter' && openVideo(video.url)}
					role="button"
					tabindex="0"
					aria-label="Watch {video.title}"
				>
					<div class="relative aspect-video bg-white/5 overflow-hidden">
						<img
							src={getThumbnailUrl(video.id)}
							alt={video.title}
							class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
							loading="lazy"
							onerror={(e) => {
								const img = e.currentTarget as HTMLImageElement;
								img.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
							}}
						/>
						<div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
							<div class="w-16 h-16 rounded-full bg-gradient-to-r from-purple-accent to-cyan-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
								<Play class="w-8 h-8 text-white ml-1" fill="white" />
							</div>
						</div>
						<div class="absolute top-3 right-3 flex flex-wrap gap-1 justify-end max-w-[60%]">
							{#each video.categories as categoryId}
								{@const category = categories.find(c => c.id === categoryId)}
								{#if category}
									<span class="text-xs font-semibold text-white bg-black/60 px-2 py-1 rounded-full {categoryId === 'must-watch' ? 'bg-gradient-to-r from-yellow-500/80 to-orange-500/80' : ''}">
										{category.name}
									</span>
								{/if}
							{/each}
						</div>
					</div>
					
					<div class="p-6">
						<h3 class="text-xl font-bold mb-2 line-clamp-2">{video.title}</h3>
						<p class="text-gray-400 text-sm mb-4 line-clamp-2">{video.description}</p>
						
						<button class="w-full btn-secondary text-sm py-2 flex items-center justify-center gap-2">
							<Play class="w-4 h-4" />
							Watch Video
						</button>
					</div>
				</div>
			{/each}
		</div>
		
		{#if filteredVideos.length === 0}
			<div class="text-center py-12">
				<p class="text-gray-400 text-lg">No videos found in this category.</p>
			</div>
		{/if}
	</div>
</div>

<script lang="ts">
	import { Bell, Calendar, Sparkles } from 'lucide-svelte';
	
	const announcements = [
		{
			id: 1,
			title: 'New Portfolio Tracking Features',
			content: 'We\'ve added real-time portfolio updates, advanced filtering, and export capabilities to help you better manage your investments.',
			date: '2024-01-15',
			type: 'feature',
			important: true
		},
		{
			id: 2,
			title: 'Discord Community Reaches 10K Members',
			content: 'Our Discord community has grown to over 10,000 active members! Join us for exclusive discussions and early access to new features.',
			date: '2024-01-10',
			type: 'community',
			important: true
		},
		{
			id: 3,
			title: 'IRR Calculator Enhanced',
			content: 'The IRR calculator now supports multiple cash flows and provides more detailed breakdowns of your investment returns.',
			date: '2024-01-05',
			type: 'update',
			important: false
		},
		{
			id: 4,
			title: 'New Education Courses Available',
			content: 'We\'ve launched three new courses: Advanced Deal Structuring, LP Relations Masterclass, and Portfolio Optimization Strategies.',
			date: '2023-12-28',
			type: 'education',
			important: false
		},
		{
			id: 5,
			title: 'Holiday Schedule',
			content: 'Our support team will have reduced hours during the holiday season. Response times may be slightly longer.',
			date: '2023-12-20',
			type: 'notice',
			important: false
		}
	];
	
	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<svelte:head>
	<title>Announcements - Leaving The Matrix</title>
	<meta name="description" content="Latest updates, features, and announcements from Leaving The Matrix" />
</svelte:head>

<div class="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
	<div class="max-w-4xl mx-auto">
		<div class="flex items-center gap-3 mb-8">
			<Bell class="w-8 h-8 text-purple-accent" />
			<h1 class="text-4xl sm:text-5xl font-bold">Announcements</h1>
		</div>
		
		<div class="space-y-6">
			{#each announcements as announcement}
				<article
					class="glass rounded-2xl p-6 sm:p-8 card-float glass-hover {announcement.important
						? 'border-l-4 border-cyan-accent'
						: ''}"
				>
					<div class="flex items-start justify-between mb-4">
						<div class="flex-1">
							<div class="flex items-center gap-3 mb-2">
								<h2 class="text-2xl font-bold">{announcement.title}</h2>
								{#if announcement.important}
									<span
										class="text-xs font-semibold text-cyan-accent bg-cyan-accent/20 px-2 py-1 rounded-full"
									>
										Important
									</span>
								{/if}
							</div>
							<div class="flex items-center gap-2 text-sm text-gray-400 mb-4">
								<Calendar class="w-4 h-4" />
								<span>{formatDate(announcement.date)}</span>
								<span>•</span>
								<span class="capitalize">{announcement.type}</span>
							</div>
						</div>
					</div>
					<p class="text-gray-300 leading-relaxed">{announcement.content}</p>
				</article>
			{/each}
		</div>
	</div>
</div>


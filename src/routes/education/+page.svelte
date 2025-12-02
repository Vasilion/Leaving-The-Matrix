<script lang="ts">
	import { BookOpen, TrendingUp, FileText, Users, CheckCircle } from 'lucide-svelte';
	
	const categories = [
		{ id: 'all', name: 'All Courses' },
		{ id: 'math', name: 'Venture Math' },
		{ id: 'structuring', name: 'Deal Structuring' },
		{ id: 'lp', name: 'LP Relations' },
		{ id: 'strategy', name: 'Strategy' }
	];
	
	const courses = [
		{
			id: 1,
			title: 'Venture Capital Fundamentals',
			category: 'math',
			description: 'Master the core concepts of venture capital investing',
			duration: '8 hours',
			lessons: 24,
			progress: 65,
			icon: BookOpen
		},
		{
			id: 2,
			title: 'IRR & MOIC Calculations',
			category: 'math',
			description: 'Deep dive into return metrics and financial modeling',
			duration: '6 hours',
			lessons: 18,
			progress: 40,
			icon: TrendingUp
		},
		{
			id: 3,
			title: 'Term Sheet Negotiation',
			category: 'structuring',
			description: 'Learn to structure and negotiate investment terms',
			duration: '10 hours',
			lessons: 30,
			progress: 0,
			icon: FileText
		},
		{
			id: 4,
			title: 'LP Reporting Best Practices',
			category: 'lp',
			description: 'Create compelling reports for Limited Partners',
			duration: '4 hours',
			lessons: 12,
			progress: 100,
			icon: Users
		},
		{
			id: 5,
			title: 'Portfolio Strategy & Diversification',
			category: 'strategy',
			description: 'Build and manage a balanced VC portfolio',
			duration: '12 hours',
			lessons: 36,
			progress: 25,
			icon: TrendingUp
		},
		{
			id: 6,
			title: 'Due Diligence Masterclass',
			category: 'structuring',
			description: 'Comprehensive guide to investment due diligence',
			duration: '14 hours',
			lessons: 42,
			progress: 0,
			icon: FileText
		}
	];
	
	let selectedCategory = $state('all');
	let filteredCourses = $derived(
		selectedCategory === 'all'
			? courses
			: courses.filter((c) => c.category === selectedCategory)
	);
</script>

<svelte:head>
	<title>Education Hub - Leaving The Matrix</title>
	<meta name="description" content="Learn VC fundamentals, deal structuring, and portfolio management" />
</svelte:head>

<div class="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl sm:text-5xl font-bold mb-4">Education Hub</h1>
			<p class="text-xl text-gray-400">Master venture capital investing with our comprehensive courses</p>
		</div>
		
		<div class="flex flex-wrap gap-3 mb-8 justify-center">
			{#each categories as category}
				<button
					onclick={() => selectedCategory = category.id}
					class="px-4 py-2 rounded-xl transition-all {selectedCategory === category.id
						? 'bg-gradient-to-r from-purple-accent to-cyan-accent text-white'
						: 'glass text-gray-300 hover:text-white'}"
				>
					{category.name}
				</button>
			{/each}
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredCourses as course}
				<div class="glass rounded-2xl p-6 card-float glass-hover">
					<div class="flex items-start justify-between mb-4">
						<div
							class="p-3 rounded-xl bg-purple-accent/20 text-purple-accent"
						>
							<svelte:component this={course.icon} class="w-6 h-6" />
						</div>
						{#if course.progress === 100}
							<CheckCircle class="w-5 h-5 text-cyan-accent" />
						{/if}
					</div>
					
					<h3 class="text-xl font-bold mb-2">{course.title}</h3>
					<p class="text-gray-400 text-sm mb-4">{course.description}</p>
					
					<div class="mb-4">
						<div class="flex items-center justify-between text-xs text-gray-400 mb-2">
							<span>Progress</span>
							<span>{course.progress}%</span>
						</div>
						<div class="h-2 bg-white/10 rounded-full overflow-hidden">
							<div
								class="h-full bg-gradient-to-r from-purple-accent to-cyan-accent rounded-full transition-all duration-500"
								style="width: {course.progress}%"
							></div>
						</div>
					</div>
					
					<div class="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-white/10">
						<span>{course.lessons} lessons</span>
						<span>{course.duration}</span>
					</div>
					
					<button class="w-full mt-4 btn-secondary text-sm py-2">
						{course.progress === 0 ? 'Start Course' : course.progress === 100 ? 'Review' : 'Continue'}
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>


<script lang="ts">
	import { Github, Twitter, Linkedin, Mail } from 'lucide-svelte';
	import logo from '../../assets/imgs/logo.png';
</script>

<footer class="glass border-t border-white/10 mt-auto">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
			<div>
				<a href="/" class="inline-block mb-4">
					<img 
						src={logo} 
						alt="Leaving The Matrix" 
						class="h-12 w-auto"
						loading="lazy"
					/>
				</a>
				<p class="text-gray-400 text-sm">
					Premium VC investment platform for tracking portfolios, calculating returns, and building community.
				</p>
			</div>
			
			<div>
				<h4 class="font-semibold mb-4">Platform</h4>
				<ul class="space-y-2 text-sm text-gray-400">
					<li><a href="/portfolio" class="hover:text-cyan-accent transition-colors">Portfolio Tracker</a></li>
					<li><a href="/calculators" class="hover:text-cyan-accent transition-colors">Calculators</a></li>
					<li><a href="/education" class="hover:text-cyan-accent transition-colors">Education</a></li>
				</ul>
			</div>
			
			<div>
				<h4 class="font-semibold mb-4">Resources</h4>
				<ul class="space-y-2 text-sm text-gray-400">
					<li><a href="/services" class="hover:text-cyan-accent transition-colors">Services</a></li>
					<li><a href="/announcements" class="hover:text-cyan-accent transition-colors">Announcements</a></li>
					<li><span class="text-gray-500">Documentation</span></li>
					<li><span class="text-gray-500">API</span></li>
				</ul>
			</div>
			
			<div>
				<h4 class="font-semibold mb-4">Connect</h4>
				<div class="flex gap-4">
					<button type="button" class="text-gray-400 hover:text-cyan-accent transition-colors" aria-label="GitHub">
						<Github class="w-5 h-5" />
					</button>
					<button type="button" class="text-gray-400 hover:text-cyan-accent transition-colors" aria-label="Twitter">
						<Twitter class="w-5 h-5" />
					</button>
					<button type="button" class="text-gray-400 hover:text-cyan-accent transition-colors" aria-label="LinkedIn">
						<Linkedin class="w-5 h-5" />
					</button>
					<button type="button" class="text-gray-400 hover:text-cyan-accent transition-colors" aria-label="Email">
						<Mail class="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
		
		<div class="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
			<p>&copy; 2025 <a href="https://www.unycross.com/" target="_blank" rel="noopener noreferrer" class="text-cyan-accent hover:text-purple-accent transition-colors">Unycross LLC</a>. All rights reserved.</p>
		</div>
	</div>
</footer>


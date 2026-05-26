<?php
/**
 * Akihabara Cyberpunk TCG Theme Front Page Template
 *
 * @package Akihabara_Cyberpunk
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

<div class="space-y-24 pb-20 bg-[#020208] text-white overflow-hidden relative">

	<!-- 1. Cyber Hero Spotlight Section -->
	<section class="relative min-h-[90vh] flex items-center bg-[#020208] overflow-hidden pt-12">
		
		<!-- Holographic lens flare effects -->
		<div class="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-neonpink/5 rounded-full filter blur-3xl opacity-60 animate-pulse pointer-events-none"></div>
		<div class="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] bg-neoncyan/5 rounded-full filter blur-3xl opacity-60 animate-pulse pointer-events-none"></div>

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-12 lg:pt-0">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
				
				<!-- Hero Left Column Text info -->
				<div class="lg:col-span-7 space-y-6 text-center lg:text-left">
					<div class="inline-flex items-center gap-1.5 bg-neonpink/10 border border-neonpink text-neonpink px-3.5 py-1 rounded-sm text-[10px] font-mono font-bold tracking-widest uppercase shadow-[0_0_8px_#ff007f30]">
						<i data-lucide="sparkles" class="w-3.5 h-3.5 animate-spin"></i> SYSTEM LINK // AKIHABARA DIRECT IMPORT
					</div>
					
					<h1 class="text-4xl sm:text-5xl lg:text-[4.25rem] font-display font-black tracking-tight leading-[1.02] italic uppercase text-white">
						PULL THE HOLY <span class="text-transparent bg-clip-text bg-gradient-to-r from-neonpink via-neonpurple to-neoncyan leading-none drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">GRAILS</span> DIRECTLY FROM TOKYO
					</h1>
					
					<p class="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-medium">
						No scaled packs, zero tampered shells. Akiba Hub delivers strictly factory-sealed booster packs, rare premium box-breaks, and exquisite anime collectibles direct from Akihabara, Tokyo. 100% authentic protocol locked.
					</p>

					<div class="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 font-mono">
						<a
							href="#"
							class="w-full sm:w-auto px-8 py-3.5 bg-neoncyan text-slate-950 font-bold text-xs tracking-widest rounded-md border border-neoncyan shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.7)] hover:bg-[#00d0e0] transition-all cursor-pointer flex items-center justify-center gap-2"
						>
							INITIALIZE SHOP CATALOGUE
							<i data-lucide="arrow-right" class="w-4 h-4"></i>
						</a>
						<a
							href="#about-section"
							class="w-full sm:w-auto px-8 py-3.5 bg-transparent text-neonpink hover:text-white border border-neonpink hover:bg-neonpink/10 transition-all font-bold text-xs tracking-widest rounded-md shadow-[0_0_8px_rgba(255,0,127,0.15)] cursor-pointer text-center"
						>
							READ OUR PROTOCOL ARCHIVE
						</a>
					</div>

					<!-- live details ribbon -->
					<div class="pt-6 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 border-t border-white/10 text-left font-mono text-[9px] text-gray-400">
						<div>
							<span class="font-extrabold text-neonpink text-xs block">&gt; 100.0%</span>
							<span>AUTHENTIC PROTOCOL</span>
						</div>
						<div>
							<span class="font-extrabold text-neoncyan text-xs block">&gt; EXPRESS AIR</span>
							<span>COURIER VAULT CONDUIT</span>
						</div>
						<div>
							<span class="font-extrabold text-neonyellow text-xs block">&gt; PURE TCG</span>
							<span>UNSCALED MINT PACKS</span>
						</div>
					</div>
				</div>

				<!-- Hero Right Column Visual cards image placeholder with tech frame -->
				<div class="lg:col-span-5 relative w-full h-[340px] sm:h-[420px] flex items-center justify-center">
					
					<div class="absolute w-[250px] h-[330px] bg-[#07071a] border-2 border-neonpink rounded-xl rotate-[-6deg] translate-x-[-30px] shadow-[0_0_20px_rgba(255,0,127,0.35)] overflow-hidden transition-all duration-300 hover:rotate-0 hover:translate-x-0">
						<div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
						<img
							src="https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=500&auto=format&fit=crop&q=80"
							alt="Pokemon TCG Boosters"
							referrerPolicy="no-referrer"
							class="w-full h-full object-cover filter brightness-90 shrink-0"
						/>
						<div class="absolute bottom-4 left-4 right-4 bg-[#0a0a28]/95 p-3 rounded border border-neonpink z-20">
							<span class="text-[9px] font-mono font-black text-neonpink tracking-widest block font-bold">POKÉMON ORIGINAL 151</span>
							<span class="text-[8px] text-gray-300 block mt-0.5 font-bold font-mono">SEALED JPN EDITION // SECURED</span>
						</div>
					</div>
					
					<div class="absolute w-[250px] h-[330px] bg-[#07071a] border-2 border-neoncyan rounded-xl rotate-[6deg] translate-x-[30px] translate-y-4 shadow-[0_0_20px_rgba(0,240,255,0.35)] overflow-hidden transition-all duration-300 hover:rotate-0 hover:translate-x-0">
						<div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
						<img
							src="https://images.unsplash.com/photo-1559897200-b0ebb809f72e?w=500&auto=format&fit=crop&q=80"
							alt="Anime Luffy PVC"
							referrerPolicy="no-referrer"
							class="w-full h-full object-cover filter brightness-90 shrink-0"
						/>
						<div class="absolute bottom-4 left-4 right-4 bg-[#0a0a28]/95 p-3 rounded border border-neoncyan z-20">
							<span class="text-[9px] font-mono font-black text-neoncyan tracking-widest block font-bold">LUFFY GEAR 5 STATUE</span>
							<span class="text-[8px] text-gray-300 block mt-0.5 font-bold font-mono">SCALE PVC MODEL // VAULTED</span>
						</div>
					</div>
					
				</div>

			</div>
		</div>
	</section>

	<!-- 2. Main different Categories Section -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="text-center space-y-2 mb-12">
			<span class="text-[9px] font-mono tracking-widest text-neoncyan font-bold uppercase py-1 bg-neoncyan/10 border border-neoncyan/30 px-3 rounded-md shadow-[0_0_8px_#00f0ff10]">
				MAIN_ROUTE: CATEGORY_QUERY_SELECTORS
			</span>
			<h2 class="text-2xl sm:text-4xl font-display font-bold text-white tracking-wider uppercase">
				CHOOSE YOUR INTERACTIVE LANE
			</h2>
			<p class="text-xs text-gray-400 max-w-md mx-auto leading-relaxed font-sans font-semibold text-center">
				Choose your collection portal below. On interactive select, you will be piped straight to our real-time inventory terminal with live availability.
			</p>
		</div>

		<!-- Categories cards grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
			<?php
			$categories = array(
				array(
					'title' => 'Pokémon English',
					'badge' => 'USA STANDARD',
					'emoji' => '⚡',
					'desc' => 'English print packs with original silver foils.',
					'img' => 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
					'accent' => 'border-neonpink/30 hover:border-neonpink bg-[#090924] hover:shadow-[0_0_15px_#ff007f40]'
				),
				array(
					'title' => 'Pokémon Japanese',
					'badge' => 'TOKYO DIRECT',
					'emoji' => '⛩️',
					'desc' => 'Pristine textured imports with iconic gold seals.',
					'img' => 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
					'accent' => 'border-neoncyan/30 hover:border-neoncyan bg-[#090924] hover:shadow-[0_0_15px_#00f0ff40]'
				),
				array(
					'title' => 'One Piece English',
					'badge' => 'USA STANDARD',
					'emoji' => '🏴‍☠️',
					'desc' => 'Manga themed game card packs in western print.',
					'img' => 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
					'accent' => 'border-neonpink/30 hover:border-neonpink bg-[#090924] hover:shadow-[0_0_15px_#ff007f40]'
				),
				array(
					'title' => 'One Piece Japanese',
					'badge' => 'TOKYO DIRECT',
					'emoji' => '⚔️',
					'desc' => 'Premium holo Japanese collectibles and box-toppers.',
					'img' => 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&auto=format&fit=crop&q=80',
					'accent' => 'border-neoncyan/30 hover:border-neoncyan bg-[#090924] hover:shadow-[0_0_15px_#00f0ff40]'
				),
				array(
					'title' => 'Action Figures',
					'badge' => 'PVC DIORAMA',
					'emoji' => '👾',
					'desc' => 'Categorized by anime. Beautiful scale sculptures.',
					'img' => 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
					'accent' => 'border-neonyellow/30 hover:border-neonyellow bg-[#090924] hover:shadow-[0_0_15px_#fefe0030]'
				)
			);

			foreach( $categories as $cat ) :
				?>
				<div class="group flex flex-col justify-between border rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] cursor-pointer <?php echo esc_attr($cat['accent']); ?>">
					<div class="relative aspect-4/3 overflow-hidden bg-slate-950 border-b border-white/5">
						<img
							src="<?php echo esc_url($cat['img']); ?>"
							alt="<?php echo esc_attr($cat['title']); ?>"
							referrerPolicy="no-referrer"
							class="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-300"
						/>
						<span class="absolute top-2 left-2 bg-[#050518] border border-neoncyan/50 text-neoncyan font-mono text-[8px] uppercase font-black px-1.5 py-0.5 rounded shadow-sm">
							<?php echo esc_html($cat['badge']); ?>
						</span>
						<span class="absolute bottom-2 right-2 text-xs bg-[#050518] text-white p-1 rounded-full border border-white/5 shadow-sm">
							<?php echo esc_html($cat['emoji']); ?>
						</span>
					</div>
					
					<div class="p-4 space-y-1 bg-[#050516]/90">
						<h3 class="text-xs font-black font-display text-white uppercase tracking-wider group-hover:text-neoncyan transition-colors">
							<?php echo esc_html($cat['title']); ?>
						</h3>
						<p class="text-[10px] text-gray-400 font-semibold leading-normal line-clamp-2">
							<?php echo esc_html($cat['desc']); ?>
						</p>
						<div class="text-[9px] text-neoncyan font-mono font-bold pt-3 flex items-center gap-1">
							&gt; LINK_PORTAL <i data-lucide="arrow-right" class="w-3 h-3 group-hover:translate-x-1 transition-transform"></i>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</section>

	<!-- 3. Featured Products Showcase Grid -->
	<section class="bg-[#05051a]/40 border-y border-white/5 py-16 backdrop-blur-md relative z-10">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			
			<div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neonpink font-bold uppercase block bg-neonpink/10 border border-neonpink/30 px-2.5 py-0.5 rounded-md inline-block shadow-[0_0_8px_#ff007f15]">
						AUTHENTICATION SECURED // SEAL PROTOCOL
					</span>
					<h2 class="text-2xl font-display font-medium text-white tracking-widest uppercase mt-2">
						FEATURED TOKYO PRODUCTS
					</h2>
				</div>
				<a
					href="#"
					class="text-xs font-mono font-bold text-neoncyan hover:text-neonpink transition-all flex items-center gap-1 cursor-pointer"
				>
					&gt;_ ACCESS FULL VAULT <i data-lucide="arrow-right" class="w-4 h-4"></i>
				</a>
			</div>

			<!-- Featured products render segment -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<?php
				$featured = array(
					array(
						'name' => 'Pokémon 151 Sealed Booster Pack (Japanese)',
						'price' => 12.99,
						'rating' => 4.9,
						'year' => '2023',
						'category' => 'Pokémon Japanese',
						'img' => 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80'
					),
					array(
						'name' => 'One Piece Romance Dawn Booster Pack (Japanese)',
						'price' => 8.50,
						'rating' => 4.8,
						'year' => '2022',
						'category' => 'One Piece Japanese',
						'img' => 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&auto=format&fit=crop&q=80'
					),
					array(
						'name' => 'Roronoa Zoro scale PVC Diorama figurine',
						'price' => 89.99,
						'rating' => 5.0,
						'year' => '2024',
						'category' => 'Action Figures',
						'img' => 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80'
					),
					array(
						'name' => 'Crown Zenith Elite Trainer Box (English Original)',
						'price' => 54.95,
						'rating' => 4.9,
						'year' => '2023',
						'category' => 'Pokémon English',
						'img' => 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80'
					)
				);

				foreach ( $featured as $f ) :
					?>
					<div class="group bg-[#040416] border border-white/10 rounded-xl overflow-hidden shadow-xl hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:border-neoncyan/50 duration-300 flex flex-col justify-between">
						
						<div class="relative aspect-4/3 overflow-hidden bg-[#03030c] border-b border-white/5">
							<img
								src="<?php echo esc_url($f['img']); ?>"
								alt="<?php echo esc_attr($f['name']); ?>"
								referrerPolicy="no-referrer"
								class="w-full h-full object-cover filter brightness-90 group-hover:scale-102 transition-all duration-300"
							/>
							<span class="absolute top-2 left-2 bg-[#05051c] border border-neoncyan/40 text-neoncyan font-mono text-[8px] font-bold px-2 py-0.5 rounded">
								<?php echo esc_html($f['year']); ?> SYSTEM_EDITION
							</span>
						</div>

						<div class="p-4 flex-1 flex flex-col justify-between bg-[#040416]/95">
							<div class="space-y-1">
								<span class="text-[8px] font-bold text-neonpink font-mono block tracking-widest uppercase">
									// <?php echo esc_html($f['category']); ?>
								</span>
								<h3 class="text-xs font-bold text-white line-clamp-1 truncate block font-sans">
									<?php echo esc_html($f['name']); ?>
								</h3>
							</div>

							<div class="pt-3 border-t border-white/5 mt-3 flex items-center justify-between font-mono">
								<span class="text-xs font-black text-neoncyan">$<?php echo number_format($f['price'], 2); ?></span>
								<a
									href="#"
									class="px-3.5 py-1.5 bg-transparent border border-neonpink text-neonpink hover:bg-neonpink hover:text-white rounded text-[10px] font-bold tracking-widest transition-all cursor-pointer shadow-[0_0_8px_#ff007f10] hover:shadow-[0_0_15px_#ff007f40]"
								>
									Instant Add
								</a>
							</div>
						</div>

					</div>
				<?php endforeach; ?>
			</div>

		</div>
	</section>

	<!-- 4. "About Us" founding saga section -->
	<section id="about-section" class="scroll-mt-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#070720]/80 border border-neonpink/30 hover:border-neonpink/60 rounded-xl p-6 md:p-10 shadow-[0_0_25px_rgba(255,0,127,0.08)] relative overflow-hidden backdrop-blur-md text-left">
			
			<div class="absolute bottom-0 right-0 translate-y-20 translate-x-20 w-48 h-48 bg-neonpink/5 rounded-full filter blur-2xl pointer-events-none"></div>
			
			<!-- left visual saga icon details -->
			<div class="md:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-[#0c0c2a] border border-neoncyan/30 rounded-lg">
				<span class="text-5xl animate-bounce">⛩️</span>
				<span class="text-xs font-mono font-bold text-neoncyan mt-3 block tracking-widest">TOKYO CENTRAL GRID</span>
				<span class="text-[9px] font-mono text-gray-400 mt-1 block">Akihabara Sotokanda Segment</span>
			</div>

			<!-- right content column -->
			<div class="md:col-span-8 space-y-4">
				<span class="text-[10px] font-mono tracking-widest text-[#00f0ff] font-bold">
					// LOG_ARCHIVE: AKIBA_HUB_SAGA_INIT
				</span>
				<h2 class="text-2xl font-display font-medium text-white tracking-widest uppercase leading-none">
					Direct Tokyo Pipelines to Your Deck
				</h2>
				<p class="text-xs text-gray-300 leading-relaxed font-sans font-medium">
					Founded by three lifelong collectors in Akihabara, Tokyo, Akiba Hub was built on a single hardware protocols: <span class="text-neonpink font-bold">strictly countering unboxed scalers and scaled single booster foils.</span> In the collectibles segment, pulls represent dreams. When packs are analyzed or weighed, those matrices are corrupted.
				</p>
				<p class="text-xs text-gray-300 leading-relaxed font-sans font-medium">
					That’s why Akiba Hub acts as a certified <span class="text-neoncyan font-bold font-mono">SEALED VAULT PIPELINE</span>. Every booster box, card pack, and high-fidelity anime figure is loaded directly from official publishers (The Pokémon Company, Bandai Namco Japan, and official European syndicates). Everything is packaged inside anti-static, clean glass cases before direct courier transmission. Yes, we collect under active validation blocks.
				</p>

				<div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5 font-mono text-[9px] text-[#00f0ff]">
					<div class="flex items-center gap-1.5 font-bold">
						<i data-lucide="shield-check" class="w-4 h-4 text-neongreen" />
						No weighted packs
					</div>
					<div class="flex items-center gap-1.5 font-bold">
						<i data-lucide="shield-check" class="w-4 h-4 text-neongreen" />
						Clean-air vault storage
					</div>
					<div class="flex items-center gap-1.5 font-bold">
						<i data-lucide="shield-check" class="w-4 h-4 text-neongreen" />
						Verify video packing
					</div>
				</div>
			</div>

		</div>
	</section>

	<!-- 5. "Contact Us" interactive form section -->
	<section id="contact-section" class="scroll-mt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="text-center space-y-2 mb-10">
			<span class="text-[9px] font-mono tracking-widest text-neonyellow font-bold uppercase py-1 bg-neonyellow/10 border border-neonyellow/30 px-3.5 rounded-md shadow-[0_0_8px_#fefe0020] flex justify-center items-center max-w-fit mx-auto self-center">
				SYS: STREAMS_SUPPORT_DESK
			</span>
			<h2 class="text-2xl sm:text-3xl font-display font-medium text-white tracking-widest uppercase">
				CONNECT TO THE LIVE TERMINAL
			</h2>
			<p class="text-xs text-gray-400 max-w-md mx-auto font-sans font-semibold text-center">
				Have queries regarding upcoming release waves, Japanese pull rate ratios, or wholesale case packages? Signal our collectors team immediately!
			</p>
		</div>

		<div class="bg-[#05051c]/80 border border-neoncyan/30 rounded-xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
			<div class="absolute top-0 right-0 w-32 h-32 bg-neoncyan/5 rounded-full filter blur-xl pointer-events-none" />
			
			<form onSubmit="return false;" class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 text-left">
				
				<div class="space-y-4 font-mono text-xs">
					<div>
						<label class="block text-[10px] text-[#00f0ff] uppercase mb-1 tracking-widest font-bold">Your Collector Name</label>
						<input
							type="text"
							required
							placeholder="e.g. Ash Ketchum"
							class="w-full bg-[#080828] border border-white/10 hover:border-white/20 focus:border-neoncyan rounded px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-neoncyan font-semibold transition-all"
						/>
					</div>
					<div>
						<label class="block text-[10px] text-[#00f0ff] uppercase mb-1 tracking-widest font-bold">Sub-link Mail Address</label>
						<input
							type="email"
							required
							placeholder="ash@pallet.com"
							class="w-full bg-[#080828] border border-white/10 hover:border-white/20 focus:border-neoncyan rounded px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-neoncyan font-semibold transition-all"
						/>
					</div>
				</div>

				<div class="font-mono text-xs">
					<label class="block text-[10px] text-[#00f0ff] uppercase mb-1 tracking-widest font-bold">Detailed Signal message</label>
					<textarea
						required
						rows="4"
						placeholder="Signal details regarding booster boxes, action figures, custom import request..."
						class="w-full bg-[#080828] border border-white/10 hover:border-white/20 focus:border-neoncyan rounded px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-neoncyan font-semibold transition-all"
					></textarea>
				</div>

				<div class="md:col-span-2 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
					<span class="text-[10px] text-neonpink font-bold flex items-center gap-1">
						<i data-lucide="mail" class="w-4 h-4 text-neonpink filter drop-shadow-[0_0_3px_#ff007f]"></i> EST RESPONSE LATENCY: &lt; 4 HOURS ENCRYPTED
					</span>
					
					<button
						type="submit"
						class="w-full sm:w-auto px-6 py-3 bg-neonpink hover:bg-neonpink/90 text-white border border-neonpink font-mono font-bold text-xs tracking-wider rounded shadow-[0_0_15px_#ff007f50] cursor-pointer transition-all flex items-center justify-center gap-1.5"
					>
						<i data-lucide="send" class="w-3.5 h-3.5"></i>
						BROADCAST SIGNAL OUT
					</button>
				</div>

			</form>
		</div>
	</section>

</div>

<?php
get_footer();

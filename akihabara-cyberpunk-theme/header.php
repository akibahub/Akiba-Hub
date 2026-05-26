<!DOCTYPE html>
<html <?php language_attributes(); ?> class="h-full bg-[#03030c] selection:bg-neonpink selection:text-white">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>
<body <?php body_class('h-full text-slate-200 antialiased font-sans flex flex-col min-h-screen relative'); ?>>
	<?php wp_body_open(); ?>

	<!-- Cyber scan line filter layer -->
	<div class="cyber-grid pointer-events-none fixed inset-0 z-50"></div>

	<!-- System top bar status line -->
	<div class="w-full bg-[#040411] border-b border-neonpink/20 py-2 px-4 text-[9px] font-mono tracking-widest text-gray-500 uppercase flex flex-col sm:flex-row justify-between items-center gap-1 z-40 relative">
		<div>
			<span class="text-neongreen font-extrabold animate-pulse">● SIGNAL STATUS: SECURE CONNECTION ACTIVE</span>
			<span class="text-gray-600 hidden md:inline ml-2">// VAULT LATENCY: &lt; 4.0ms LINK_SPEED</span>
		</div>
		<div class="flex items-center gap-4">
			<span>SECTOR DEY_ENV: CLOUD_RUN_CONTAINER</span>
			<span class="text-neoncyan font-bold">&gt; PORT_PORTAL: 3000</span>
		</div>
	</div>

	<!-- Main Navigation Header -->
	<header class="sticky top-0 z-40 w-full bg-[#03030cf0] border-b border-white/10 backdrop-blur-md transition-all">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-18">
				
				<!-- Logo Brand Grid link matching original SVG -->
				<div class="flex-shrink-0 flex items-center">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex items-center gap-2 group">
						<div class="relative w-8 h-8 rounded bg-[#ff007f15] border border-neonpink flex items-center justify-center shadow-[0_0_10px_rgba(255,0,127,0.25)] group-hover:shadow-[0_0_15px_rgba(255,0,127,0.5)] transition-all">
							<!-- Hologram visual blocks inside brand mark -->
							<div class="absolute w-2 h-2 bg-neonpink rounded-xs"></div>
							<div class="absolute -top-[1.5px] -right-[1.5px] w-1.5 h-1.5 bg-neoncyan rounded-full border border-[#03030c] animate-pulse"></div>
						</div>
						<div class="flex flex-col text-left">
							<span class="text-xs font-display font-black text-white italic tracking-widest leading-none">
								AKIBA // <span class="text-neonpink drop-shadow-[0_0_4px_#ff007f]">HUB</span>
							</span>
							<span class="text-[8px] font-mono font-bold text-gray-400 tracking-wider uppercase mt-[1.5px] leading-none">Akihabara Direct</span>
						</div>
					</a>
				</div>

				<!-- WP Dynamic Menu or Hardcoded Backup aligned to design -->
				<nav class="hidden md:flex items-center gap-6 font-mono text-[11px] font-bold">
					<?php
					if ( has_nav_menu( 'primary' ) ) {
						wp_nav_menu( array(
							'theme_location' => 'primary',
							'container'      => false,
							'menu_class'     => 'flex items-center gap-6',
							'items_wrap'     => '%3$s',
							'link_before'    => '<span class="text-gray-400 hover:text-white transition-colors">&gt; ',
							'link_after'     => '</span>',
						) );
					} else {
						// Elegant hardcoded fallback styled perfectly to original requirements
						?>
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-neonpink hover:text-white transition-all">&gt;_ HOME_TERMINAL</a>
						<a href="#about-section" class="text-gray-400 hover:text-neoncyan transition-all">&gt;_ DIRECT_SAGA</a>
						<a href="#contact-section" class="text-gray-400 hover:text-neonyellow transition-all">&gt;_ SUPPORT_TICKET</a>
						<?php
					}
					?>
				</nav>

				<!-- User actions with styled buttons -->
				<div class="flex items-center gap-4 font-mono text-[10px]">
					<div class="hidden sm:flex items-center gap-1.5 bg-[#0a0a2c] border border-white/5 py-1.5 px-3 rounded shadow-inner">
						<span class="w-1.5 h-1.5 rounded-full bg-neoncyan animate-ping"></span>
						<span class="text-gray-400 font-bold leading-none uppercase">PULL SECURED LEVEL // JPN MINT</span>
					</div>

					<!-- WooCommerce link or custom Cart count badge -->
					<a href="#" class="relative p-2 rounded bg-neonpink/10 hover:bg-neonpink border border-neonpink text-neonpink hover:text-white hover:shadow-[0_0_12px_rgba(255,0,127,0.6)] transition-all flex items-center gap-1.5">
						<i data-lucide="shopping-bag" class="w-4 h-4"></i>
						<span class="hidden sm:inline font-bold">SECURED_CELL</span>
						<span class="bg-white text-slate-900 border border-white text-[9px] font-black px-1.5 py-0.25 rounded">
							<?php 
							if ( class_exists( 'WooCommerce' ) ) {
								echo esc_html( WC()->cart->get_cart_contents_count() );
							} else {
								echo '0';
							}
							?>
						</span>
					</a>
				</div>

			</div>
		</div>
	</header>

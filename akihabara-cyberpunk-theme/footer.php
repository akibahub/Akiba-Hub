<?php
/**
 * Akihabara Cyberpunk TCG Theme Footer
 *
 * @package Akihabara_Cyberpunk
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>

	<!-- Main Cybersecurity Terminal Footer -->
	<footer class="mt-auto bg-[#020208] border-t border-white/10 relative overflow-hidden pt-16 pb-12">
		
		<!-- Subtle corner decorations -->
		<div class="absolute bottom-0 left-0 w-32 h-32 bg-neonpink/[0.02] rounded-full filter blur-xl pointer-events-none"></div>
		<div class="absolute top-0 right-0 w-32 h-32 bg-neoncyan/[0.02] rounded-full filter blur-xl pointer-events-none"></div>

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
			<div class="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-10 border-b border-white/5">
				
				<!-- Brand block descriptor -->
				<div class="md:col-span-4 space-y-4">
					<div class="flex items-center gap-2">
						<div class="w-6 h-6 rounded bg-[#ff007f10] border border-neonpink flex items-center justify-center">
							<div class="w-1.5 h-1.5 bg-neonpink rounded-xs"></div>
						</div>
						<span class="text-sm font-display font-black text-white italic tracking-widest uppercase mb-0">
							AKIBA // <span class="text-neonpink drop-shadow-[0_0_3px_#ff007f]">HUB</span>
						</span>
					</div>
					<p class="text-xs text-gray-400 font-sans font-medium leading-relaxed max-w-sm">
						Akiba Hub operates under active authorization protocols as a certified sealed vault pipeline. We extract directly from publisher presses inside Tokyo, defeating unboxed pack weighing algorithms.
					</p>
					<div class="pt-2 text-[9px] font-mono text-gray-500 uppercase flex items-center gap-1.5 font-bold">
						<i data-lucide="shield-check" class="w-4 h-4 text-neongreen" />
						Authentic Direct Tokyo Pipeline Verified
					</div>
				</div>

				<!-- Site dynamic or manual helper links column -->
				<div class="md:col-span-3 space-y-3 font-mono text-xs text-left">
					<h4 class="text-[10px] text-neoncyan uppercase font-bold tracking-widest border-b border-white/5 pb-1">
						// PROTOCOL_SECTOR_LINKS
					</h4>
					<div class="flex flex-col gap-2">
						<?php
						if ( has_nav_menu( 'footer' ) ) {
							wp_nav_menu( array(
								'theme_location' => 'footer',
								'container'      => false,
								'menu_class'     => 'flex flex-col gap-2',
								'items_wrap'     => '%3$s',
								'link_before'    => '<span class="text-gray-400 hover:text-white transition-all">&gt; ',
								'link_after'     => '</span>',
							) );
						} else {
							?>
							<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-gray-400 hover:text-white transition-all">&gt; Shop Catalogue</a>
							<a href="#about-section" class="text-gray-400 hover:text-white transition-all">&gt; Direct Tokyo Saga</a>
							<a href="#contact-section" class="text-gray-400 hover:text-white transition-all">&gt; Interactive Signal Support</a>
							<?php
						}
						?>
					</div>
				</div>

				<!-- Security parameters list -->
				<div class="md:col-span-5 space-y-3 font-mono text-xs text-left">
					<h4 class="text-[10px] text-neonpink uppercase font-bold tracking-widest border-b border-white/5 pb-1">
						// CRYPTO_VALIDATION_DASHBOARD
					</h4>
					<table class="w-full text-[10px] text-gray-400 table-fixed leading-relaxed">
						<tbody>
							<tr>
								<td class="py-1 font-bold text-gray-600 uppercase">SYS SECURE CODES:</td>
								<td class="text-right text-gray-300 select-all font-bold">AKIBA_VAULTS_AES_256</td>
							</tr>
							<tr>
								<td class="py-1 font-bold text-gray-600 uppercase">TRANSACTION FLOWS:</td>
								<td class="text-right text-neongreen font-extrabold flex items-center justify-end gap-1">
									<i data-lucide="shield" class="w-3.5 h-3.5 text-neongreen"></i> SANDBOX PAYPAL VERIFIED
								</td>
							</tr>
							<tr>
								<td class="py-1 font-bold text-gray-600 uppercase">TELEMETRY TIMESTAMP:</td>
								<td class="text-right text-neoncyan font-bold select-none whitespace-nowrap">
									<?php echo esc_html( akihabara_get_utc_clock() ); ?>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

			</div>

			<!-- Lower legal copy/details ribbon block -->
			<div class="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center font-mono text-[9px] text-gray-600 font-bold uppercase">
				<div>
					&copy; <?php echo date('Y'); ?> <span class="text-gray-400">Akiba Hub Tokyo Syndicate.</span> All rights reserved.
				</div>
				<div class="flex items-center gap-3">
					<span>WP-Theme Engine Version 1.0.0</span>
					<span class="w-1.5 h-1.5 rounded-full bg-neonpink"></span>
					<span>WordPress WooCommerce Conduit Integration API</span>
				</div>
			</div>

		</div>
	</footer>

	<?php wp_footer(); ?>
</body>
</html>

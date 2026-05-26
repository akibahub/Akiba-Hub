<?php
/**
 * Akihabara Cyberpunk TCG Theme Fallback Loop
 *
 * @package Akihabara_Cyberpunk
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>

<main class="flex-grow pt-28 pb-20 bg-[#020208] text-white">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		
		<?php if ( have_posts() ) : ?>
			
			<header class="mb-10 text-center space-y-2">
				<span class="text-[9px] font-mono tracking-widest text-neoncyan font-bold uppercase py-1 bg-neoncyan/10 border border-neoncyan/30 px-3.5 rounded">
					SYS: DATAPACK_SEQUENCES
				</span>
				<h1 className="text-3xl font-display font-black tracking-widest text-white uppercase mt-4">
					<?php 
					if ( is_home() && ! is_front_page() ) {
						single_post_title();
					} else {
						the_archive_title();
					}
					?>
				</h1>
			</header>

			<div class="space-y-8">
				<?php 
				while ( have_posts() ) : 
					the_post(); 
					?>
					<article id="post-<?php the_ID(); ?>" <?php post_class('p-6 bg-[#04041c] border border-white/10 rounded-xl hover:border-neonpink/50 transition-all duration-300 shadow-xl'); ?>>
						<header class="mb-4">
							<span class="text-[8px] font-mono text-neoncyan font-bold block uppercase mb-1">// <?php echo get_the_date(); ?></span>
							<h2 class="text-xl font-display font-bold text-white uppercase hover:text-neonpink transition-colors">
								<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
							</h2>
						</header>

						<div class="text-xs text-gray-300 leading-relaxed font-sans font-medium mb-6">
							<?php the_excerpt(); ?>
						</div>

						<footer class="font-mono text-[9px] text-neoncyan font-bold">
							<a href="<?php the_permalink(); ?>" class="hover:text-white transition-all">&gt;_ DECIPHER_DATA_PACKETS</a>
						</footer>
					</article>
				<?php endwhile; ?>
			</div>

			<div class="pt-10 flex gap-4 font-mono text-xs">
				<div class="nav-previous"><?php previous_posts_link( '&lt;- Return Previous Frame' ); ?></div>
				<div class="nav-next ml-auto"><?php next_posts_link( 'Advance Next Frame -&gt;' ); ?></div>
			</div>

		<?php else : ?>

			<div class="text-center py-20 bg-[#04041c] border border-white/10 rounded-xl p-6">
				<span class="text-4xl">📡</span>
				<h2 class="text-md font-bold font-mono text-white uppercase tracking-widest mt-4">No content sequences mapped</h2>
				<p class="text-xs text-gray-400 mt-2 font-medium">Please re-initiate search parameters inside home index terminals.</p>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="mt-6 inline-block px-5 py-2.5 bg-neonpink text-white font-mono text-[10px] font-black rounded shadow-[0_0_12px_rgba(255,0,127,0.4)] hover:bg-neonpink/95 transition-all uppercase tracking-widest">&gt;_ RETURN HOME</a>
			</div>

		<?php endif; ?>

	</div>
</main>

<?php
get_footer();

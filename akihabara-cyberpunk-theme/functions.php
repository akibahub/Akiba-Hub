<?php
/**
 * Akihabara Cyberpunk TCG Theme Functions
 *
 * @package Akihabara_Cyberpunk
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Setup default features for the cyberpunk theme
 */
function akihabara_cyberpunk_setup() {
	// Add support for custom title tag headers
	add_theme_support( 'title-tag' );

	// Add responsive block editor styling and feature feeds
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'align-wide' );

	// Enable support for Post Thumbnails on posts and pages
	add_theme_support( 'post-thumbnails' );

	// Support WooCommerce pipelines cleanly if installed
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );

	// Register Primary Cyberpunk Navigation Location
	register_nav_menus( array(
		'primary' => esc_html__( 'Cyber Grid Header Menu', 'akihabara-cyberpunk' ),
		'footer'  => esc_html__( 'Sector Footer Links', 'akihabara-cyberpunk' ),
	) );
}
add_action( 'after_setup_theme', 'akihabara_cyberpunk_setup' );

/**
 * Enqueue styles and scripts securely
 */
function akihabara_cyberpunk_scripts_and_styles() {
	// 1. Enqueue main core stylesheet
	wp_enqueue_style( 'akihabara-cyberpunk-style', get_stylesheet_uri(), array(), '1.0.0' );

	// 2. Enqueue Tailwind Play CDN for immediate responsive rendering
	wp_enqueue_style( 'tailwind-cdn-css', 'https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css', array(), '3.4.1' );

	// 3. Inline Tailwind configuration options directly mapped to match React colors
	$custom_tailwind_config = "
		tailwind.config = {
			theme: {
				extend: {
					colors: {
						neonpink: '#ff007f',
						neonpurple: '#9d4edd',
						neoncyan: '#00f0ff',
						neongreen: '#39ff14',
						neonyellow: '#fefe00',
					},
					fontFamily: {
						sans: ['Rajdhani', 'sans-serif'],
						mono: ['Share Tech Mono', 'monospace'],
						display: ['Orbitron', 'sans-serif'],
					}
				}
			}
		}
	";
	wp_add_inline_script( 'tailwind-cdn-js', $custom_tailwind_config, 'before' );
	wp_enqueue_script( 'tailwind-cdn-js', 'https://cdn.tailwindcss.com', array(), '3.4.1', false );

	// Add FontAwesome/Lucide compatible icons injection CDN safely
	wp_enqueue_script( 'lucide-icons-cdn', 'https://unpkg.com/lucide@latest', array(), '1.0.0', true );

	// Inline trigger script for rendering Lucide vectors on DOM loaded
	$lucide_trigger_script = "
		document.addEventListener('DOMContentLoaded', function() {
			if (typeof lucide !== 'undefined') {
				lucide.createIcons();
			}
		});
	";
	wp_add_inline_script( 'lucide-icons-cdn', $lucide_trigger_script );
}
add_action( 'wp_enqueue_scripts', 'akihabara_cyberpunk_scripts_and_styles' );

/**
 * Custom template routing help utilities
 */
function akihabara_get_utc_clock() {
	return gmdate('Y-m-d H:i:s') . ' UTC';
}

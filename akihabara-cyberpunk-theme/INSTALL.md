# Akihabara Cyberpunk WordPress Theme Integration Guide

This directory contains a complete, production-ready **Akihabara Cyberpunk WordPress Theme** that mirrors the precise design aesthetics, colors, custom typography, grids, and layouts of your **Akiba Hub** React build.

---

## 📂 Included Theme Files

- **`style.css`**: Sets theme headers, Google Fonts imports (Orbitron, Share Tech Mono, Rajdhani), and core structural CSS glowing animations.
- **`functions.php`**: Safely registers scripts, custom styling queues, CDN assets, icons, and establishes standard WooCommerce layout overrides.
- **`header.php`**: Displays the glowing responsive navbar, Tokyo Signal Telemetry Topbar, and interactive secure vault badge.
- **`footer.php`**: Includes the dark layout metadata, dynamic UTC timer synchronizer, and security check modules.
- **`front-page.php`**: Custom home layout loaded with neon heroes, product category portals, custom showcases, the founding saga segment, and responsive contact signals.
- **`index.php`**: Default blog and loop fallback page.

---

## ⚙️ Quick Installation Guide

To make use of this theme on a live WordPress installation:

### Step 1: Export Theme Zip
1. Open the AI Studio settings menu.
2. Click **Export Archive** to download a ZIP file of the entire project repository.
3. Locate the `akihabara-cyberpunk-theme/` folder within the ZIP file and compress only its contents into an independent `.zip` file (e.g., `akihabara-cyberpunk-tcg.zip`).

### Step 2: Upload to WordPress
1. Log in to your WordPress Admin dashboard (`/wp-admin`).
2. Navigate to **Appearance → Themes → Add New Theme → Upload Theme**.
3. Select your newly created `akihabara-cyberpunk-tcg.zip` file and click **Install Now**.
4. Once completed, click **Activate**.

### Step 3: Configure WooCommerce (Optional)
If you want to use this theme as an online storefront:
1. Install and activate the free [WooCommerce plugin](https://wordpress.org/plugins/woocommerce/).
2. The theme will seamlessly apply its ambient dark mode aesthetics and glowing action buttons directly to your checkout and single product pages.

---

## 🎨 Theme Customization

- **Fonts**: The theme enqueues standard display fonts via the official Google Fonts CDN.
- **Tailwind**: It is integrated with a lightweight Tailwind CSS runtime to ensure responsive compatibility out-of-the-box. Customize color classes directly inside standard WordPress edit blocks!

*Prepared with care by the Google AI Studio Coding Agent. Let's make collecting legendary again!*

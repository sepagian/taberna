import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetWebFonts,
	presetWind4,
	transformerCompileClass,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";

export default defineConfig({
	preflights: [
		{
			getCSS: () => `
:root {
  --background: oklch(0.9777 0.0041 301.4256);
  --foreground: oklch(0.3651 0.0325 287.0807);
  --card: oklch(1.0000 0 0);
  --card-foreground: oklch(0.3651 0.0325 287.0807);
  --popover: oklch(1.0000 0 0);
  --popover-foreground: oklch(0.3651 0.0325 287.0807);
  --primary: oklch(0.3651 0.0325 287.0807);
  --primary-foreground: oklch(0.9850 0.0010 106.4230);
  --secondary: oklch(0.8957 0.0265 300.2416);
  --secondary-foreground: oklch(0.3651 0.0325 287.0807);
  --muted: oklch(0.8906 0.0139 299.7754);
  --muted-foreground: oklch(0.3651 0.0325 287.0807);
  --accent: oklch(0.7889 0.0802 359.9375);
  --accent-foreground: oklch(0.3394 0.0441 1.7583);
  --destructive: oklch(0.4892 0.1466 24.3320);
  --destructive-foreground: oklch(0.9777 0.0041 301.4256);
  --border: oklch(0.8447 0.0226 300.1421);
  --input: oklch(0.9329 0.0124 301.2783);
  --ring: oklch(0.6104 0.0767 299.7335);
  --chart-1: oklch(0.6104 0.0767 299.7335);
  --chart-2: oklch(0.7889 0.0802 359.9375);
  --chart-3: oklch(0.7321 0.0749 169.8670);
  --chart-4: oklch(0.8540 0.0882 76.8292);
  --chart-5: oklch(0.7857 0.0645 258.0839);
  --sidebar: oklch(0.9554 0.0082 301.3541);
  --sidebar-foreground: oklch(0.3651 0.0325 287.0807);
  --sidebar-primary: oklch(0.2647 0.0297 287.0470);
  --sidebar-primary-foreground: oklch(0.9850 0.0010 106.4230);
  --sidebar-accent: oklch(0.7889 0.0802 359.9375);
  --sidebar-accent-foreground: oklch(0.3394 0.0441 1.7583);
  --sidebar-border: oklch(0.8719 0.0198 302.1690);
  --sidebar-ring: oklch(0.6104 0.0767 299.7335);
  --radius: 0.5rem;
  --shadow-x: 1px;
  --shadow-y: 2px;
  --shadow-blur: 5px;
  --shadow-spread: 1px;
  --shadow-opacity: 0.06;
  --shadow-color: hsl(0 0% 0%);
  --shadow-2xs: 1px 2px 5px 1px hsl(0 0% 0% / 0.03);
  --shadow-xs: 1px 2px 5px 1px hsl(0 0% 0% / 0.03);
  --shadow-sm: 1px 2px 5px 1px hsl(0 0% 0% / 0.06), 1px 1px 2px 0px hsl(0 0% 0% / 0.06);
  --shadow: 1px 2px 5px 1px hsl(0 0% 0% / 0.06), 1px 1px 2px 0px hsl(0 0% 0% / 0.06);
  --shadow-md: 1px 2px 5px 1px hsl(0 0% 0% / 0.06), 1px 2px 4px 0px hsl(0 0% 0% / 0.06);
  --shadow-lg: 1px 2px 5px 1px hsl(0 0% 0% / 0.06), 1px 4px 6px 0px hsl(0 0% 0% / 0.06);
  --shadow-xl: 1px 2px 5px 1px hsl(0 0% 0% / 0.06), 1px 8px 10px 0px hsl(0 0% 0% / 0.06);
  --shadow-2xl: 1px 2px 5px 1px hsl(0 0% 0% / 0.15);
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

.dark {
  --background: oklch(0.2166 0.0215 292.8474);
  --foreground: oklch(0.9053 0.0245 293.5570);
  --card: oklch(0.2544 0.0301 292.7315);
  --card-foreground: oklch(0.9053 0.0245 293.5570);
  --popover: oklch(0.2544 0.0301 292.7315);
  --popover-foreground: oklch(0.9053 0.0245 293.5570);
  --primary: oklch(0.7058 0.0777 302.0489);
  --primary-foreground: oklch(0.2166 0.0215 292.8474);
  --secondary: oklch(0.4604 0.0472 295.5578);
  --secondary-foreground: oklch(0.9053 0.0245 293.5570);
  --muted: oklch(0.2560 0.0320 294.8380);
  --muted-foreground: oklch(0.6974 0.0282 300.0614);
  --accent: oklch(0.3181 0.0321 308.6149);
  --accent-foreground: oklch(0.8391 0.0692 2.6681);
  --destructive: oklch(0.6875 0.1420 21.4566);
  --destructive-foreground: oklch(0.2166 0.0215 292.8474);
  --border: oklch(0.3063 0.0359 293.3367);
  --input: oklch(0.2847 0.0346 291.2726);
  --ring: oklch(0.7058 0.0777 302.0489);
  --chart-1: oklch(0.7058 0.0777 302.0489);
  --chart-2: oklch(0.8391 0.0692 2.6681);
  --chart-3: oklch(0.7321 0.0749 169.8670);
  --chart-4: oklch(0.8540 0.0882 76.8292);
  --chart-5: oklch(0.7857 0.0645 258.0839);
  --sidebar: oklch(0.1985 0.0200 293.6639);
  --sidebar-foreground: oklch(0.9053 0.0245 293.5570);
  --sidebar-primary: oklch(0.7058 0.0777 302.0489);
  --sidebar-primary-foreground: oklch(0.2166 0.0215 292.8474);
  --sidebar-accent: oklch(0.3181 0.0321 308.6149);
  --sidebar-accent-foreground: oklch(0.8391 0.0692 2.6681);
  --sidebar-border: oklch(0.2847 0.0346 291.2726);
  --sidebar-ring: oklch(0.7058 0.0777 302.0489);
  --font-sans: Geist, sans-serif;
  --font-serif: Instrument Serif, ui-serif, serif;
  --font-mono: JetBrains Mono, ui-monospace, monospace;
  --radius: 0.5rem;
  --shadow-x: 1px;
  --shadow-y: 2px;
  --shadow-blur: 5px;
  --shadow-spread: 1px;
  --shadow-opacity: 0.06;
  --shadow-color: hsl(0 0% 0%);
  --shadow-2xs: 1px 2px 5px 1px hsl(0 0% 0% / 0.03);
  --shadow-xs: 1px 2px 5px 1px hsl(0 0% 0% / 0.03);
  --shadow-sm: 1px 2px 5px 1px hsl(0 0% 0% / 0.06), 1px 1px 2px 0px hsl(0 0% 0% / 0.06);
  --shadow: 1px 2px 5px 1px hsl(0 0% 0% / 0.06), 1px 1px 2px 0px hsl(0 0% 0% / 0.06);
  --shadow-md: 1px 2px 5px 1px hsl(0 0% 0% / 0.06), 1px 2px 4px 0px hsl(0 0% 0% / 0.06);
  --shadow-lg: 1px 2px 5px 1px hsl(0 0% 0% / 0.06), 1px 4px 6px 0px hsl(0 0% 0% / 0.06);
  --shadow-xl: 1px 2px 5px 1px hsl(0 0% 0% / 0.06), 1px 8px 10px 0px hsl(0 0% 0% / 0.06);
  --shadow-2xl: 1px 2px 5px 1px hsl(0 0% 0% / 0.15);
}

html, body {
	background-color: var(--background)
}
`,
		},
	],
	safelist: ["animate-*", "transition-*", "scale-*"],
	shortcuts: {
		"heading-1": "scroll-m-20 text-4xl tracking-tight text-balance",
		"heading-2":
			"scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
		"heading-3": "scroll-m-20 text-2xl font-semibold tracking-tight",
		"heading-4": "scroll-m-20 text-xl font-semibold tracking-tight",
		"heading-5": "scroll-m-20 text-lg font-semibold tracking-tight",
		"paragraph-1": "leading-6",
	},
	theme: {
		colors: {
			background: "var(--background)",
			foreground: "var(--foreground)",
			card: "var(--card)",
			"card-foreground": "var(--card-foreground)",
			popover: "var(--popover)",
			"popover-foreground": "var(--popover-foreground)",
			primary: "var(--primary)",
			"primary-foreground": "var(--primary-foreground)",
			secondary: "var(--secondary)",
			"secondary-foreground": "var(--secondary-foreground)",
			muted: "var(--muted)",
			"muted-foreground": "var(--muted-foreground)",
			accent: "var(--accent)",
			"accent-foreground": "var(--accent-foreground)",
			destructive: "var(--destructive)",
			"destructive-foreground": "var(--destructive-foreground)",
			border: "var(--border)",
			input: "var(--input)",
			ring: "var(--ring)",
			"chart-1": "var(--chart-1)",
			"chart-2": "var(--chart-2)",
			"chart-3": "var(--chart-3)",
			"chart-4": "var(--chart-4)",
			"chart-5": "var(--chart-5)",
			sidebar: "var(--sidebar)",
			"shadow-sm": "var(--shadow-sm)",
		},
	},
	presets: [
		presetWind4({
			preflights: {
				reset: false,
			},
			dark: "class",
		}),
		presetAttributify(),
		presetIcons(),
		presetTypography(),
		presetWebFonts({
			provider: "google",
			fonts: {
				sans: ["Geist:400,500,600,700,800"],
				serif: "Instrument Serif",
			},
		}),
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
		transformerCompileClass(),
	],
});

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // enable dark mode via `class`
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			bajrang: {
  				brand: '#7B1E3A',
  				accent: '#EFB700',
  				secondary: '#005B96',
  				bg: '#F8FAFC',
  				surface: '#FFFFFF',
  				surfaceAlt: '#F1F5F9',
  				text: '#1E293B',
  				textSecondary: '#475569',
  				muted: '#94A3B8',
  				success: '#16A34A',
  				warning: '#F59E0B',
  				danger: '#DC2626',
  				info: '#0284C7',
  				border: '#E2E8F0',
  				divider: '#CBD5E1',
  				shadow: 'rgba(0, 0, 0, 0.1)',
  				hover: '#F3F4F6',
  				active: '#E2E8F0',
  				focus: '#3B82F6'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			brand: [
  				'Poppins',
  				'Roboto',
  				'sans-serif'
  			],
  			heading: [
  				'Merriweather',
  				'serif'
  			]
  		},
  		boxShadow: {
  			soft: '0 2px 10px rgba(0,0,0,0.08)',
  			gold: '0 0 10px #FFD700'
  		},
  		borderRadius: {
  			xl: '1rem',
  			lg: '0.75rem',
  			md: '0.5rem',
  			sm: '0.25rem'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

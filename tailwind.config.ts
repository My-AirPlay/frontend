/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

export default {
	darkMode: ['class'],
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			backgroundImage: {
				'custom-gradient': 'linear-gradient(to bottom, #1B2128, #1B21281A)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
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
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				custom: {
					background: '#2F3133',
					banner_bg: '#484848',
					primary: {
						DEFAULT: '#FE6902'
					},
					'profile-btn': '#1B2128',
					link: '#F1E4E7',
					auth_stroke: '#4D4D4D',
					footer_border: '#A6A6A6',
					registration_link: '#7B7B7B',
					input_dark: '#383838',
					input_light: '#4C4C4D',
					'icon-btn-border': '#FCFCFC',
					'check-box': '#505050',
					'sidebar-stroke': '#2F363E',
					sidebar: '#303030',
					'page-bg': '#121212',
					'hero-card': '#292525',
					'features-card': '#2D2929',
					error: '#EB5757',
					'dark-blue': '#1B1C31',
					dot: '#E0E0E0',
					'footer-stroke': '#404444',
					'sidebar-inactive': '#7B7B7B',
					'mobile-nav': '#252525',
					'edit-modal': '#505050',
					'profile-icon': '#B0B0B0',
					seperator: '#393939',
					'step-inactive': '#EFEFF0',
					'step-text': '#6C6E76',
					'step-line': '#A0A3B2',
					dashboard: {
						card: '#11161C',
						'card-stroke': '#A5A1A1'
					},
					success: '#1ED760',
					'dropdown-text': '#9F9F9F',
					'dropdown-bg': '#1D2531',
					'notification-bg': '#11171D',
					'analytics-border': '#808080',
					'engagement-boder': '#D9D9D9',
					'engagement-bg': '#130D1B',
					'analytics-table': '#171717',
					'age-range-border': '#1C1C1C',
					'analytics-white': 'rgba(255,255,255,0.02)',
					'faq-border': '#282726',
					'faq-text': '#949391',
					'tutorial-card': '#2D2D2D',
					'tutorial-border': '#575757',
					'uploader-text': '#C1C1C1',
					'notification-close': '#A6A4AD',
					'media-modal': '#222222',
					'media-time': '#333333',
					'issues-border': '#454545',
					'issues-card': '#363636',
					'issues-card-border': '#3E3E3E'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontSize: {
				10: '10px',
				60: '60px',
				64: '64px',
				40: '40px',
				25: '25px',
				28: '28px',
				30: '30px',
				90: '90px',
				14: '14px',
				50: '50px',
				80: '80px',
				15: '15px'
			},
			maxWidth: {
				778: '778px',
				'auth-card': '603px',
				'icon-btn': '158px',
				page: '1343px',
				sidebar: '106px',
				'preview-width': '961px',
				profile: '835.34px'
			},
			fontFamily: {
				'plus-jakarta-sans': ['var(--font-jakarta-sans)'],
				'noto-sans': ['var(--font-noto-sans)'],
				rubik: ['var(--font-rubik)'],
				roboto: ['var(--font-roboto)'],
				poppins: ['var(--font-poppins)'],
				manrope: ['var(--font-manrope)'],
				inter: ['var(---font-inter)']
			},
			boxShadow: {
				'auth-card': '-8px 4px 5px rgba(0,0,0,0.24)'
			},
			minHeight: {
				'auth-card': '796px'
			},
			height: {
				'auth-btn': '75px'
			},
			minWidth: {
				sidebar: '106px'
			},
			screens: {
				mid: '900px'
			},
			keyframes: {
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' }
				},
				marquee: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				},
				'fade-in-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				float: {
					'0%': { transform: 'translateY(0px) scale(1)' },
					'100%': { transform: 'translateY(-20px) scale(1.05)' }
				}
			},
			animation: {
				'caret-blink': 'caret-blink 1.25s ease-out infinite',
				marquee: 'marquee 40s linear infinite',
				'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
				float: 'float 6s ease-in-out infinite alternate'
			}
		}
	},
	plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')]
} satisfies Config;

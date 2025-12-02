# Leaving The Matrix - VC Investment Platform

A premium, production-ready SvelteKit web application for tracking VC investments, calculating returns, and building a community around venture capital.

## Features

- **Portfolio Tracker**: Monitor your VC investments with real-time performance metrics
- **Calculators**: IRR, MOIC, and exit scenario modeling tools
- **Forum**: Community discussions with upvoting and threaded replies
- **Education Hub**: Comprehensive courses on VC fundamentals
- **Services**: Deal sourcing, due diligence, and portfolio management services
- **Announcements**: Stay updated with platform news and features
- **Discord Integration**: Connect with the community

## Tech Stack

- **SvelteKit** with Svelte 5 (runes)
- **TypeScript** for type safety
- **Tailwind CSS** v3.4+ with custom glassmorphism utilities
- **Lucide Svelte** for icons
- **TipTap** for rich text editing (ready for forum implementation)

## Design System

- **Dark Mode Only**: Gradient background (#0f0f1a → #1a1a2e)
- **Glassmorphism**: Backdrop blur effects with semi-transparent cards
- **Accent Colors**: Purple (#9d4edd) and Cyan (#00ffc6)
- **Typography**: Inter font family
- **Animations**: Smooth transitions and hover effects

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd leaving-the-matrix
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable components
│   └── stores/         # Svelte stores (portfolio data)
├── routes/
│   ├── +layout.svelte  # Root layout
│   ├── +page.svelte    # Homepage
│   ├── portfolio/      # Portfolio tracker
│   ├── calculators/    # Financial calculators
│   ├── forum/          # Community forum
│   ├── education/      # Education hub
│   ├── services/       # Services page
│   └── announcements/  # Announcements page
└── app.css             # Global styles
```

## Key Features

### Portfolio Tracker
- Add/remove holdings
- Real-time ROI calculations
- Progress tracking
- LocalStorage persistence
- Beautiful card-based UI matching VC investment dashboards

### Calculators
- **IRR Calculator**: Calculate Internal Rate of Return with multiple cash flows
- **MOIC Calculator**: Multiple on Invested Capital calculations
- **Exit Modeler**: Model exit scenarios with ownership percentages

### Forum
- Thread-based discussions
- Upvote/downvote system
- Category filtering
- Reply threading (ready for implementation)

### Education Hub
- Course cards with progress tracking
- Category filtering
- Course completion status

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- `purple-accent`: #9d4edd
- `cyan-accent`: #00ffc6
- `dark-bg`: #0f0f1a
- `dark-bg2`: #1a1a2e

### Glassmorphism
Custom utilities in `src/app.css`:
- `.glass`: Base glassmorphism effect
- `.glass-hover`: Hover effects
- `.card-float`: Floating card shadows

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT

## Contributing

This is a production-ready template. Feel free to fork and customize for your needs.

---

Built with ❤️ using SvelteKit


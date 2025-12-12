# 🌌 Space-Themed CS Portfolio

A stunning, interactive personal portfolio website featuring space-themed design with advanced animations, glassmorphism effects, and 3D interactions inspired by Apple's iOS 16+ design language.

## ✨ Features

### 🎨 Design & Aesthetics
- **Black & White Theme**: Premium monochromatic design with pure black background (#000000) and pristine white accents
- **Glassmorphism Effects**: Beautiful frosted glass (liquid glass) components with:
  - Multi-layered backdrop blur (up to 30px)
  - Transparent backgrounds with smooth transitions
  - Inset glow effects for depth
  - Smooth hover animations with enhanced glass clarity
- **3D Effects**: Perspective transforms, flip animations, and layered shadows
- **High-Quality Resolution**: All components optimized for crisp, pixel-perfect rendering

### 🚀 Interactive Animations
- **Animated Starfield**: 200+ twinkling stars with varying opacities and durations
- **Shooting Stars**: Dynamic comet trails moving across the viewport
- **Orbiting Planets**: Multiple planets with different orbit sizes and speeds
- **Nebula Clouds**: Floating gradient clouds with continuous animations
- **Cosmic Dust**: Particle effects floating throughout the page
- **Parallax Scrolling**: Depth and immersion effects on scroll
- **Smooth Transitions**: All elements transition smoothly with cubic-bezier easing

### 📱 Responsive Design
- Mobile-first approach with breakpoints for all device sizes
- Touch-friendly interactive elements
- Optimized performance on all devices
- Smart hiding of heavy animations on mobile

### 🎯 Core Sections

#### Hero Section
- Typewriter effect for the main name/title
- Rotating role switcher with fade transitions
- Animated CTA buttons with glassmorphic liquid glass effect
- Scroll indicator with animated arrows
- Orbiting planets surrounding the content

#### About Me Section
- Personal introduction with parallax effects
- Achievement constellation points
- Glassmorphic achievement cards
- Interactive cards that respond to hover
- Decorative constellation lines

#### Skills & Technologies
- Interactive tab switcher (Languages, Frameworks, Tools)
- Skill cards with animated progress bars
- Glassmorphic design with backdrop blur
- Glowing progress bar indicators
- Smooth category transitions
- Floating planet decorations

#### Projects Showcase
- 3D flip card animations on hover
- Glassmorphic project cards with dual sides:
  - **Front**: Image/icon, title, and tech tags
  - **Back**: Detailed description, links, and full tech stack
- Particle effects on card interaction
- Floating asteroid decorations
- Responsive grid layout

#### Contact Section
- Glassmorphic form inputs with enhanced focus states
- Liquid glass social media links
- Contact information cards
- Animated comet trail effects
- Form submission feedback

#### Navigation
- Sticky header with scroll detection
- Active section indicator
- Smooth navigation with scroll-behavior
- Glassmorphic liquid glass button styling
- Dynamic underlines and decorative lines

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with Advanced Features:
  - CSS Animations & Keyframes
  - Backdrop Filters & Glassmorphism
  - CSS Grid & Flexbox
  - CSS Custom Properties (Variables)
  - 3D Transforms & Perspective
- **Font**: Google Sans (Roboto fallback)

## 🎬 Animation Features

### Advanced Effects
- **Typewriter Animation**: Smooth character-by-character typing effect
- **Liquid Glass Transitions**: Smooth morphing between glass states
- **3D Flip Cards**: Smooth Y-axis rotation with perspective
- **Particle Systems**: Multiple particle types with varied durations
- **Shimmer Effects**: Animated gradient highlights
- **Glow Pulses**: Breathing glow effects on interactive elements
- **Orbit Mechanics**: Complex orbital paths with proper perspective
- **Scroll Reveal**: Elements animate in as they come into view

### CSS Features Used
- `backdrop-filter` with `blur()` for glassmorphism
- `transform: perspective()` for 3D effects
- `animation` with cubic-bezier timing functions
- `box-shadow` with multiple layers for depth
- `mix-blend-mode` for advanced blending
- `clip-path` for curved elements
- `inset` box-shadows for inner glows

## 🎯 Performance Optimizations

- Hardware-accelerated transforms
- Optimized animation timing (60fps target)
- Efficient intersection observers for scroll reveals
- Lazy animation initialization
- Minimal DOM repaints
- CSS-based animations (GPU accelerated)

## 📱 Responsive Breakpoints

- **Desktop**: Full animations and effects (1024px+)
- **Tablet**: Optimized layouts and reduced animations (768px-1023px)
- **Mobile**: Essential animations only, touch-optimized (< 768px)

## 🚀 Getting Started

### Installation

```bash
cd newPortfolioWebsite
npm install
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 📝 Customization

### Update Personal Information
Edit the following components to add your information:
- `src/components/Hero.tsx` - Name, title, and description
- `src/components/About.tsx` - Personal bio and achievements
- `src/components/Skills.tsx` - Your skills and technologies
- `src/components/Projects.tsx` - Your project showcase
- `src/components/Contact.tsx` - Contact information and social links

### Customize Colors & Theme
Modify CSS variables in `src/styles/globals.css`:
```css
:root {
  --primary-black: #000000;
  --primary-white: #ffffff;
  --accent-light: #f0f0f0;
  --accent-dark: #1a1a1a;
  --glow-white: #e8e8e8;
  --shadow-color: rgba(255, 255, 255, 0.1);
}
```

### Adjust Animations
All animation durations and effects are customizable in individual component CSS files.

## 🌟 Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers with backdrop-filter support

## 📦 File Structure

```
src/
├── components/
│   ├── StarBackground.tsx      # Background with stars, nebulas
│   ├── Navigation.tsx           # Top navigation bar
│   ├── Hero.tsx                 # Landing section
│   ├── About.tsx                # About me section
│   ├── Skills.tsx               # Skills showcase
│   ├── Projects.tsx             # Project portfolio
│   ├── Contact.tsx              # Contact & social links
│   └── [Component].css          # Individual component styles
├── styles/
│   └── globals.css              # Global styles & animations
├── App.tsx                       # Main App component
├── App.css                       # App-level styles
└── main.tsx                      # Entry point
```

## 🎨 Glassmorphism Implementation

The portfolio uses advanced CSS techniques to achieve the "liquid glass" effect:

1. **Backdrop Blur**: `backdrop-filter: blur(20px-30px)` for frosted glass effect
2. **Transparency**: `rgba(255, 255, 255, 0.08-0.25)` for subtle visibility
3. **Border Glow**: `border: 1px solid rgba(255, 255, 255, 0.2-0.5)` for edge definition
4. **Shadow Layers**: Multiple box-shadows for depth and dimension
5. **Inset Glow**: `inset 0 0 20px rgba(255, 255, 255, 0.1)` for inner light

## 🔧 Advanced CSS Features

- **Mix-blend-mode**: Screen mode for nebula effects
- **Backdrop-filter**: Chrome, Firefox, Safari, Edge support
- **CSS Custom Properties**: Dynamic theming capability
- **Perspective transforms**: 3D depth effects
- **Intersection Observer**: Smart animation triggering

## 🌐 Deployment

Ready to deploy on:
- Vercel
- Netlify
- GitHub Pages
- Any static host (run `npm run build` first)

## 📄 License

Free to use and modify for personal portfolio purposes.

## 🎉 Credits

- Inspired by Apple's iOS 16+ design language
- Space theme with cosmic animations
- Font: Google Sans (Roboto)

---

**Built with ❤️ using React, TypeScript, and CSS3 Magic** ✨

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

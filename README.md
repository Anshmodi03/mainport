# Karthik Mudunuri Portfolio - JavaScript Version

This is the JavaScript version of Karthik Mudunuri's portfolio website, converted from TypeScript with all external dependencies hardcoded to avoid @ imports and UI library dependencies.

## Features

- **Modern React Application**: Built with React 18 and modern JavaScript
- **3D Animations**: Interactive Three.js scenes with particle systems
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for page transitions and interactions
- **Hardcoded Components**: All UI components are hardcoded, no external UI library dependencies
- **No @ Imports**: All imports use relative paths, no @ shortcuts

## Tech Stack

- **Frontend**: React, JavaScript (ES6+)
- **Styling**: Tailwind CSS with custom CSS variables
- **Animations**: Framer Motion, Three.js
- **Build Tool**: Vite
- **Routing**: Wouter (lightweight routing)
- **Icons**: Lucide React
- **State Management**: React Query for data fetching

## Project Structure

```
javascript-one/
├── src/
│   ├── components/
│   │   ├── ui/                 # Hardcoded UI components
│   │   ├── hero-section.jsx    # Hero section with typing animation
│   │   ├── about-section.jsx   # About section with stats
│   │   ├── projects-section.jsx # Projects showcase
│   │   ├── skills-section.jsx  # Skills with progress bars
│   │   ├── contact-section.jsx # Contact form
│   │   ├── navigation.jsx      # Navigation component
│   │   └── three-d-scene.jsx   # 3D background scene
│   ├── hooks/
│   │   ├── use-scroll-animation.jsx # Scroll-triggered animations
│   │   ├── use-typing-animation.jsx # Typing effect
│   │   ├── use-toast.jsx       # Toast notifications
│   │   └── use-mobile.jsx      # Mobile detection
│   ├── lib/
│   │   └── utils.js           # Utility functions
│   ├── pages/
│   │   ├── home.jsx           # Home page
│   │   └── not-found.jsx      # 404 page
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

## Setup & Installation

1. **Navigate to the javascript-one directory**:
   ```bash
   cd javascript-one
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## Key Features

### Hardcoded Components
- **Button**: Custom button component with variants (primary, outline, ghost)
- **Input**: Styled input component with focus states
- **Textarea**: Custom textarea with resize handling
- **Label**: Form label component
- **Badge**: Pill-shaped badge component with variants

### Custom Hooks
- **useScrollAnimation**: Intersection Observer based scroll animations
- **useTypingAnimation**: Typewriter effect for text
- **useToast**: Toast notification system
- **useIsMobile**: Mobile device detection

### Animations
- **Hero Section**: Typing animation, mouse-following elements, parallax scrolling
- **About Section**: Animated statistics counters, skill cards
- **Projects Section**: Hover effects, staggered animations
- **Skills Section**: Animated progress bars, floating elements
- **Contact Section**: Form animations, social link hovers

### 3D Scene
- **Particle System**: 1000+ floating particles
- **Geometric Shapes**: Torus, Icosahedron, Octahedron, Dodecahedron
- **Mouse Interaction**: Camera follows mouse movement
- **Responsive**: Optimized for different screen sizes

## Color Scheme

The portfolio uses a dark theme with the following colors:
- **Primary**: #0F0F23 (Dark Navy)
- **Secondary**: #1A1A2E (Dark Purple)
- **Accent**: #E94560 (Bright Pink)
- **Background**: #16213E (Dark Blue)
- **Text**: #FFFFFF (White)

## Performance Optimizations

- **Lazy Loading**: Components load as needed
- **Optimized Animations**: Hardware accelerated CSS transforms
- **Efficient Re-renders**: Proper React optimization techniques
- **Compressed Assets**: Optimized images and fonts
- **Code Splitting**: Automatic code splitting with Vite

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Development

The project uses modern JavaScript features and follows best practices:
- **ES6+ Syntax**: Arrow functions, destructuring, async/await
- **React Hooks**: Functional components with hooks
- **CSS Variables**: Custom properties for theming
- **Responsive Design**: Mobile-first approach

## Contact

For questions or collaboration opportunities:
- **Email**: karthikmudunuri999@gmail.com
- **LinkedIn**: [linkedin.com/in/karthikmudunuri](https://www.linkedin.com/in/karthikmudunuri/)
- **GitHub**: [github.com/karthikmudunuri](https://github.com/karthikmudunuri)

## License

This project is open source and available under the [MIT License](LICENSE).
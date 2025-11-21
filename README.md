# Entropy AI Lab Website

A professional, modern website showcasing Entropy AI Lab's data-first approach to AI solutions.

## Overview

This website highlights the unique value propositions of Entropy AI Lab:

1. **Data-First Core Identity** - Built around data as the core service model
2. **Commitment to Raw Data Quality** - Strategic focus on managing high-quality raw data
3. **Dual Data Application Strategy** - Using quality data for both:
   - Training high-performance models with domain knowledge
   - Retrieval-Augmented Generation (RAG) applications

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations and transitions
- Interactive elements and hover effects
- Clean, professional aesthetic
- Optimized performance
- Smooth scrolling navigation

## Project Structure

```
entropy_website/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript interactions
└── README.md          # This file
```

## How to Run Locally

### Option 1: Python HTTP Server (Simplest)

```bash
cd entropy_website
python -m http.server 8000
```

Then open your browser to: `http://localhost:8000`

### Option 2: Using Node.js

If you have Node.js installed:

```bash
npx http-server -p 8000
```

### Option 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid, Flexbox, animations
- **Vanilla JavaScript** - Interactive features without dependencies
- **Google Fonts** - Inter font family

## Key Sections

1. **Hero Section** - Compelling introduction with animated data flow visualization
2. **Core Identity** - Establishes the data-first philosophy
3. **Data Quality** - Highlights commitment to raw data quality
4. **Dual Strategy** - Showcases the two application pathways (Model Training & RAG)
5. **Services** - Overview of offerings
6. **CTA Section** - Call-to-action for engagement
7. **Footer** - Company information and links

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #0ea5e9;
    --accent-color: #f59e0b;
    /* ... more colors */
}
```

### Content

Edit text directly in `index.html` or contact information in the footer.

### Animations

Adjust animation speeds and effects in `styles.css` and `script.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized CSS with minimal dependencies
- Efficient JavaScript with debounced scroll handlers
- Lazy loading ready for images
- Small bundle size

## Future Enhancements

Potential additions:
- Contact form with backend integration
- Blog section
- Case studies/portfolio
- Team page
- Dark mode toggle
- More interactive data visualizations

## License

© 2025 Entropy AI Lab. All rights reserved.

## Contact

For inquiries: contact@entropyailab.com

---

**Built with a Data-First approach** 🚀

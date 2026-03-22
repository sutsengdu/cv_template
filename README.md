# AI Resume Auto-Designer

A premium, high-performance CV builder built with React and Vite. Design professional resumes in seconds with real-time preview, custom color schemes, and stabilized PDF exports.

![Platform: Web](https://img.shields.io/badge/Platform-Web-blue?style=for-the-badge&logo=react)

## Previews

### Dashboard & Modern Theme
![Dashboard](C:\Users\sutse\.gemini\antigravity\brain\1b754f28-c167-4f2f-af09-adc56f28428c\default_dashboard_1774195671249.png)

### Creative & Professional Themes
<div align="center">
  <img src="C:\Users\sutse\.gemini\antigravity\brain\1b754f28-c167-4f2f-af09-adc56f28428c\creative_theme_preview_1774195718067.png" width="45%" />
  <img src="C:\Users\sutse\.gemini\antigravity\brain\1b754f28-c167-4f2f-af09-adc56f28428c\professional_theme_preview_1774195771742.png" width="45%" />
</div>

## Features

- **Multi-Theme Support**: Choose between **Modern**, **Professional**, and **Creative** layouts.
- **Custom Color Control**: 
  - Real-time **Accent Color** picker for highlights.
  - Custom **Text Color** selection for perfect readability.
- **Dynamic Paper Sizes**: Export to **A4, US Letter, A3, A5, Legal, or Tabloid**.
- **Mobile-Stabilized PDF Export**: High-fidelity PDF generation that remains perfectly aligned on both mobile and desktop.
- **Profile Integration**: Easy photo upload with automatic scaling and circular/rounded framing.
- **Real-time Live Preview**: See your changes instantly as you type.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/)
- **Styling**: Vanilla CSS with Glassmorphism UI

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/cv-template.git
   cd cv-template
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## PDF Export Stabilization

This project includes a custom stabilization layer for `html2canvas` to prevent common mobile rendering issues:
- Forces 1:1 render scale by stripping parent transforms during capture.
- Simulates desktop viewport widths for consistent A4/Letter ratios.
- Disables problematic `letterRendering` for crisp text on all devices.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---
Built with respect for professional job seekers.

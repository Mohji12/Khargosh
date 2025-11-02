# 3D Animated Photo Gallery 💖

A beautiful, interactive 3D photo gallery built with React and Three.js. Perfect for showcasing special memories with romantic descriptions and animations!

## Features

- ✨ **3D Animated Gallery**: Photos arranged in a 3D circle that slowly rotates
- 🎨 **Beautiful UI**: Modern gradient background with elegant styling
- 🖱️ **Interactive**: Hover effects and click interactions on photos
- 📱 **Responsive**: Works on desktop and mobile devices
- 🎭 **Smooth Animations**: Floating and rotation animations for a magical feel

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Your Photos**
   - Place your photos in the `public/photos/` directory
   - Name them: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.
   - Or update the `photos` array in `src/components/Gallery.js` with your photo paths

3. **Start the Development Server**
   ```bash
   npm start
   ```

4. **Open in Browser**
   - The app will automatically open at `http://localhost:3000`

## Customization

### Adding More Photos

Edit `src/components/Gallery.js` and update the `photos` array:

```javascript
const photos = [
  '/photos/your-photo1.jpg',
  '/photos/your-photo2.jpg',
  // ... add more photos
];
```

### Changing Gallery Layout

You can modify the gallery arrangement in `Gallery.js`:
- Change `radius` to adjust the circle size
- Modify the positioning logic to create different layouts (spiral, grid, etc.)

### Adjusting Animations

In `Gallery.js`, you can customize:
- Rotation speed: `groupRef.current.rotation.y = state.clock.elapsedTime * 0.1`
- Floating animation: `Math.sin(state.clock.elapsedTime + index) * 0.1`
- Auto-rotate speed: `autoRotateSpeed={0.5}` in `App.js`

### Styling

- Edit `src/App.css` to change colors, fonts, and layout
- Modify `src/index.css` for global styles
- Update the gradient background in `src/index.css`

## Technologies Used

- **React** - UI framework
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Three.js** - 3D graphics library
- **Framer Motion** - Animation library (available for future use)

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Tips

- Use high-quality photos for the best visual experience
- Recommended photo aspect ratio: 4:5 (portrait) or 3:4
- Photos are displayed at 2x2.5 units in 3D space
- The gallery automatically handles missing images with placeholders

Enjoy your beautiful 3D gallery! 💖

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository: `Mohji12/Khargosh`
4. Vercel will auto-detect it's a React app
5. Click "Deploy"
6. Your site will be live in minutes!

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts to deploy your project.

## GitHub Deployment

### Push to GitHub (if not done yet)

1. **Authenticate with GitHub:**
   ```bash
   # Option A: Use GitHub CLI (recommended)
   gh auth login
   
   # Option B: Use Personal Access Token
   git remote set-url origin https://YOUR_TOKEN@github.com/Mohji12/Khargosh.git
   ```

2. **Push your code:**
   ```bash
   git push -u origin main
   ```

### Troubleshooting GitHub Push

If you get authentication errors:

**Method 1: Use GitHub CLI**
```bash
# Install GitHub CLI if not installed
# Windows: winget install GitHub.cli
gh auth login
git push -u origin main
```

**Method 2: Use Personal Access Token**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` permissions
3. Use it as password when pushing

**Method 3: Use SSH**
```bash
git remote set-url origin git@github.com:Mohji12/Khargosh.git
git push -u origin main
```

## Repository

🔗 **GitHub:** https://github.com/Mohji12/Khargosh


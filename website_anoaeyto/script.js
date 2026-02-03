// Always scroll to top and disable scroll restoration (do this FIRST)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Check if we should scroll to projects section
if (sessionStorage.getItem('scrollToProjects') === 'true') {
    sessionStorage.removeItem('scrollToProjects');
    // Wait for page to load, then scroll to projects
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    });
} else {
    window.scrollTo(0, 0);
}

// ================= PERLIN NOISE GENERATION =================

const perlinCanvas = document.getElementById('perlinCanvas');
const perlinCtx = perlinCanvas.getContext('2d');

function resizePerlinCanvas() {
    perlinCanvas.width = window.innerWidth;
    perlinCanvas.height = window.innerHeight;
    generatePerlinNoise();
}

// Simple Perlin-like noise implementation
function generatePerlinNoise() {
    const imageData = perlinCtx.createImageData(perlinCanvas.width, perlinCanvas.height);
    const data = imageData.data;
    
    // Generate noise at multiple scales for Perlin-like effect
    for (let y = 0; y < perlinCanvas.height; y++) {
        for (let x = 0; x < perlinCanvas.width; x++) {
            const index = (y * perlinCanvas.width + x) * 4;
            
            // Combine multiple octaves of noise with better contrast
            let value = 0;
            let amplitude = 1;
            let frequency = 0.008; // Larger scale patterns
            
            for (let octave = 0; octave < 5; octave++) {
                const sampleX = x * frequency;
                const sampleY = y * frequency;
                
                // Simple noise function using sin/cos with more variation
                const noise = Math.sin(sampleX * 0.7 + octave) * Math.cos(sampleY * 0.7 + octave) +
                             Math.sin(sampleX * 1.3 + 50 + octave * 20) * Math.cos(sampleY * 0.9 + octave * 15) +
                             Math.sin(sampleX * 2.3 + octave * 10) * Math.sin(sampleY * 1.9 + octave * 25);
                
                value += noise * amplitude;
                amplitude *= 0.55;
                frequency *= 2.1;
            }
            
            // Normalize to 0-255 range with better contrast
            const normalizedValue = Math.max(0, Math.min(255, ((value + 2) / 4) * 255));
            
            data[index] = normalizedValue;     // R
            data[index + 1] = normalizedValue; // G
            data[index + 2] = normalizedValue; // B
            data[index + 3] = 255;             // A
        }
    }
    
    perlinCtx.putImageData(imageData, 0, 0);
}

resizePerlinCanvas();
window.addEventListener('resize', resizePerlinCanvas);

// Slowly animate the noise
let noiseOffset = 0;
function animateNoise() {
    noiseOffset += 0.001;
    if (noiseOffset > 1) {
        generatePerlinNoise();
        noiseOffset = 0;
    }
    requestAnimationFrame(animateNoise);
}
animateNoise();

// ================= DUST PARTICLES ANIMATION =================

const canvas = document.getElementById('dustCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth * 2; // Increase resolution
    canvas.height = window.innerHeight * 2;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(2, 2); // Scale context for high DPI
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * window.innerHeight;
        this.x = Math.random() * window.innerWidth * 0.4; // Start from left 40%
    }
    
    reset() {
        // Particles originate from left side - dispersed across left half
        const fromCorner = Math.random() < 0.4; // 40% from corner, 60% dispersed
        
        if (fromCorner) {
            // From left corner area (top-left quadrant)
            this.x = Math.random() * (window.innerWidth * 0.15);
            this.y = Math.random() * (window.innerHeight * 0.15);
        } else {
            // Dispersed along left half
            this.x = Math.random() * (window.innerWidth * 0.3);
            this.y = Math.random() * window.innerHeight;
        }
        
        this.size = Math.random() * 0.6 + 0.2; // Slightly larger range (0.2-0.8px)
        this.speedY = Math.random() * 0.35 + 0.12;
        this.speedX = Math.random() * 0.5 + 0.25; // Drift right
        this.opacity = Math.random() * 0.45 + 0.35; // (0.35-0.8)
        this.twinkle = Math.random() * Math.PI * 2;
        this.fadeIn = 0; // For wispy fade-in effect
    }
    
    update() {
        // Fade in when first appearing
        if (this.fadeIn < 1) {
            this.fadeIn += 0.02;
        }
        
        this.y += this.speedY;
        this.x += this.speedX;
        this.twinkle += 0.015;
        
        // Reset when out of bounds
        if (this.y > window.innerHeight || this.x > window.innerWidth) {
            this.reset();
        }
    }
    
    draw() {
        const twinkleOpacity = this.opacity * (0.6 + Math.sin(this.twinkle) * 0.4) * this.fadeIn;
        
        // Draw wispy, dispersed glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 15);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${twinkleOpacity * 0.25})`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${twinkleOpacity * 0.12})`);
        gradient.addColorStop(0.6, `rgba(255, 255, 255, ${twinkleOpacity * 0.04})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw softer particle core
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkleOpacity * 0.7})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles - more dispersed across screen
const particles = [];
const particleCount = 300; // More particles for better dispersion

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// ================= ENTER SCREEN FUNCTIONALITY =================

const enterScreen = document.getElementById('enterScreen');
const enterTitle = document.getElementById('enterTitle');
const mainContent = document.getElementById('mainContent');

let isTransitioning = false; // Prevent multiple clicks

// Force enter screen to be visible initially
enterScreen.style.opacity = '1';
enterScreen.style.visibility = 'visible';
enterScreen.style.pointerEvents = 'all';

// Check if page has been visited in this session
if (sessionStorage.getItem('visited') === 'true') {
    // Skip enter screen on reload/refresh
    enterScreen.style.display = 'none';
    mainContent.classList.add('visible');
    document.documentElement.classList.remove('no-scroll');
} else {
    // First visit - show enter screen
    enterScreen.style.display = 'flex';
    document.documentElement.classList.add('no-scroll');
    
    // Show text after dust has been visible for a moment
    setTimeout(() => {
        enterScreen.classList.add('show-text');
    }, 1500);
}

// Click on title - expand text, fade in background, transition to main site
enterTitle.addEventListener('click', () => {
    if (isTransitioning) return; // Prevent double-click glitch
    isTransitioning = true;
    
    // Step 1: Start expansion animation (1s) and background fade (1s starting at 0.3s)
    enterScreen.classList.add('expanding');
    
    // Step 2: Show main content BEFORE fading out enter screen for seamless swap
    setTimeout(() => {
        mainContent.classList.add('visible');
        document.documentElement.classList.remove('no-scroll');
        // Immediately after main content appears, fade out enter screen
        setTimeout(() => {
            enterScreen.classList.add('fade-out');
        }, 50);
    }, 1000); // Right when expansion completes
    
    // Step 3: Clean up enter screen (1.8s after click - after fade-out completes)
    setTimeout(() => {
        enterScreen.style.display = 'none';
        sessionStorage.setItem('visited', 'true');
    }, 1800);
});

// ================= PROJECTS GRID LOGIC =================

let showingAllProjects = false;

function toggleProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    
    showingAllProjects = !showingAllProjects;
    
    if (showingAllProjects) {
        projectsGrid.classList.add('show-all');
        seeMoreBtn.textContent = 'See Less';
    } else {
        projectsGrid.classList.remove('show-all');
        seeMoreBtn.textContent = 'See More';
        // Scroll to projects section
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
}

// Check if we need to show the "See More" button
function checkProjectsCount() {
    const projectItems = document.querySelectorAll('.project-item');
    const seeMoreContainer = document.getElementById('seeMoreContainer');
    
    if (projectItems.length > 6) {
        seeMoreContainer.style.display = 'block';
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', checkProjectsCount);

// ================= INTERSECTION OBSERVER FOR ANIMATIONS =================

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const aboutTextElements = document.querySelectorAll('.about-text p');
aboutTextElements.forEach(p => {
    observer.observe(p);
});

const aboutItems = document.querySelectorAll('.about-items .item');
aboutItems.forEach(item => {
    observer.observe(item);
});

// Observe gallery items for fade-in effect
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    observer.observe(item);
});

// ================= GALLERY =================

// Gallery images data
const galleryImages = [
    { src: 'images/gallery/Untitled.png', description: 'Abstract digital composition...' },
    { src: 'images/gallery/test3.png', description: 'Experimental 3D rendering...' },
    { src: 'images/gallery/flame.png', description: 'Particle simulation study...' },
    { src: 'images/gallery/Untitled_5.png', description: 'Minimalist design...' },
    { src: 'images/gallery/cubes.png', description: 'Isometric architectural visualization...' },
    { src: 'images/gallery/12_12_2025_10.png', description: 'Mixed media digital artwork...' },
    { src: 'images/gallery/unwritten_2.png', description: 'Typographic experimentation...' },
    { src: 'images/gallery/Untitled8.png', description: 'Surreal landscape...' }
];

// Gallery Modal
let currentGalleryIndex = 0;

function openGalleryModal(index) {
    currentGalleryIndex = index;
    const modal = document.getElementById('galleryModal');
    document.getElementById('galleryModalImage').src = galleryImages[index].src;
    modal.classList.add('active');
}

function closeGalleryModal(event) {
    const modal = document.getElementById('galleryModal');
    if (!event || event.target === modal || event.target.classList.contains('gallery-modal-close')) {
        modal.classList.remove('active');
    }
}

function nextGalleryImage(event) {
    event.stopPropagation();
    changeGalleryImage(1);
}

function previousGalleryImage(event) {
    event.stopPropagation();
    changeGalleryImage(-1);
}

function changeGalleryImage(dir) {
    const img = document.getElementById('galleryModalImage');
    img.classList.add('fade-out');
    setTimeout(() => {
        currentGalleryIndex = (currentGalleryIndex + dir + galleryImages.length) % galleryImages.length;
        img.src = galleryImages[currentGalleryIndex].src;
        img.classList.remove('fade-out');
    }, 300);
}
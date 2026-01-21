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

// Enter screen functionality - ensure it's visible first
const enterScreen = document.getElementById('enterScreen');
const enterButton = document.querySelector('.enter-button');
const mainContent = document.getElementById('mainContent');

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
}

enterButton.addEventListener('mouseenter', () => {
    enterScreen.classList.add('blur');
});

enterButton.addEventListener('mouseleave', () => {
    enterScreen.classList.remove('blur');
});

enterButton.addEventListener('click', () => {
    // Mark as visited when they click enter
    sessionStorage.setItem('visited', 'true');
    enterScreen.classList.add('hidden');
    mainContent.classList.add('visible');
    
    // Fully hide enter screen after animation completes
    setTimeout(() => {
        enterScreen.style.display = 'none';
        document.documentElement.classList.remove('no-scroll');
    }, 1400);
});

// Projects Grid Logic
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
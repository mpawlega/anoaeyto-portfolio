// Always scroll to top and disable scroll restoration (do this FIRST)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

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


//

// Projects carousel logic
let currentProject = 0;
const projectsContainer = document.getElementById('projectsContainer');
const totalProjects = document.querySelectorAll('.project-item').length;

function updateCarousel() {
    const offset = -currentProject * 100;
    projectsContainer.style.transform = `translateX(${offset}%)`;
    
    document.querySelectorAll('.project-item').forEach((item, index) => {
        if (index === currentProject) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function handleProjectClick(index, event) {
    if (event) event.stopPropagation();
    if (index === currentProject) {
        openModal(index);
    } else {
        currentProject = index;
        updateCarousel();
    }
}

function nextProject() {
    currentProject = (currentProject + 1) % totalProjects;
    updateCarousel();
}

function prevProject() {
    currentProject = (currentProject - 1 + totalProjects) % totalProjects;
    updateCarousel();
}

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

// Data for modals
const projectData = [
    {
        title: "PHIL KLINE'S UNSILENT NIGHT: POLYRHYTHMIC ILLUMINATION",
        image: "images/Untitled7.png",
        description: "An immersive audiovisual installation exploring the intersection of polyrhythmic music and dynamic lighting.",
        details: "Technologies: Max MSP, Arduino C++<br>Year(s): 2025<br>Exhibition(s): Unsilent Night Cambridge, Globe Studios KW"
    },
    {
        title: "Cosmic Interlude of the Nebular Web",
        image: "images/IMG_6225.JPG",
        description: "Responsive audiovisual experience exploring galaxy and star formation.",
        details: "Technologies: TouchDesigner, Adobe Creative Suite, Unity <br>Year(s): 2025<br>Exhibition(s): ALT-VERSE: THE MUSEUM EYEPOOL KW"
    },
    {
        title: "UNIVERSITY OF WATERLOO: TEA CLUB",
        image: "images/sticker_5.png",
        description: "Developed brand content, managed social media, and collaborated on website design for University of Waterloo Tea Club. See more details. ",
        details: "Technologies: Adobe Creative Suite, Blender, Figma, & HTML/CSS <br>Year(s): 2024-2025"
    },
    {
        title: "AUGMENTED REALITY EXHIBITION: DIGITAL SCULPTURES",
        image: "images/Untitled7.png",
        description: "A cutting-edge AR experience showcasing digital sculptures...",
        details: "Technologies: Unity, AR Foundation<br>Year: 2024"
    }
];

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

// Modal Functions
function openModal(index) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const project = projectData[index];
    modalBody.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h2>${project.title}</h2>
        <p>${project.description}</p><br>
        <p>${project.details}</p>`;
    modal.classList.add('active');
    document.documentElement.classList.add('no-scroll');  // ← ADD THIS LINE
}

function closeModal(event) {
    const modal = document.getElementById('projectModal');
    if (event && (event.target.id === 'projectModal' || event.target.classList.contains('modal-close'))) {
        modal.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');  // ← ADD THIS LINE
    } else if (!event) {
        modal.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');  // ← ADD THIS LINE
    }
}

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

// Initialize Carousel
updateCarousel();
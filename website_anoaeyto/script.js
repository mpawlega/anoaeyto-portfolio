// Enter screen functionality
const enterScreen = document.getElementById('enterScreen');
const enterButton = document.querySelector('.enter-button');
const mainContent = document.getElementById('mainContent');

enterButton.addEventListener('mouseenter', () => {
    enterScreen.classList.add('blur');
});

enterButton.addEventListener('mouseleave', () => {
    enterScreen.classList.remove('blur');
});

document.documentElement.classList.add('no-scroll');

enterButton.addEventListener('click', () => {
    enterScreen.classList.add('hidden');
    mainContent.classList.add('visible');
    setTimeout(() => {
        document.documentElement.classList.remove('no-scroll');
    }, 500);
});

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

// Data for modals
const projectData = [
    {
        title: "PHIL KLINE'S UNSILENT NIGHT: POLYRHYTHMIC ILLUMINATION",
        image: "images/Untitled7.png",
        description: "An immersive audiovisual installation exploring the intersection of ambient music and dynamic lighting...",
        details: "Technologies: TouchDesigner, Max/MSP, Arduino<br>Year: 2024<br>Exhibition: Winter Solstice Festival"
    },
    {
        title: "ALT-VERSE: THE MUSEUM EYEPOOL",
        image: "images/IMG_6225.JPG",
        description: "An interactive museum experience that reimagines engagement through AR...",
        details: "Technologies: Unity, AR Foundation, C#<br>Year: 2024"
    },
    {
        title: "UNIVERSITY OF WATERLOO: TEA CLUB",
        image: "images/sticker_5.png",
        description: "Brand identity and visual design system...",
        details: "Technologies: Adobe Illustrator, Photoshop<br>Year: 2023"
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
        <p style="opacity: 0.7;">${project.details}</p>`;
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('active');
}

// Gallery Modal
let currentGalleryIndex = 0;

function openGalleryModal(index) {
    currentGalleryIndex = index;
    const modal = document.getElementById('galleryModal');
    document.getElementById('galleryModalImage').src = galleryImages[index].src;
    document.getElementById('galleryDescription').textContent = galleryImages[index].description;
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
    const description = document.getElementById('galleryDescription');
    img.classList.add('fade-out');
    description.style.opacity = '0';
    setTimeout(() => {
        currentGalleryIndex = (currentGalleryIndex + dir + galleryImages.length) % galleryImages.length;
        img.src = galleryImages[currentGalleryIndex].src;
        description.textContent = galleryImages[currentGalleryIndex].description;
        img.classList.remove('fade-out');
        description.style.opacity = '0.8';
    }, 300);
}

// Initialize Carousel
updateCarousel();
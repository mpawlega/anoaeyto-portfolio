// Gallery data for each category
const galleryData = {
    abstractions: {
        title: 'abstractions',
        description: 'Digital abstracts exploring color theory, particle systems, and minimalist compositions.',
        images: [
            'images/gallery/Untitled.png',
            'images/gallery/flame.png',
            'images/gallery/Untitled_5.png',
            'images/gallery/test3.png',
            'images/gallery/cubes.png',
            'images/gallery/Untitled8.png',
            'images/gallery/unwritten_2.png',
            'images/gallery/12_12_2025_10.png'
        ]
    },
    environments: {
        title: 'environments',
        description: 'Virtual landscapes and geometric spaces exploring procedural generation and architectural composition.',
        images: [
            'images/gallery/test3.png',
            'images/gallery/cubes.png',
            'images/gallery/Untitled.png',
            'images/gallery/flame.png',
            'images/gallery/Untitled_5.png',
            'images/gallery/Untitled8.png'
        ]
    },
    characters: {
        title: 'characters',
        description: 'Digital character designs exploring form, personality, and visual storytelling techniques.',
        images: [
            'images/gallery/Untitled8.png',
            'images/gallery/unwritten_2.png',
            'images/gallery/12_12_2025_10.png',
            'images/gallery/Untitled.png',
            'images/gallery/flame.png'
        ]
    },
    photography: {
        title: 'photography',
        description: 'Exploring geometric forms, organic patterns, and abstract perspectives in natural and built environments.',
        images: [
            'images/gallery/cubes.png',
            'images/gallery/12_12_2025_10.png',
            'images/gallery/Untitled8.png',
            'images/gallery/unwritten_2.png',
            'images/gallery/Untitled.png',
            'images/gallery/flame.png',
            'images/gallery/Untitled_5.png',
            'images/gallery/test3.png'
        ]
    },
    lotus: {
        title: 'lotus',
        description: 'A curated collection capturing moments, spaces, and narratives through the lens.',
        images: [
            'images/gallery/12_12_2025_10.png',
            'images/gallery/Untitled.png',
            'images/gallery/cubes.png',
            'images/gallery/Untitled8.png',
            'images/gallery/unwritten_2.png',
            'images/gallery/flame.png'
        ]
    }
};

let currentCategory = '';
let currentImageIndex = 0;
let currentImages = [];

// Open gallery view
function openGallery(category) {
    currentCategory = category;
    const data = galleryData[category];
    currentImages = data.images;
    
    // Update title and description
    document.getElementById('galleryTitle').textContent = data.title;
    document.getElementById('galleryDescription').textContent = data.description;
    
    // Populate images
    const galleryImages = document.getElementById('galleryImages');
    galleryImages.innerHTML = '';
    
    data.images.forEach((imgSrc, index) => {
        const imgItem = document.createElement('div');
        imgItem.className = 'gallery-image-item';
        imgItem.onclick = () => openModal(index);
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `${data.title} ${index + 1}`;
        
        imgItem.appendChild(img);
        galleryImages.appendChild(imgItem);
    });
    
    // Switch views
    document.getElementById('gridView').style.display = 'none';
    document.getElementById('galleryView').style.display = 'flex';
}

// Close gallery view
function closeGallery() {
    document.getElementById('gridView').style.display = 'flex';
    document.getElementById('galleryView').style.display = 'none';
}

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');

function openModal(index) {
    currentImageIndex = index;
    modalImage.src = currentImages[index];
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function nextImage(event) {
    event.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    modalImage.src = currentImages[currentImageIndex];
}

function previousImage(event) {
    event.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    modalImage.src = currentImages[currentImageIndex];
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            nextImage(e);
        } else if (e.key === 'ArrowLeft') {
            previousImage(e);
        }
    }
});
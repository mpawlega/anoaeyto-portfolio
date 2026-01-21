// Project data structure
const projectsData = {
    'unsilent-night': {
        title: "PHIL KLINE'S UNSILENT NIGHT: POLYRHYTHMIC ILLUMINATION",
        subtitle: "Audiovisual Installation",
        heroImage: "images/Untitled7.png",
        description: "An immersive audiovisual installation exploring the intersection of polyrhythmic music and dynamic lighting. This project reimagines Phil Kline's Unsilent Night through synchronized LED patterns and spatial audio design.",
        details: {
            technologies: "Max MSP, Arduino C++",
            year: "2025",
            exhibitions: "Unsilent Night Cambridge, Globe Studios KW"
        },
        gallery: [
            "images/Untitled7.png",
            "images/gallery/Untitled.png",
            "images/gallery/test3.png"
        ],
        process: `
            <h3>Concept Development</h3>
            <p>The project began with an exploration of how polyrhythmic music could be visualized through light. I studied Phil Kline's compositional techniques and began sketching ideas for translating musical patterns into visual rhythms.</p>
            
            <h3>Technical Implementation</h3>
            <p>Using Max MSP, I developed a system to analyze the audio tracks in real-time, extracting rhythmic patterns and frequency data. This information was then sent to Arduino-controlled LED arrays via serial communication.</p>
            
            <h3>Exhibition and Iteration</h3>
            <p>The installation was first exhibited at Unsilent Night Cambridge, where audience feedback helped refine the synchronization between audio and visual elements. The refined version was then shown at Globe Studios KW.</p>
        `,
        projectLink: "https://example.com/unsilent-night"
    },
    'alt-verse': {
        title: "Cosmic Interlude of the Nebular Web",
        subtitle: "Interactive Audiovisual Experience",
        heroImage: "images/IMG_6225.JPG",
        description: "A responsive audiovisual experience exploring galaxy and star formation through interactive digital art. Visitors can manipulate cosmic elements and observe the evolution of stellar structures in real-time.",
        details: {
            technologies: "TouchDesigner, Adobe Creative Suite, Unity",
            year: "2025",
            exhibitions: "ALT-VERSE: THE MUSEUM EYEPOOL KW"
        },
        gallery: [
            "images/IMG_6226.JPG",
            "images/IMG_6225.JPG",
            "images/gallery/flame.png",
            "images/gallery/cubes.png"
        ],
        process: `
            <h3>Research Phase</h3>
            <p>I studied astrophysical processes of star and galaxy formation, consulting scientific papers and visualization data from space telescopes to ensure the interactive elements were grounded in real phenomena.</p>
            
            <h3>Building the Experience</h3>
            <p>TouchDesigner served as the primary tool for creating the real-time particle systems and fluid dynamics that simulate cosmic dust and gas. Unity was used to build the interactive framework that allows visitors to influence the formation processes.</p>
            
            <h3>Sound Design</h3>
            <p>The audiovisual component features generative soundscapes that respond to the visual elements, creating an immersive environment where sight and sound are intrinsically linked.</p>
        `,
        projectLink: "https://example.com/alt-verse"
    },
    'tea-club': {
        title: "UNIVERSITY OF WATERLOO: TEA CLUB",
        subtitle: "Brand Development & Digital Design",
        heroImage: "images/sticker_5.png",
        description: "Comprehensive brand development, social media management, and website design for the University of Waterloo Tea Club. This project involved creating a cohesive visual identity that reflects the warmth and community of tea culture.",
        details: {
            technologies: "Adobe Creative Suite, Blender, Figma, HTML/CSS",
            year: "2024-2025",
            exhibitions: "N/A"
        },
        gallery: [
            "images/poster.jpg",
            "images/sticker_5.png",
            "images/gallery/unwritten_2.png"
        ],
        process: `
            <h3>Brand Identity</h3>
            <p>Created a complete visual identity system including logo, color palette, and typography guidelines. The design philosophy centered on creating a modern yet approachable aesthetic that appeals to students.</p>
            
            <h3>Social Media Strategy</h3>
            <p>Developed and executed a content strategy across Instagram and other platforms, creating engaging posts, event announcements, and educational content about tea culture.</p>
            
            <h3>Website Development</h3>
            <p>Designed and coded a responsive website using HTML, CSS, and JavaScript. The site features event calendars, tea education resources, and membership information, with a design that mirrors the established brand identity.</p>
        `,
        projectLink: "https://example.com/tea-club"
    },
    'ar-exhibition': {
        title: "AUGMENTED REALITY EXHIBITION: DIGITAL SCULPTURES",
        subtitle: "AR Experience",
        heroImage: "images/Untitled7.png",
        description: "A cutting-edge AR experience showcasing digital sculptures that blend physical and virtual spaces. Visitors use mobile devices to reveal hidden artworks and interact with three-dimensional forms.",
        details: {
            technologies: "Unity, AR Foundation",
            year: "2024",
            exhibitions: "TBA"
        },
        gallery: [
            "images/Untitled7.png",
            "images/gallery/Untitled_5.png",
            "images/gallery/Untitled8.png"
        ],
        process: `
            <h3>Sculpture Design</h3>
            <p>Each digital sculpture was modeled in Blender with careful attention to how it would appear in various lighting conditions when viewed through AR.</p>
            
            <h3>AR Development</h3>
            <p>Built using Unity and AR Foundation to ensure cross-platform compatibility. Implemented plane detection and object placement systems that allow sculptures to naturally integrate with physical environments.</p>
            
            <h3>User Testing</h3>
            <p>Conducted extensive testing to refine the user experience, ensuring that sculptures were easily discoverable and that the AR interface felt intuitive to first-time users.</p>
        `,
        projectLink: "https://example.com/ar-exhibition"
    }
};

// Get project ID from URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('project');

// Prevent scroll restoration on page load
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Handle "Projects" link click to preserve scroll position
document.addEventListener('DOMContentLoaded', () => {
    const projectsLink = document.querySelector('.projects-link');
    if (projectsLink) {
        projectsLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Store that we want to scroll to projects section
            sessionStorage.setItem('scrollToProjects', 'true');
            window.location.href = 'index.html';
        });
    }
});

// Load project data
if (projectId && projectsData[projectId]) {
    const project = projectsData[projectId];
    
    // Set page title
    document.getElementById('projectTitle').textContent = `${project.title} - anoaeyto`;
    
    // Set hero section
    document.getElementById('heroTitle').textContent = project.title;
    document.getElementById('heroSubtitle').textContent = project.subtitle;
    
    // Set the background image by injecting a style rule
    const style = document.createElement('style');
    style.textContent = `
        #projectHero::before {
            background-image: url('${project.heroImage}');
        }
    `;
    document.head.appendChild(style);
    
    // Set description
    document.getElementById('descriptionText').textContent = project.description;
    
    // Set details
    const detailsHTML = `
        <p><strong>Technologies:</strong> ${project.details.technologies}</p>
        <p><strong>Year(s):</strong> ${project.details.year}</p>
        ${project.details.exhibitions !== 'N/A' ? `<p><strong>Exhibition(s):</strong> ${project.details.exhibitions}</p>` : ''}
    `;
    document.getElementById('projectDetails').innerHTML = detailsHTML;
    
    // Set gallery
    const galleryGrid = document.getElementById('projectGalleryGrid');
    project.gallery.forEach((imageSrc, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.onclick = () => openGalleryModal(index);
        galleryItem.innerHTML = `<img src="${imageSrc}" alt="Gallery image ${index + 1}">`;
        galleryGrid.appendChild(galleryItem);
    });
    
    // Set process
    document.getElementById('processContent').innerHTML = project.process;
    
    // Set project link
    document.getElementById('externalProjectLink').href = project.projectLink;
    
    // Store gallery images for modal
    window.currentGallery = project.gallery;
} else {
    // Redirect to home if project not found
    window.location.href = 'index.html';
}

// Gallery Modal Functions
let currentGalleryIndex = 0;

function openGalleryModal(index) {
    currentGalleryIndex = index;
    const modal = document.getElementById('galleryModal');
    document.getElementById('galleryModalImage').src = window.currentGallery[index];
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
        currentGalleryIndex = (currentGalleryIndex + dir + window.currentGallery.length) % window.currentGallery.length;
        img.src = window.currentGallery[currentGalleryIndex];
        img.classList.remove('fade-out');
    }, 300);
}
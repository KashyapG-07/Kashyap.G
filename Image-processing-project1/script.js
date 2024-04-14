const photoGrid = document.getElementById('photo-grid');

// Replace with your image data (source URL or File object)
const images = [
  '360_F_547978128_vqEEUYBr1vcAwfRAqReZXTYtyawpgLcC.jpg',
  'beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg',
  'medium-twfnp2-beautiful-waterfall-nature-view-large-size-high-original-imafwy37qv2b5g3v.jpeg',
  'nature-2ygv7ssy2k0lxlzu.jpg',
  'road-1072821_640.jpg',
  'wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg',
  // ... more images
];

function loadImages() {
  images.forEach(image => {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('col-md-4', 'mb-3'); // Adjust grid size as needed

    const imageElement = document.createElement('img');
    imageElement.classList.add('img-fluid'); // Makes images responsive
    imageElement.src = image;

    imageContainer.appendChild(imageElement);
    photoGrid.appendChild(imageContainer);
  });
}

loadImages();

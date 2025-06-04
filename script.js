document.addEventListener('DOMContentLoaded', () => {
    const imageLoader = document.getElementById('imageLoader');
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');

    // Set initial canvas size (optional, can be dynamic)
    // These dimensions are for the canvas drawing surface, not its display size.
    // The CSS handles the display size.
    canvas.width = 800;
    canvas.height = 600;

    // Adjust the existing imageLoader event listener to also reset dragover feedback
    imageLoader.addEventListener('change', (event) => {
        canvasContainer.style.border = '1px dashed #ccc'; // Reset border if a file is chosen via input
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    let drawWidth = img.width;
                    let drawHeight = img.height;
                    let x = 0;
                    let y = 0;
                    if (drawWidth > canvas.width || drawHeight > canvas.height) {
                        const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
                        drawWidth = img.width * ratio;
                        drawHeight = img.height * ratio;
                    }
                    x = (canvas.width - drawWidth) / 2;
                    y = (canvas.height - drawHeight) / 2;
                    ctx.drawImage(img, x, y, drawWidth, drawHeight);
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    });

    // Drag and Drop functionality
    const canvasContainer = document.querySelector('.canvas-container'); // Or directly to canvas if preferred

    canvasContainer.addEventListener('dragover', (event) => {
        event.stopPropagation();
        event.preventDefault();
        // Add some visual feedback if desired
        canvasContainer.style.border = '2px dashed #007bff'; // Example feedback
    });

    canvasContainer.addEventListener('dragleave', (event) => {
        event.stopPropagation();
        event.preventDefault();
        // Remove visual feedback
        canvasContainer.style.border = '1px dashed #ccc'; // Reset to original or remove
    });

    canvasContainer.addEventListener('drop', (event) => {
        event.stopPropagation();
        event.preventDefault();
        canvasContainer.style.border = '1px dashed #ccc'; // Reset border

        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        // Calculate aspect ratio to fit image within canvas
                        let drawWidth = img.width;
                        let drawHeight = img.height;
                        let x = 0;
                        let y = 0;

                        if (drawWidth > canvas.width || drawHeight > canvas.height) {
                            const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
                            drawWidth = img.width * ratio;
                            drawHeight = img.height * ratio;
                        }

                        x = (canvas.width - drawWidth) / 2;
                        y = (canvas.height - drawHeight) / 2;

                        ctx.drawImage(img, x, y, drawWidth, drawHeight);
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                alert("Please drop an image file.");
            }
        }
    });
});

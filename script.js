document.addEventListener('DOMContentLoaded', () => {
    const imageLoader = document.getElementById('imageLoader');
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');

    // Set initial canvas size (optional, can be dynamic)
    // These dimensions are for the canvas drawing surface, not its display size.
    // The CSS handles the display size.
    canvas.width = 800;
    canvas.height = 600;

    imageLoader.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    // Clear previous image
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Calculate aspect ratio to fit image within canvas display dimensions
                    // while maintaining aspect ratio.
                    const canvasDisplayWidth = canvas.clientWidth;
                    const canvasDisplayHeight = canvas.clientHeight;

                    let drawWidth = img.width;
                    let drawHeight = img.height;
                    let x = 0;
                    let y = 0;

                    // Adjust image size to fit canvas if it's larger
                    if (drawWidth > canvas.width || drawHeight > canvas.height) {
                        const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
                        drawWidth = img.width * ratio;
                        drawHeight = img.height * ratio;
                    }

                    // Center the image on the canvas
                    x = (canvas.width - drawWidth) / 2;
                    y = (canvas.height - drawHeight) / 2;

                    // Draw the image
                    ctx.drawImage(img, x, y, drawWidth, drawHeight);
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
        } else {
            // Clear canvas if no file is selected or selection is cancelled
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Optionally, display a message
            // ctx.fillStyle = '#777';
            // ctx.textAlign = 'center';
            // ctx.fillText("No image loaded", canvas.width / 2, canvas.height / 2);
        }
    });
});

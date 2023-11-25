const { createCanvas } = require('canvas');

function createImageWithText(text) {
  const canvas = createCanvas(100, 100);
  const context = canvas.getContext('2d');

  // Draw a default image (you can customize this further)
  context.fillStyle = '#d62828'; // Black color
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = '48px Arial';
  context.fillStyle = '#FFF'; // White color
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL(); // Convert the canvas to a base64 encoded URL
}

module.exports = createImageWithText;
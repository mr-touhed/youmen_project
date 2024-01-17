const axios = require('axios');
const fs = require('fs');

async function getImageBase64(url) {
  try {
    // Fetch the image from the URL
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    // Convert the image buffer to Base64 string
    const base64String = imageBuffer.toString('base64');

    return base64String;
  } catch (error) {
    console.error('Error fetching or converting image:', error.message);
    throw error;
  }
}

module.exports={getImageBase64}
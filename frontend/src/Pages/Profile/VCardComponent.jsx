// VCardComponent.jsx

import { useEffect, useState } from "react";


const VCardComponent = ({ data,className }) => {
  const [imageBase64, setImageBase64] = useState('');
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(data.img); // Replace 'data.imageUrl' with the actual image URL
        const blob = await response.blob();
        const reader = new FileReader();
          
        reader.onloadend = () => {
          const base64data = reader.result.split(',')[1];
          setImageBase64(base64data);
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error fetching or converting image:', error);
      }
    };

    fetchImage();
  }, [data.img]);

  console.log(imageBase64)
  const createVCard = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${data.fullName || ''}`,
      `ORG:${data.officeName || ''}`, // Office Name
      `TITLE:${data.position || ''}`, // Position
      `TEL;TYPE=WORK,VOICE:${data.workNumber || ''}`,
      `TEL;TYPE=HOME,VOICE:${data.tel || ''}`, // Work Number
      `EMAIL:${data.email || ''}`,
      `URL:${data.linkedin || ''}`, // LinkedIn Link
      `PHOTO;TYPE=PNG;ENCODING=b;VALUE=URI:${imageBase64}`, // Image
      'END:VCARD',
    ];

    return vCardData.join('\n');
  };
  console.log(createVCard())
  const handleSaveClick = () => {
    const vCardString = createVCard();

    const blob = new Blob([vCardString], { type: 'text/vcard' });
    const link = document.createElement('a');

    link.href = window.URL.createObjectURL(blob);
    link.download = `${data.fullName} contact.vcf`;

    link.click();

    window.URL.revokeObjectURL(link.href);
  };

  return (
    
      <button onClick={handleSaveClick} className={className}>Save Contact</button>
    
  );
};

export default VCardComponent;

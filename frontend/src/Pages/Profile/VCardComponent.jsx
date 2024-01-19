// VCardComponent.jsx

import { useEffect, useState } from "react";


const VCardComponent = ({ data,className }) => {
  const [imageBase64, setImageBase64] = useState('');
  const {
    _id,user_path,user_name,position,office,email,tel,work_tel,status,social_links,createAt,img
  } = data
  const imgType =img && img.split(".")[img.split(".").length -1].toUpperCase()
 
  
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(img); // Replace 'data.imageUrl' with the actual image URL
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
  }, [_id,img]);
  
 
  const createVCard = () => {
    // const vCardData = [
    //   'BEGIN:VCARD',
    //   'VERSION:3.0',
    //   `FN:${data.fullName || ''}`,
    //   `ORG:${data.officeName || ''}`, // Office Name
    //   `TITLE:${data.position || ''}`, // Position
    //   `TEL;TYPE=WORK,VOICE:${data.workNumber || ''}`,
    //   `TEL;TYPE=HOME,VOICE:${data.tel || ''}`, // Work Number
    //   `EMAIL:${data.email || ''}`,
    //   `URL:${data.linkedin || ''}`, // LinkedIn Link
    //   `PHOTO;TYPE=PNG;ENCODING=b;VALUE=URI:${imageBase64}`, // Image
    //   'END:VCARD',
    // ];

    const vCardData = [
      "BEGIN:VCARD",
"VERSION:3.0",
`FN;CHARSET=UTF-8:${user_name}`,
`N;CHARSET=UTF-8:;${user_name};;;`,
`EMAIL;CHARSET=UTF-8;type=HOME,INTERNET:${email}`,
`PHOTO;ENCODING=b;TYPE=${imgType}:${imageBase64}`
,`TEL;PREF;MOBILE:${tel}`,
`TEL;TYPE=WORK,VOICE:${work_tel}`,
`TITLE;CHARSET=UTF-8:${position}`,
`ORG;CHARSET=UTF-8:${office}`,
`URL;TYPE=facebook:${(social_links.find(l => l.web_name === "facebook"))?.link}`,
`URL;TYPE=linkedin:${(social_links.find(l => l.web_name === "linkedIn"))?.link}`,
`URL;TYPE=others:${(social_links.find(l => l.web_name === "others"))?.link}`,
`REV:${new Date()}`,
"END:VCARD"
     ];


    return vCardData.join('\n');
  };
   
  const handleSaveClick = () => {
    const vCardString = createVCard();

    const blob = new Blob([vCardString], { type: 'text/vcard' });
    const link = document.createElement('a');

    link.href = window.URL.createObjectURL(blob);
    link.download = `${user_name} contact.vcf`;

    link.click();

    window.URL.revokeObjectURL(link.href);
  };

  return (
    
      <button onClick={handleSaveClick} className={className}>Save Contact</button>
    
  );
};

export default VCardComponent;

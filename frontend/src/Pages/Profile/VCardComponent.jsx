// VCardComponent.jsx

import { useEffect, useState } from "react";

// `URL;TYPE=facebook:${(social_links.find(l => l.web_name === "facebook"))?.link}`,
// `URL;TYPE=linkedin:${(social_links.find(l => l.web_name === "linkedIn"))?.link}`,
// `URL;TYPE=instagram:${(social_links.find(l => l.web_name === "instagram"))?.link}`,
// `URL;TYPE=others:${(social_links.find(l => l.web_name === "others"))?.link}`,


const VCardComponent = ({ data,className }) => {
  const [imageBase64, setImageBase64] = useState('');
  const {
    _id,address,user_name,position,office,email,tel,work_tel,status,social_links,createAt,img
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
       const vCardData = [
      "BEGIN:VCARD",
"VERSION:3.0",
`FN;CHARSET=UTF-8:${user_name}`,
`N;CHARSET=UTF-8:;${user_name};;;`,
`EMAIL;CHARSET=UTF-8;type=WORK,INTERNET:${email}`,
`PHOTO;ENCODING=b;TYPE=${imgType}:${imageBase64}`
,`TEL;PREF;CELL:${tel}`,
`TITLE;CHARSET=UTF-8:${position}`,
`ORG;CHARSET=UTF-8:${office}`,
`REV:${new Date()}`,

     ];
      if(work_tel){
        vCardData.push(`TEL;TYPE=WORK,VOICE:${work_tel}`)
      }
      if(address){
        vCardData.push(`ADR;CHARSET=UTF-8;TYPE=WORK:;;${address}`)
      }
     social_links.forEach(l => {
          if(l.web_name === "facebook"){
            vCardData.push(`URL;TYPE=facebook:${l.link}`)
          }else if(l.web_name === "linkedIn"){
            vCardData.push(`URL;TYPE=linkedin:${l.link}`)
          }else if(l.web_name === "instagram"){
            vCardData.push(`URL;TYPE=instagram:${l.link}`)
          }else if(l.web_name === "others"){
            vCardData.push(`URL;TYPE=others:${l.link}`)
          }
     })
     vCardData.push("END:VCARD")
     
    return vCardData.join('\n');
  };
   
  const handleSaveClick =() => {
    const vCardString =  createVCard();


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

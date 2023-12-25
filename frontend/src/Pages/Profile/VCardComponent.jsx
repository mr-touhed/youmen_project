// VCardComponent.jsx


const VCardComponent = ({ data,className }) => {
  const createVCard = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${data.fullName || ''}`,
      `ORG:${data.officeName || ''}`, // Office Name
      `TITLE:${data.position || ''}`, // Position
      
      `TEL;TYPE=WORK,VOICE:${data.workNumber || ''}`,
      `TEL:${data.tel || ''}`, // Work Number
      `EMAIL:${data.email || ''}`,
      `URL:${data.linkedin || ''}`, // LinkedIn Link
      'END:VCARD',
    ];

    return vCardData.join('\n');
  };

  const handleSaveClick = () => {
    const vCardString = createVCard();

    const blob = new Blob([vCardString], { type: 'text/vcard' });
    const link = document.createElement('a');

    link.href = window.URL.createObjectURL(blob);
    link.download = 'contact.vcf';

    link.click();

    window.URL.revokeObjectURL(link.href);
  };

  return (
    
      <button onClick={handleSaveClick} className={className}>Save Contact</button>
    
  );
};

export default VCardComponent;

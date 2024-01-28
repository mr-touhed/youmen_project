import { useState } from "react";

const DynamicSocialMedia = () => {
    const [sections, setSections] = useState([
        { id: 1, web_name: '', link: '' }
      ]);

    const addSection = () => {
        const newSection = {
          id: sections.length + 1,
          web_name: '',
          link: ''
        };
    
        setSections([...sections, newSection]);
      };
      
      const removeSection = (id) => {
        const updatedSections = sections.filter((section) => section.id !== id);
        setSections(updatedSections);
      };
    
      const handleSelectChange = (id, value) => {
        const inputValue = value.trim()
        const updatedSections = sections.map((section) =>
          section.id === id ? { ...section, web_name: inputValue } : section
        );
    
        setSections(updatedSections);
      };
    
      const handleInputChange = (id, value) => {
            const inputValue = value.trim()
        const updatedSections = sections.map((section) =>
          section.id === id ? { ...section, link: inputValue } : section
        );
    
        setSections(updatedSections);
      };


    return (
        {sections,setSections,addSection,handleInputChange,handleSelectChange,removeSection}
    );
};

export default DynamicSocialMedia;
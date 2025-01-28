import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);  // Retroceder a la página anterior
  };

  return (
    <button 
      onClick={handleBack} 
      className="flex items-center"
    >
      <ArrowLeft className="mr-2" /> 
    </button>
  );
};

export default BackButton;

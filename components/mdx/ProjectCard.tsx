import React from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  icon: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, icon }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <div className="flex items-center mb-2">
        <Image src={icon} alt={title} width={24} height={24} className="mr-2" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default ProjectCard;
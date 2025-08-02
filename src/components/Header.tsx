import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-white text-[#007FFF] p-4 flex justify-center items-center shadow-sm">
      <div className="flex justify-center items-center">
        <Link href="https://www.contoureducation.com.au/">
          <Image 
            src="/contour_education.png" 
            width={256} 
            height={256} 
            alt="Contour Education Logo" 
            priority
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
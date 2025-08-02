import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white rounded-lg shadow-sm m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="https://www.contoureducation.com.au/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <Image 
                      src="/contour_education.png" 
                      width={256} 
                      height={256} 
                      alt="Contour Education Logo" 
                    />
                </a>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
                    <li>
                        <a href="https://www.contoureducation.com.au/who-we-are/" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center">© 2025 <a href="https://www.contoureducation.com.au/" className="hover:underline">Contour Education</a>. All Rights Reserved.</span>
        </div>
    </footer>
  );
};

export default Footer;

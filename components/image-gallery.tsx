import { FC } from "react";
import Image from "next/image";
import { Photo } from "@/types/api";
import Pagination from "./paginator";

interface GalleryProps {
  images: Photo[];
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onPageChange: (page: number) => void;
}

const ImageGallery: FC<GalleryProps> = ({
  images,
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  onPageChange,
}) => {
  return (
    <div className="flex w-full flex-col">
   {/* Pagination Controls */}
   <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onPageChange={onPageChange}
      />
    <div style={{height:`${7*20}rem`,width:'100%'}}>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 p-0 h-full ">
        {images.map((photo) => {
          const aspectRatio = photo.height / photo.width;
          return (
            <div
              key={photo.id}
              className="relative group overflow-hidden bg-gray-200"
              style={{ gridRowEnd: `span ${Math.ceil(aspectRatio * 2)}` }} // Adjust based on your grid column count
            >
              <div className="relative w-full h-full">
                <Image
                  src={photo.src.large}
                  alt={photo.alt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 transform group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                <p className="text-white text-xs mb-2 text-center">{photo.photographer}</p>
                <div className="flex space-x-2">
                  <a
                    href={photo.src.original}
                    download
                    className="bg-white text-black rounded-full p-2 shadow-md transition-transform duration-300 hover:scale-110 flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v8m4-4l-4 4-4-4m8 0H4m8 12a9 9 0 100-18 9 9 0 000 18z"
                      />
                    </svg>
                  </a>
                  <button
                    className="bg-white text-black rounded-full p-2 shadow-md transition-transform duration-300 hover:scale-110 flex items-center justify-center"
                    onClick={() => alert("Add to cart")}
                  >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 4H17L21 12H8L7 4Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7 4H3V6H5L7 16H19V14H8L7 4Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="9" cy="20" r="2" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="17" cy="20" r="2" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

     
    </div>
     {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ImageGallery;

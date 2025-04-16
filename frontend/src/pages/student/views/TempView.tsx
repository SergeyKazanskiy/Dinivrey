import React, { useRef, useState } from "react";
import { HStack, Box, Image, IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

//import img1 from '../../../images/Dragon1.webp'


export const Video_Carusel: React.FC = () => {
  const images: string[] = []; //img1, img2, img3, img4, img5

  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (carouselRef.current) {
      const slides = Array.from(carouselRef.current.children);
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);
      (slides[nextIndex] as HTMLDivElement).scrollIntoView({ behavior: "smooth", inline: "start" });
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      const slides = Array.from(carouselRef.current.children);
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      setCurrentIndex(prevIndex);
      (slides[prevIndex] as HTMLDivElement).scrollIntoView({ behavior: "smooth", inline: "start" });
    }
  };

  return (
    <Box width="540px" maxW="600px" mx="auto" textAlign="center" position="relative">
        <HStack>
        <IconButton mr={3} aria-label="Next week" icon={<ArrowLeftIcon boxSize={3} />} size="md" variant="ghost"
          onClick={handleNext}/>

      <Box borderWidth={0.4} borderColor='gray.900' borderRadius={2}
        display="flex" overflow="hidden" ref={carouselRef}
        width="100%" gap={2} scrollBehavior="smooth"
      >
        {images.map((src, index) => (
          <Box key={index} minWidth="100%">
            <Image src={src} alt={`Image ${index + 1}`} width="100%" height="440px" />
          </Box>
        ))}
      </Box>
      <IconButton ml={3} aria-label="Next week" icon={<ArrowRightIcon boxSize={3} />} size="md" variant="ghost"
          onClick={handleNext}/>
          </HStack>
    </Box>
  );
};


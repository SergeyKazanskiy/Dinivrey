import { useRef } from 'react';
import { Image } from '@chakra-ui/react';
import { resizeImage } from '../shared/utils';


type Props = {
  photoSrc: string;
  onUpload: (file: File, ext: string) => void;
  size: number;
};

export const PhotoUploader: React.FC<Props> = ({ photoSrc, onUpload, size}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image!');
      return;
    }

    const resizedFile = await resizeImage(file, size);
    const ext = resizedFile.name.split('.').pop() || 'jpg';
    onUpload(resizedFile, ext);
  };

  return (
    <>
      <Image src={photoSrc} alt="" boxSize={size + "px"} mr={1} mt={1} borderRadius='25px'
        objectFit="cover" cursor="pointer"
        onClick={handleImageClick}
      />
      <input type="file" accept="image/*" style={{ display: 'none' }}
        ref={fileInputRef} 
        onChange={handleFileChange}
      />
    </>
  );
};



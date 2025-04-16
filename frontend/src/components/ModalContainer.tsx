import React from "react";
import { Box, Modal, AbsoluteCenter, ModalContent, ModalHeader, ModalCloseButton } from "@chakra-ui/react";

interface Props {
    isOpen: boolean;
    children: React.ReactNode;
    onClick: () => void;
}

export function ModalContainer({ isOpen, children, onClick }: Props) {
  return (
    <>
      {isOpen && (      
        <Box position='absolute' h='100%' w='100%' bg='gray.300'
          onClick={onClick}>
          <AbsoluteCenter>
            {children}
          </AbsoluteCenter>
        </Box>
    )}
  </>
  );
}

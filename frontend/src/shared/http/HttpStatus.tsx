import { useEffect, useState } from 'react';
import { useToast, Alert, AlertIcon, Box, CloseButton } from '@chakra-ui/react';
import { useSharedHttpClient } from './httpClient';

export const HttpStatus = () => {
  const toast = useToast();
  const { isLoading, catchError, errorMessage, successMessage, clearMessages } = useSharedHttpClient();

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"info" | "warning" | "success" | "error" | "loading" | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {  // Show loading toast
    if (isLoading) {
      toast({ id: 'loading-toast', title: 'Loading...', description: 'Please wait',
        status: 'loading', duration: null, isClosable: false,});
    } else {
      toast.close('loading-toast'); 
    }
  }, [isLoading, toast]);

  useEffect(() => { // Show success alert
    if (successMessage) {
      setAlertType('success');
      setAlertMessage(successMessage);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        clearMessages();
      }, 2000);
    }
  }, [successMessage]); 

  useEffect(() => { // Show error alert
    if (catchError) {
      setAlertType('error');
      setAlertMessage(errorMessage);
      setShowAlert(true);
    }
  }, [catchError]); // errorMessage

  function handleClose() {
    setShowAlert(false);
    clearMessages();
  }

  return showAlert ? (
    <Box position="fixed" bottom="15px" left="38%"  zIndex="1000">
      <Alert status={alertType} borderRadius="md" boxShadow="md" color='black' variant='solid'>
        <AlertIcon />
        {alertMessage}

        {alertType === 'error' && (
          <CloseButton alignSelf='flex-start' position="relative" left="12px" top="-1px"
            onClick={handleClose} />
        )}
      </Alert>
    </Box>
  ) : null;
};

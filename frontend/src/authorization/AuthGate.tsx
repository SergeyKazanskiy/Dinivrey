import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure
} from "@chakra-ui/react";


type Props = {
  children: React.ReactNode;
};

const AuthGate: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        
        const res = await fetch("/auth/verify", { // `${API_BASE_URL}/auth/verify`
          headers: { Authorization: `Bearer ${token}`, },
        });

        if (res.ok) {
          setVerified(true);
          onClose(); 
        } else {
          const detail = await res.json();
          console.warn("Access denied:", detail);
          await signOut(auth);
          onOpen(); 
        }
      } else {
        setVerified(false);
        onOpen();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  if (loading) return null;

  return (
    <>
      {verified && children}

      <Modal isOpen={!verified && isOpen} isCentered onClose={() => {}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Authorization</ModalHeader>

          <ModalBody>
            To access the application, you must log in via your Google account.
          </ModalBody>
          
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleLogin}>
              Login with Google
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthGate;

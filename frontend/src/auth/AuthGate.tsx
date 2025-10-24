import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@chakra-ui/react";
import { setAuthToken } from "../api/api";


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
        setAuthToken(token);

        const res = await fetch("/auth/verify", {
          headers: { Authorization: `Bearer ${token}`, },
        });
        if (res.ok) {
          setVerified(true);
          onClose(); 
        } else {
          const detail = await res.json();
          alert("Access denied: " + detail);
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
      auth.signOut();
      const result = await signInWithPopup(auth, provider);
      // const credential = provider.getCustomParameters()
      // const token = credential.accessToken;
      // const user = result.user;
      // const token2 = user.getIdToken()
    } catch (err) {
      alert("Google login failed " + err);
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


  // const verifyUserAsAdmin = async (token: string) => {
  //   try {
  //     const res = await axios.get(`${API_BASE_URL}/auth/admin/verify`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     alert("✅ Success! Access allowed");
  //     setAuthToken(token);
  //     setVerified(true);
  //     onClose();
  //   } catch (error) {
  //     const err = error as AxiosError;
  //     alert("🚫 Access denied: " + (err.response?.data || err.message));

  //     setAuthToken("");
  //     await signOut(auth);
  //     await auth.currentUser?.delete();
  //     onOpen();
  //   }
  // };
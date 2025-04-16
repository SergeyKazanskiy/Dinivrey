import {HStack } from "@chakra-ui/react";
import ProfileCell from "../../../components/ProfileCell";


interface Props {
    name: string;
    phone: string;
    email: string;
    setName: (name: string) => void;
    setPhone: (phone: string) => void;
    setEmail: (email: string) => void;
}

export const ParentRecord: React.FC<Props> = ({name, phone, email, setName, setPhone, setEmail }) => {
  return (
    <HStack justifyContent='space-around' pt='4px'>
        <ProfileCell label="Name" value={name} maxLength={20} w1='50px' w2='160px'
          onChange={(value) => setName(String(value))}/>
        <ProfileCell label="Phone" value={phone} maxLength={12} w1='50px' w2='110px'
          onChange={(value) => setPhone(String(value))}/>
        <ProfileCell label="Email" value={email} maxLength={20} w1='44px' w2='170px'
          onChange={(value) => setEmail(String(value))}/>
      </HStack>
  );
};  

import { useState, useEffect } from 'react';
import { HStack, Container } from "@chakra-ui/react";
import { useStore } from "../store";
import ProfileCell from "../../../components/ProfileCell";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'


export const AddressView: React.FC = () => {
  const { student, city, street, home } = useStore();
  const {setCity, setStreet, setHome, checkAddress } = useStore();

  useEffect(() => {
    if (student) {
      checkAddress();
    }
  }, [city, street, home]);

  return (
    <Container style={screenStyles.widget} h='48px'>                
      <HStack justifyContent='space-around' pt='8px'>
        <ProfileCell label="City" value={city} maxLength={20} w1='44px' w2='160px'
          onChange={(value) => setCity(String(value))}
        />
        <ProfileCell label="Street" value={street} maxLength={12} w1='52px' w2='180px'
          onChange={(value) => setStreet(String(value))} 
        />
        <ProfileCell label="Home" value={home} maxLength={20} w1='52px' w2='80px'
          onChange={(value) => setHome(String(value))}
        />
      </HStack>
    </Container>
  );
};
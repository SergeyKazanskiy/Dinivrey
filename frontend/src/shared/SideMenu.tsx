import { NavLink } from "react-router-dom";
import { Box, Flex, Text, Icon, Link, HStack, Container, VStack } from "@chakra-ui/react";
import { screenStyles, widgetStyles } from './appStyles'
import { AddIcon } from '@chakra-ui/icons'


export const SideMenu: React.FC = () => {
    return (
        <Container style={screenStyles.widget} h='48px'>
            <VStack spacing={2}>
                <Link as={NavLink} to='/fff'><AddIcon/>Tessss 1</Link>
                <Link as={NavLink} to='/fff'><AddIcon/>Tessss 2</Link>
                <Link as={NavLink} to='/fff'><AddIcon/>Tessss 3</Link>
            </VStack>
        </Container>
    );
};

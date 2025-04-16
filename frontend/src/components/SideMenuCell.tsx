import { Image, Flex, Text, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { sidebarStyles } from '../shared/appStyles';

interface Props {
    img: string
    title: string;
    to: string;
}

export const SideMenuCell: React.FC<Props> = ({ img, title, to }) => {
    return (
        <Link display="block" as={NavLink} to={to} w="full" pl={3}
            style={sidebarStyles.link}
            _focus={sidebarStyles.linkFocus}
            _hover={sidebarStyles.linkHover}
            _activeLink={sidebarStyles.linkActive}
        >
            <Flex alignItems="center" px={2} py={2}>
                <Image src={`/images/${img}`} alt={title} boxSize='24px' />
                <Text ml={4}>{title}</Text>
            </Flex>
        </Link>
    );
};
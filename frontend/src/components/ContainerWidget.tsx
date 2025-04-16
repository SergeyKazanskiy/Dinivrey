import { Container, Box, background } from "@chakra-ui/react";
import { JSX } from "react/jsx-runtime";
import { widgetStyles } from "../shared/appStyles";


interface Props {
  w?: string;
  h?: string;
  children: JSX.Element[] | JSX.Element;
}

export const ContainerWidget: React.FC<Props> = ({ w='100%', h='100%', children }) => {
  return (
    <Container borderRadius={10} style={widgetStyles.title} h={h} w={w}>
      { children }
    </Container>
  );
};
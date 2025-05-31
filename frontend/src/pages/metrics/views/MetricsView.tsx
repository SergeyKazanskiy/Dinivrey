import { Container, Button, Text, Flex, VStack } from "@chakra-ui/react";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';
import { TimePopover } from '../components/TimePopover';
import { Metric } from "../model";


interface Props {
    test: string;
    location: string;
    example: string;
    metrics: Metric[];
    note: string;
}

export const MetricsView: React.FC<Props> = ({ test, location, example, metrics, note }) => {
    const { updateStart, updateStop } = useStore();

    return (
        <Container style={screenStyles.widget}  w='360px'>
            <Text style={widgetStyles.title}>{test}</Text>
            <Text h='40px' style={widgetStyles.value}>{location}</Text>
            <Text style={widgetStyles.text}>{example}</Text>

            {metrics.map((item, inx) => (
                <Flex key={inx}>
                    <TimePopover
                        seconds={item.start}
                        onChange={(newSeconds) => updateStart(item.id, newSeconds)}
                    />
                    <Text color='gray.800' fontSize={16} >-</Text>
                    <TimePopover
                        seconds={item.stop}
                        onChange={(newSeconds) => updateStop(item.id, newSeconds)}
                    />
                    <Text ml={4} pt='1px' color='gray.800' fontSize={16}>score – {10-inx}</Text>
                </Flex>
            ))}

            <Text pt={1} style={widgetStyles.text} fontWeight={500}>{note}</Text>
        </Container>
    )
};

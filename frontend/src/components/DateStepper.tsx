import { HStack, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";


interface Props {
    title: string;
    w: string;
    canNext: boolean;
    onPrev: () => void;
    onNext: () => void;
}

export function DateStepper({ title, w, onPrev, onNext, canNext }: Props) {
    return (
        <HStack align='center' spacing={0} borderWidth={1} borderColor='gray.300'>
            <IconButton aria-label="Prev" icon={<ChevronLeftIcon />} size="sm" color='gray.400' bg='white'
                onClick={onPrev}/>
            <Text fontSize={15} color="blue.500" w={w} align='center' bg='white' py='4px'>
                {title}
            </Text>
            <IconButton aria-label="Next" icon={<ChevronRightIcon />} size="sm" color='gray.400' bg='white'
                isDisabled={!canNext}
                onClick={onNext}/>
        </HStack>
    )
};


import { Button } from "@chakra-ui/react";


interface Props {
  disabled: boolean;
  isLoading: boolean;
  onClick: () => void;
}

export const SaveButton: React.FC<Props> = ({ disabled, isLoading, onClick }) => {
  return (
    <Button size='sm' w={40} disabled={disabled} onClick={onClick}
      isLoading={isLoading} loadingText='Loading' spinnerPlacement='start'
      color="white" colorScheme='teal' variant='outline' //solid stat tag, toast Tooltip Breadcrumb Avatar createIcon <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
      _active={{ bg: '#dddfe2', borderColor: '#bec3c9' }}
    >
      Save
    </Button>
  );
};

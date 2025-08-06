import { useState } from 'react';
import { Flex, Text, Image, useDisclosure, HStack, Container, VStack } from "@chakra-ui/react";
import { useStore } from "../store";
import { ProfileCell } from "../components/ProfileCell";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { DeletePopover } from '../../../components/DeletePopover';
import { objectToJson } from "../../../shared/utils";
import { PhotoUploader } from '../../../components/PhotoUploader';
import { ImagesPath } from '../../../shared/constants';


interface Props {
  coach_id: number;
}

export const ProfileView: React.FC<Props> = ({coach_id}) => {
  const { coaches, coachId, camp_name } = useStore();
  const { updateCoach, deleteCoach, selectCoach, uploadPhoto } = useStore();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [photoVersion, setPhotoVersion] = useState(Date.now());


  const coach = coaches.find(el => el.id === coach_id)!;
  const fileName = coach.first_name + '_' + coach.last_name + '_' + coach.id;
  const photoPath = ImagesPath + '/photos/' + camp_name + '/coaches/' + coach.photo;
  const photoSrc = `${photoPath}?v=${photoVersion}`;

  return (
    <Container style={screenStyles.widget} h='174px' w='360px' onClick={()=>selectCoach(coach_id)}>
      <HStack justifyContent='space-between'>
        <Text style={widgetStyles.title} mt="2" mb="1" cursor='pointer'>
          Personal information
        </Text>
        {coach_id === coachId &&<DeletePopover title='Delete coach!' isDisabled={false}
          isOpen={isOpen} onOpen={onOpen} onClose={onClose} onDelete={()=>deleteCoach(coach_id)}/>}
      </HStack>               
      
      <HStack align='start' mb='2px'>
        <PhotoUploader
          photoSrc={photoSrc}
          onUpload={(file: File, ext) => {
            uploadPhoto(coach.id, file, fileName + '.' + ext);
            setPhotoVersion(Date.now());
          }}
          size={86}
        />

        <Flex direction="column" gap="0.5">
          <ProfileCell label="First name" value={coach.first_name} maxLength={20} w1='84px' w2='140px'
            onChange={(value) => updateCoach(coach_id, { first_name: String(value) })}
          />
          <ProfileCell label="Last name" value={coach.last_name} maxLength={20} w1='84px' w2='140px'
            onChange={(value) => updateCoach(coach_id, { last_name: String(value) })}
          />
          <ProfileCell label="Phone" value={coach.phone} maxLength={12} w1='84px' w2='140px'
            onChange={(value) => updateCoach(coach_id, { phone: String(value) })}
          />
        </Flex>
      </HStack>

      <ProfileCell label="Email" value={coach.email} maxLength={40} w1='56px' w2='270px'
        onChange={(value) => updateCoach(coach_id, { email: String(value) })}
      />
    </Container>
  );
};

import imageJoin from 'assets/join-our-team.png';
import Button from 'components/Button';
import Box from 'components/FieldBox';
import Title from 'components/Title';
import { i18n } from 'translation';
import { Text, Image } from 'wiloke-react-core';

export const JoinOutTeam = () => {
  return (
    <Box
      backgroundColor="light"
      borderWidth={0}
      radius={6}
      css={{
        padding: '20px',
        textAlign: 'center',
      }}
    >
      {/* TODO: i18n */}
      <Title
        size="medium"
        title={i18n.t('adminDashboard.join_our_team')}
        text="Add, edit and publish a theme to change your store appearance."
        css={{ textAlign: 'center' }}
      />

      <Text css={{ maxWidth: '300px', margin: '20px auto -50px', position: 'relative', zIndex: 2 }}>
        <Button size="small" backgroundColor="primary" color="light" radius={6}>
          {i18n.t('adminDashboard.join_our_team')}
        </Button>
      </Text>

      <Image src={imageJoin} />
    </Box>
  );
};

export default JoinOutTeam;

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { DownloadButton } from './DownloadButton';
const YoutubeCard = (): JSX.Element => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        src="https://iscale.iheart.com/v3/surl/aHR0cDovL2ltYWdlLmloZWFydC5jb20vaW1hZ2VzL292ZXJyaWRlLzU0OTY4OC5qcGc=?sn=eGtleWJhc2UyMDIxMTExMDrUHlvM_nmuCxq5byBb796Jdg_rO7cNOhPWOPSNnYY5mw%3D%3D&surrogate=1cOXl179JY-syhxYSCX6Q1a_Mcu6UO8d-F4oJzpZf1hcUbJr4aIgwNgPGU_7jx4DRxrjAnAJJQPYWHjbR8nCnObG1P3vwC5mCG9h15-PbGVecalfyY9BZ7iLHSabFz18Jhf4BfMJoA0-bXhJJHSAVFUfcUfKjCfQAkd26GS3H78LjDAmXDYGgFkaBdmB04-2YDk%3D"
        alt="Youtube cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'cornsilk' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DownloadButton title="Audio" options={['MP3', 'FLAC', 'WAV']} />
          <DownloadButton title="Video" options={['MP4', 'MOV', 'FLV']} />
        </Box>
      </Box>
    </Card>
  );
};

export { YoutubeCard };

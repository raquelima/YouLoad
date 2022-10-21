import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { DownloadButton } from './DownloadButton';

export interface Informations {
  videoTitle: string
  channel: string,
  videoUrl: string,
  thumbnail: string,
  error: boolean
}

export interface VideoInformations{
  videoInformations: Informations
}

const YoutubeCard = ({videoInformations}: VideoInformations): JSX.Element => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        src={videoInformations.thumbnail}
        alt="Youtube cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'cornsilk' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {videoInformations.videoTitle}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div">
            {videoInformations.channel}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DownloadButton title="Audio" options={['MP3', 'FLAC', 'WAV']} url={videoInformations.videoUrl} />
          <DownloadButton title="Video" options={['MP4', 'MOV', 'FLV']} url={videoInformations.videoUrl} />
        </Box>
      </Box>
    </Card>
  );
};

export { YoutubeCard };

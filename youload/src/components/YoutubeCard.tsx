import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import { VideoButton } from './VideoButton';
import { AudioButton } from './AudioButton';

export interface Informations {
  videoTitle: string
  channel: string,
  videoUrl: string,
  thumbnail: string,
  updateSuccess: (args: string) => void,
  updateError: (args: string) => void,
  updateOnLoad: (args: boolean) => void
}

const YoutubeCard: React.FC<Informations> = ( props ) => {
  return (
    <Card sx={{ display: 'flex', widht: '80%' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        src={props.thumbnail}
        alt="Youtube cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'cornsilk' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {props.videoTitle}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div">
            {props.channel}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AudioButton options={['MP3', 'FLAC', 'WAV']} url={props.videoUrl} filename={props.videoTitle} updateSuccess={props.updateSuccess} updateError={props.updateError} updateOnLoad={props.updateOnLoad}/>
          <VideoButton options={['MP4', 'MOV', 'FLV']} url={props.videoUrl} filename={props.videoTitle} updateSuccess={props.updateSuccess} updateError={props.updateError} updateOnLoad={props.updateOnLoad}/>
        </Box>
      </Box>
    </Card>
  );
};

export { YoutubeCard };

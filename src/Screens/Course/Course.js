import React from 'react';
import './index.css';
import Playlist from './Playlist';
import ReactPlayer from 'react-player';
import { Box, Typography } from '@material-ui/core';
import useForceUpdate from 'use-force-update';
import VideoData from '../../VideoData';
export default () => {
    const [video, setVideo] = React.useState(VideoData[0].module_data[0].src);
    const [title, setTitle] = React.useState(VideoData[0].module_data[0].name);
    const [index, setIndex] = React.useState(VideoData[0].module_data[0]);
    const forceUpdate = useForceUpdate();
    const handleSetVideo = (index) => {
        setIndex(index);
        setVideo(index.src);
        setTitle(index.name);
    }
    const onVideoEnd = () => {
        index.completed = true;
        forceUpdate();
    }
    return (
        <Box className="course-view-container">
            <Box className="player-container">
                <Typography variant="body1" gutterBottom style={{ textAlign: "center", padding: '0 0 10px 0', fontWeight: 500 }}>COURSE OUTLINE</Typography>
                <Box className="player-wrapper">
                    <ReactPlayer url={video} playing={true} className='react-player'
                        config={{ file: { attributes: { controlsList: 'nodownload', onContextMenu: e => e.preventDefault() } } }}
                        onEnded={onVideoEnd}
                        width='100%'
                        height='100%'
                        controls={true} />
                </Box>
                <Typography variant="body1" gutterBottom style={{ color:'rgba(0, 0, 0, 0.87)', paddingLeft: 15, paddingTop: 15, fontWeight: 500, fontSize: 24 }}>{title}</Typography>
            </Box>
            <Box className="playlist">
                {VideoData.map(index => {
                    return (
                        <Playlist module={index} key={index.id} handleSetVideo={handleSetVideo} onVideoEnd={onVideoEnd} />
                    )
                })}
            </Box>
        </Box>
    )
}
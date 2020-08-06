/*eslint-disable*/
import React from 'react';
import './index.css';
import Playlist from './Playlist';
import ReactPlayer from 'react-player';
import { Box, Typography } from '@material-ui/core';
import useForceUpdate from 'use-force-update';
import VideoData from '../../VideoData';
export default () => {
    const [module, setModule] = React.useState(VideoData[0]);
    const [video, setVideo] = React.useState(VideoData[0].module_data[0].src);
    const [title, setTitle] = React.useState(VideoData[0].module_data[0].name);
    const [index, setIndex] = React.useState(VideoData[0].module_data[0]);
    const forceUpdate = useForceUpdate();
    const handleSetVideo = (index) => {
        setIndex(index);
        setVideo(index.src);
        setTitle(index.name);
    }
    const onVideoPlay = () => {
        VideoData.forEach(module=>{
            module.module_data.forEach(video=>{
                video.playing= false
            })
        })
        index.playing = true;
        forceUpdate();
    }
    const onVideoEnd = () => {
        index.completed = true;
        index.playing = false;
        // forceUpdate();
        /////////////////////////////////// Set next video
        let element = module.module_data.indexOf(index);
        if(element >= 0 && element < module.module_data.length - 1){
            let nextItem = module.module_data[element + 1]
            handleSetVideo(nextItem);
        }
        else{
            ////////////////////////////////////////// set next module
            let modulesElement = VideoData.indexOf(module);
            if(modulesElement >= 0 && modulesElement < VideoData.length - 1){
                let nextModule = VideoData[modulesElement+1]
                setModule(nextModule);
                handleSetVideo(nextModule.module_data[0]);
            }
        }
    }
    return (
        <Box className="course-view-container">
            <Box className="player-container">
                <Box className="player-wrapper">
                    <ReactPlayer
                        config={{ file: { attributes: { controlsList: 'nodownload', onContextMenu: e => e.preventDefault(), autoPlay: true, muted: true} } }}
                        playing={true}
                        url={video}
                        onPlay={onVideoPlay}
                        onEnded={onVideoEnd}
                        controls={true}
                        width='100%'
                        height='100%'
                        className='react-player'
                    />
                </Box>
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
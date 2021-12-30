import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from "axios";
import {API_KEY} from "../api";
import {img_500, unavailable, unavailableLandscape} from "../config/config";
import {Button} from "@material-ui/core";
import styled from "styled-components";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: "90%",
        height: "80%",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3),
    },
}));

function YouTubeIcon() {
    return null;
}

export default function ContentModal({children,media_type,id}) {
    const classes = useStyles();
    const [content, setContent] = useState();
    const [open, setOpen] = React.useState(false);
    const [video, setVideo] = useState();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const fetchData = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`
        );
        setContent(data);
        console.log(data)
    }
    const fetchVideo = async()=>{
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        setVideo(data.results[0]?.key);
    }
    useEffect(()=>{
        fetchData();
        console.log(content && content.poster_path)
        fetchVideo();
    },[])

    return (
        <div>
            <div type="button" onClick={handleOpen}>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {
                        content && <div className={classes.paper}>
                            <Content>
                                <div className={'medias'}>
                                   <div style={{width:"100%"}}>
                                       <img
                                           src={
                                               content.poster_path
                                                   ? `${img_500}/${content.poster_path}`
                                                   : unavailable
                                           }
                                           alt={content.name || content.title}
                                           className="ContentModal__portrait"
                                       />
                                       <img
                                           src={
                                               content.backdrop_path
                                                   ? `${img_500}/${content.backdrop_path}`
                                                   : unavailableLandscape
                                           }
                                           alt={content.name || content.title}
                                           className="ContentModal__landscape"
                                       />
                                   </div>

                                    <iframe src={`https://www.youtube.com/embed/${video}/`} title={id}
                                            frameBorder="0"/>
                                </div>
                                <div className="ContentModal__about">
                                <span className="ContentModal__title">
                                    {content.name || content.title} (
                                        {(
                                            content.first_air_date ||
                                            content.release_date ||
                                            "-----"
                                         ).substring(0, 4)}
                                        )
                                </span>
                                    {content.tagline && (
                                        <i className="tagline">{content.tagline}</i>
                                    )}
                                    <span className="ContentModal__description">
                                        {content.overview}
                                     </span>

                                    <div>
                                        <Carousel media_type={ media_type} id={id} />
                                    </div>

                                    <Button
                                        variant="contained"
                                        startIcon={<YouTubeIcon />}
                                        color="secondary"
                                        target="__blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                    >
                                        Watch the Trailer
                                    </Button>

                                </div>
                            </Content>
                        </div>
                    }

                </Fade>
            </Modal>
        </div>
    );
}
const Content = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap");
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  
  .tagline {
    padding-bottom: 10px;
    align-self: center;
  }
  .ContentModal__portrait {
    display: none;
    object-fit: contain;
    border-radius: 10px;
  }
  .ContentModal__landscape {
    object-fit: contain;
    border-radius: 10px;
  }
  .medias
  {
    div{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    iframe{
      border-radius: 10px;
      margin-top: 20px;
    }
  }

 &::-webkit-scrollbar {
    display: none;
  }

  .ContentModal__about {
    padding: 10px;
    display: flex;
    flex-direction: column;
    font-family: "Roboto", sans-serif;
    justify-content: space-evenly;
    font-weight: 300;
  }

  span.ContentModal__title {
    font-size: 30px!important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ContentModal__description {
    display: flex;
    height: auto!important;
    padding: 15px;
    border-radius: 20px;
    scrollbar-width: thin; /* Firefox */
    box-shadow: inset 0 0 5px #000000;
    text-align: justify;
  }

  .ContentModal__description::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 835px) {
    iframe{
     width: 100%;
      min-width: 300px!important;
    }
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 0;
    .ContentModal__landscape {
      display: none;
    }
    .ContentModal__portrait {
      display: flex;
      width: 38%;
    }
      
    .ContentModal__about {
      width: 58%;
      padding: 0;
      height: 100%;
    }
    .ContentModal__title {
      font-size:20px!important;
    }
    .ContentModal__description {
      font-size: 22px;
    }
  }

`

import React, {useEffect, useState} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from "axios";
import styled from 'styled-components';
import {API_KEY} from "../api";
import {img_300, noPicture} from "../config/config";
const handleDragStart = (e) => e.preventDefault();

const Carousel = ({media_type,id}) => {
    const [credits,setCredits] = useState([]);

    const items = credits.map(c=>(
        <Content>
            <img
                src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
                alt={c?.name}
                onDragStart={handleDragStart}
                className="carouselItem__img"
            />
            <b className="carouselItem__txt">{c?.name}</b>
        </Content>
    ))
    const responsive = {
        0:{
            items:3
        },
        512:{
            items:5
        },
        1024:{
            items:7
        }
    }
    const fetchCredits =async ()=>{
       const credits = await axios.get( `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${API_KEY}&language=en-US`);
        return credits.data
    }
    useEffect(() => {
        fetchCredits()
            .then(data=>setCredits(data.cast))
            .catch(err=>console.log(err.message))
    }, []);
    return (
        <AliceCarousel
            autoPlay
            responsive={responsive}
            mouseTracking
            infinite
            disableDotsControls
            disableButtonsControls
            items={items}
        />
    );
}
const Content = styled.div`
    display: flex;
    flex-direction: column;
    object-fit: contain;
    padding: 10px;
img {
    border-radius: 10px;
    margin-bottom: 5px;
    box-shadow: 0 0 5px black;
  }

`
export default Carousel;
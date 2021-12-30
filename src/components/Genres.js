import styled from 'styled-components';
import axios from "axios";
import {API_KEY} from "../api";
import {useEffect} from "react";
import {Chip} from "@mui/material";
export default function Genres (props){
    const {  selectedGenres,
        setSelectedGenres,
        genres,
        setGenres,
        type,
        setPage} = props;
    const fetchGenres =async ()=>{
       return await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`)
    }
    useEffect(()=>{
        fetchGenres()
            .then(data=>setGenres(data.data.genres))
            .catch(err=>console.log(err.message))
        return ()=>{
            setGenres({})
        }
    },[]);
    const handleAdd= (genre) => {
       setSelectedGenres([...selectedGenres,genre]);
       setGenres(genres.filter(g=>g.id!==genre.id))
        setPage(1)
    };
    const handleDelete=(g)=>{
        setSelectedGenres(selectedGenres.filter(i=>i.id!==g.id));
        setGenres([g,...genres]);
        setPage(1)
    }
    return(
        <Content>
            {
                selectedGenres.length ? selectedGenres.map(g=>(
                    <Chip
                        style={{margin:5}}
                        key={g.id}
                        label={g.name}
                        color='primary'
                        onDelete={()=>handleDelete(g)}
                    />
                )):null
            }
            {
                genres.length ? genres.map(g=>(
                    <Chip
                        style={{margin:5}}
                        key={g.id}
                        label={g.name}
                        variant='outlined'
                        onClick={()=>handleAdd(g)}
                    />
                )):null
            }


        </Content>
    )
}
const Content = styled.div`
display: flex;
  flex-wrap: wrap;
flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;


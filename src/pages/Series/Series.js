import SingleContent from "../../components/SingleContent";
import CustomPagination from "../../components/CustomPagination";
import {Content} from "../Trending/Trending";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_KEY} from "../../api";
import Genres from "../../components/Genres";
import {useGenres} from "../../hooks/useGenres";
function Series (){
    const [page,setPage] = useState(1)
    const [allPages,setAllPages] = useState(10)
    const [content, setContent] = useState([])
    const [selectedGenres,setSelectedGenres]= useState([]);
    const [genres,setGenres] = useState([]);
    const genreForUrl = useGenres(selectedGenres);
    const fetchMovies = async ()=>{
        return await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`);
    }
    useEffect(()=>{
        window.scroll(0,0);
        fetchMovies()
            .then(data=>{
                setContent(data.data.results)
                setAllPages(data.data.total_pages);
            })
            .catch(err=>console.dir(err.message))
    },[page,genreForUrl])
    return (
        <Content>
            <Genres
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                type="tv"
                setPage={setPage}
            />
            <span className={'pageTitle'}>Trending Movies</span>
            <div className="list">
                {
                    content && content.map(c=>(
                        <SingleContent key={c.id} {...c} media_type={'tv'}/>
                    ))
                }
            </div>
            <CustomPagination numOfPages={allPages} setPage={setPage} />
        </Content>
    )
}
export default Series;
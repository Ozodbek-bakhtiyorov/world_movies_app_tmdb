import {useEffect, useState} from "react";
import axios from "axios";
import {API_KEY} from "../../api";
import SingleContent from "../../components/SingleContent";
import {Content} from '../Trending/Trending'
import CustomPagination from "../../components/CustomPagination";
import Genres from "../../components/Genres";
import {useGenres} from "../../hooks/useGenres";
import Loader from "../../components/Loader";
function Movs (){
    const [page,setPage] = useState(1)
    const [allPages,setAllPages] = useState(10)
    const [content,setContent] = useState([]);
    const [selectedGenres,setSelectedGenres]= useState([]);
    const [genres,setGenres] = useState([]);
    const genreForUrl = useGenres(selectedGenres);
    console.log(genreForUrl)
    const fetchMovies = async ()=>{
        return await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`);
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
            <span className={'pageTitle'}>Movies</span>
            <Genres
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                type="movie"
                setPage={setPage}
            />
            <div className="list">
                {
                   content.length ? content.map(mov=>(
                        <SingleContent key={mov.id} {...mov} media_type={'movie'}/>
                    )):<Loader/>
                }
            </div>
            <CustomPagination numOfPages={allPages} setPage={setPage}/>
        </Content>
    )
}
export default Movs;
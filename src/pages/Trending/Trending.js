import axios from "axios";
import {useEffect, useState} from "react";
import {API_KEY} from "../../api";
import SingleContent from "../../components/SingleContent";
import styled from 'styled-components'
import CustomPagination from "../../components/CustomPagination";
import Loader from "../../components/Loader";
function Trending (){
    const [page,setPage] = useState(1)
    const [allPages,setAllPages] = useState(10)
    const [content, setContent] = useState([])
    const fetchTrending = async ()=>{
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/week/day?api_key=${API_KEY}&page=${page}`);
        setContent(data.results)
        setAllPages(data.total_pages)
    }
    useEffect(()=>{
        fetchTrending()
    },[page])
        return (
            <Content>
                <span className={'pageTitle'}>Trending Movies</span>
                  <div className="list">
                      {
                          content.length ? content.map(c=>(
                              <SingleContent key={c.id} {...c}/>
                          )):<Loader/>
                      }
                  </div>
                <CustomPagination numOfPages={allPages} setPage={setPage}/>
            </Content>
        )
}
export const Content = styled.div`
  position: relative;
 .list{
   display: grid;
   grid-gap: 20px;
   grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
 }
  @media screen and (max-width: 550px){
    .list{
      grid-gap: 15px;
      grid-template-columns: repeat(auto-fill,minmax(150px,1fr));
    }
  } 
  @media screen and (max-width: 350px){
    .list{
      grid-gap: 15px;
      grid-template-columns: repeat(auto-fill,minmax(100px,1fr));
    }
  }
`
export default Trending;
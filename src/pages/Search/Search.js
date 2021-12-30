import styled from 'styled-components';
import {Button, createTheme, Tab, Tabs, TextField} from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';
import SearchIcon from "@mui/icons-material/Search";
import {useEffect, useState} from "react";
import {API_KEY} from "../../api";
import axios from "axios";
import CustomPagination from "../../components/CustomPagination";
import {Content} from "../Trending/Trending";
import SingleContent from "../../components/SingleContent";
import Loader from "../../components/Loader";
const darkTheme = createTheme({
    palette:{
        type:'dark',
        primary:{
            main:'#fff',
        }
    }
})
function Search (){
    const [type,setType] = useState();
    const [page,setPage] = useState(1);
    const [searchText,setSearchText] = useState('');
    const [content, setContent] = useState([]);
    const [allPages,setAllPages] = useState(0   )
    const handleChange = (event, newValue) => {
        setType(newValue);
        setPage(1);
    };
    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            );
            setContent(data.results);
            setAllPages(data.total_pages);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(()=>{
        window.scroll(0,0);
        fetchSearch();
    },[type,page])
    const handleKey = (e)=>{
        if(e.key=='Enter'){
            fetchSearch()
        }
    }
    return (
        <SearchContent>
            <span className={'pageTitle'}>Search</span>
            <ThemeProvider theme={darkTheme}>
               <div style={{display:'flex',marginTop:'20px'}}>
                   <TextField
                       label="Search"
                       style={{flex:'.7'}}
                       variant="filled"
                       onKeyDown={handleKey}
                       onChange={(e)=>setSearchText(e.target.value)}
                   />
                   <Button
                       variant='contained'
                       style={{marginLeft:10}}
                       onClick={fetchSearch}
                   >
                       <SearchIcon/>
                   </Button>
               </div>
                <Tabs
                    value={type}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    style={{
                        padding:'20px 0'
                    }}
                >
                    <Tab style={{width: '50%'}} label="Search Movies" />
                    <Tab style={{width: '50%'}} label="Search TV Series" />
                </Tabs>
               <Content>
                   <div className="list">
                       {
                           content.length ? content.map(c=>(
                               <SingleContent key={c.id} {...c} media_type={type ? 'tv':'movie'}/>
                           )):<Loader/>
                       }
                       {searchText &&
                           !content.length && (type ? <h3>No Series Found</h3>:<h3>No Moves Found</h3>)
                       }
                   </div>
                   <CustomPagination numOfPages={allPages} setPage={setPage}/>
               </Content>
            </ThemeProvider>
        </SearchContent>
    )
}
const SearchContent = styled.div``;
export default Search;
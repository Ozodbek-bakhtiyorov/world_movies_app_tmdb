import styled from 'styled-components'
import Pagination from '@mui/material/Pagination';
import { purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
            darker: '#858505',
        }
    }
});
export default function CustomPagination (props) {
    const {setPage,numOfPages=0} = props;
    const handlePage = (page)=>{
        setPage(page);
        window.scroll(0,0);
    }
        return (
            <Content>
                {!(numOfPages <= 1) ? <ThemeProvider theme={theme}>
                     <Pagination
                        count={numOfPages}
                        variant="outlined"
                        shape="rounded"
                        color="primary"
                        style={{color: 'white!important'}}
                        onChange={(e) => handlePage(e.target.textContent)}
                    />
                </ThemeProvider>:null   }

            </Content>
        );
}
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`
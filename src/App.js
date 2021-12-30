import styled from 'styled-components';
import Header from "./components/Header";
import MainNav from "./components/MainNav";
import {BrowserRouter,Switch as Switcher, Route} from "react-router-dom";
import {Container} from "@mui/material";
import Trending from "./pages/Trending/Trending";
import Movs from "./pages/Movies/Movs";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";
function App() {
  return (
      <BrowserRouter>
          <Header/>
          <Content >
              <Container>
                  <Switcher>
                      <Route exact path='/' component={Trending}/>
                      <Route  path='/movies' component={Movs}/>
                      <Route  path='/series' component={Series}/>
                      <Route  path='/search' component={Search}/>
                      <Route><h1>Not Found</h1></Route>
                  </Switcher>
              </Container>
          </Content >
          <MainNav/>
      </BrowserRouter>
  );
}
const Content = styled.div`
  min-height: 100vh;
  background-color: #341e1e;
  color: white;
  padding-top: 130px;
  padding-bottom: 70px;
  @media (max-width: 700px) {
    padding-top: 70px;
  }
`
export default App;

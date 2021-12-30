import {createGlobalStyle} from "styled-components";
export const GlobalStyles = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin: 0;padding: 0; 
    text-decoration: none;
    scroll-behavior: smooth;
  }
  body{
    font-family: 'Montserat',sans-serif;
  }
  .pageTitle {
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    font-family: "Montserrat", sans-serif;
    font-size: 50px;
    padding-bottom: 20px;
    border-radius: 50px;
    color: white;
  }

  @media (max-width: 1000px) {
    .pageTitle {
      font-size: 6.4vw;
    }
  }
`
import React from 'react';
import styled from 'styled-components';
const Header = () => {
  return (
    <Content>
      <span> 🎬 The Best Movies 🎥</span>
    </Content>
  );
}
const Content = styled.div`
    width: 100%;
    cursor: pointer;
    position: fixed;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    background-color: #39445a;
    font-family: "Montserrat", sans-serif;
    padding-bottom: 15px;
    box-shadow: 0 1px 5px black;
    color: white;
  span{
    font-size:40px;
  }
  top: 0;
    z-index: 100;
  @media (max-width: 1000px) {
      padding-top: 15px;
   //span{
   //  font-size: 16px;
   //}
  }
  @media (max-width: 768px) {
      padding-top: 10px;
      span{
        font-size: 30px;
      }
  }  
  @media (max-width: 468px) {
      span{
        font-size: 20px;
      }
  }

`

export default Header;

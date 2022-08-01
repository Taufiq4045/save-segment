import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin:0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }
`;

export const Header = styled.div`
   top : 0;
   height : 3rem;
   width : 100%;
   background-color : #17ACA7;
   h4 {
    float: left;
    color: white;
    text-align: center;
    padding-top:  13px;
    text-decoration: none;
    font-size: 17px;
   }
   i {
    float: left;
    margin: 18px;
    border: solid white;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
   }
`;
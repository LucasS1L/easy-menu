import { styled } from "styled-components";




export const LogoContainer = styled.img`
    width: 100%;
    height: 27vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const MainContainer = styled.main`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.paleWhite};
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    overflow: auto;
`
export const Image = styled.img`
    width: 30vw;
    height: 60vh;
    background: transparent;
`

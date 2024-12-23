import { styled } from 'styled-components';

export const DivLogin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 300px;
    max-width: 500px;
    min-height: 300px;
    width: 60vw;
    height: 100vh;
    margin: 0 auto;

    .area-login {
        min-width: 300px;
        min-height: 300px;
        max-height: 500px;
        background-color: #FFFFFF;
        height: 60%;
        width: 80%;
        border-radius: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 1px 1px 2px #000000;
        flex-direction: column;
    }

    .title-login {
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title-login h1 {
        font-size: 5em;
        font-family: sans-serif;
        font-weight: bold;
        color: rgba(17, 16, 29, 1);
    }

    footer {
        font-weight: 600;
        color: #FFFFFF;
        position: absolute;
        bottom: 0;
        margin-bottom: 5px;
        font-size: 1em;
        text-align: center;
    }

    footer i {
        margin-left: 10px;
    }

`
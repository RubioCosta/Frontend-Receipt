import { styled } from 'styled-components';

export const DivDashboard = styled.div`

    padding: 10px;
    width: 100%;

    .area-graph {
        display: flex;
        height: 300px;
    }

    .time-line {
        flex: 3;
    }

    .total-users {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
    }

    .circle {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 6px solid #000;
        height: 250px;
        width: 250px;
        border-radius: 100%;
    }

    .circle h3 {
        font-size: 3em;
        font-weight: 600;
        margin: 0px;
    }

    .circle h4 {
        margin: 0;
        font-size: 1em;
    }

    .totalValue {
        border: none ;
        box-shadow: 1px 1px 5px #CCC;
        width: 80%;
        margin: 20px auto;
    }

    .totalValue label {
        margin-left: 20px;
        font-size: .8em;
    }

    input {
        border: none !important;
    }

    input[type=text]:not(.browser-default), input[type=password]:not(.browser-default) {
        padding-left: 10px;
        font-size: 1.2em;
        font-weight: 700;
    }

    .totalValue {
        position: relative;
    }

    input {
        padding-right: 30px; /* Espaço suficiente para o ícone do olho */
        width: 150px; /* Ajuste conforme necessário */
    }

    button {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
    }

    .lnr-eye {
        font-size: 1.5rem;
        color: rgba(83, 0, 242, 1);
    }

    @media screen and (max-width: 700px) {
        .time-line {
            display: none;
        }
    }

`
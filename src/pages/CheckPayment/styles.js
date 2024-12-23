import { styled } from 'styled-components';

export const DivCheck = styled.div`

    padding: 10px;
    width: 100%;
    min-height: 100svh;

    .input {
        margin-top: 20px;
    }

    .btn-custom {
        flex: 1;
        min-width: 100px;
    }

    table {
        margin-top: 20px;
        background-color: #a9dd32;
    }

    thead tr {
        background-color: #CCC;
        margin-top: 10px;
    }

    th {
        padding: 0px;
        height: 50px;
        font-size: .8em;
        font-weight: bolder;
        padding-left: 10px;
    }

    td{
        padding-left: 10px;
    }

    
    tbody tr td {
        font-size: .7em;
        height: 15px;
        font-weight: 600;
    }

    .line {
        cursor: pointer;
    }

    .line-done {
        background-color: #a9dd32;
    }

    .line.line-done:hover {
        background-color: #93cf09;
    }

    .line-pending { 
        background-color: #e14d4d;
    }

    .line.line-pending:hover {
        background-color: #d52121;
    }

    .line-pending {
        color: #FFFFFF;
    }

    footer {
        font-size: .8em;
        box-sizing: border-box !important;
        position: fixed;
        z-index: 9999;
        bottom: 0;
        left: 90px;
        right: 0;
        background-color: #CCC;
        width: calc(100% - 100px );
        display: flex;
        justify-content: space-around;
        transition: .5s;
        align-items: center;
        height: 50px;
    }

    .isOpen {
        left: 260px;
        width: calc(100% - 270px );
        transition: .5s;
    }

    .subtitle {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .subtitle p {
        margin-left: 10px;
    }

    .pending {
        background-color: #e14d4d;
    }

    .done {
        background-color: #a9dd32;
    }

    .done, .pending {
        height: 20px;
        width: 20px;
        border-radius: 10px;
    }

    table {
        margin-bottom: 43px;
    }

`
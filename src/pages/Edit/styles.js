import { styled } from 'styled-components';

export const DivEdit = styled.div`

    padding: 10px;
    width: 100%;

    .area-form {
        margin: 20px auto;
        max-width: 600px;
        justify-content: center;
        align-items: flex-start;
        box-shadow: 1px 1px 10px #CCC;
        padding: 20px;
        border-radius: 20px;
    }

    .area-inputs {
        width: 100%;
    }

    .row .col {
        padding: 0px;
    }

    .input input {
        margin-left: 10px;
    }

    .area-btn {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn-custom {
        width: 150px;
    }

    .btn-custom:first-child {
        margin-right: 10px;
    }
    
    p {
        width: 96%;
    }

    .checkbox span {
        color: rgba(83, 0, 242, 1);;
    }
`
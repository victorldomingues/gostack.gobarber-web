import styled, { css } from "styled-components";
import Tooltip from "../tooltip";

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`

    background: #232129;
    border-radius: 10px;
    padding: 15px;
    width: 100%;
    display: flex;

    color: #666360;
    border: 2px solid #232129;


    ${props => props.isErrored && css`
        border-color: #AC3030;
        color: #AC3030;
    `}

    ${props => props.isFocused && css`
        color: #ff9000;
        border-color: #ff9000;
    `}

    ${props => props.isFilled && css`
        color: #ff9000;
    `}


    & + div {
            margin-top: 10px;
        }
    &::placeholder{
        color: #666360;
    }
    input {
        flex: 1;
        border: 0;
        background: transparent;
        color: #f4ede8;
  
    }

    /* pega o primero svg dentro do container */
    > svg {
        margin-right: 16px;
    }

`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;
    span{
        background: #c53030 ;
        color: #fff;
        &::before{
            border-color:  #c53030 transparent;
        }
    }
`;
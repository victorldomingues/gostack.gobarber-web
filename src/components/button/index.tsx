import React, { FC, ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}
const Button: FC<ButtonProps> = ({ children, ...rest }) => (<Container type="button" {...rest}> {children} </Container>);

export default Button;
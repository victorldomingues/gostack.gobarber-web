import React, { FC, InputHTMLAttributes, ComponentType, useEffect, useRef, useState, useCallback } from 'react';
import { Container, Error } from './styles';
import { IconBaseProps } from 'react-icons/lib';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon: ComponentType<IconBaseProps>;
}
const Input: FC<InputProps> = ({ icon: Icon, name, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [isErrored, setIsErrored] = useState(false);

    const { fieldName, defaultValue, error, registerField } = useField(name);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputRef.current?.value);
    }, []);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    }, [])

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField])
    return (<Container
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused} >
        {Icon && (<Icon size={20} />)}
        <input
            defaultValue={defaultValue}
            ref={inputRef}
            type="text"
            {...rest}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
        />

        {error && (<Error title={error}><FiAlertCircle size={20} /> </Error>)}

    </Container>)
};

export default Input;
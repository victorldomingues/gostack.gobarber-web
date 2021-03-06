import React, { FC, useCallback } from 'react';

import { Container } from './styles'
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { ToastMessage, useToast } from '../../hooks/toast';
import Toast from './Toast';
import { useTransition } from 'react-spring';
interface ToastProps {
    messages: ToastMessage[];
}

const ToastContainer: FC<ToastProps> = ({ messages }) => {

    const messagesWithTransitions = useTransition(
        messages,
        message => message.id,
        {
            from: { right: '-120%', opacity: 0 },
            enter: { right: '0%', opacity: 1 },
            leave: { right: '-120%', opacity: 0 },
        }
    );

    return (
        <Container>
            {messagesWithTransitions.map(({ item, key, props }) => (
                <Toast key={key} style={props} toast={item} />
            ))}

        </Container>
    );
}

export default ToastContainer;
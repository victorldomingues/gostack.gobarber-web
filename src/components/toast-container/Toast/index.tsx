import React, { FC, useCallback, useEffect } from 'react';

import { Container } from './styles'
import { FiAlertCircle, FiXCircle, FiInfo, FiCheckCircle } from 'react-icons/fi';
import { ToastMessage, useToast } from '../../../hooks/toast';


interface ToastProps {
    toast: ToastMessage;
    style: object;
}

const icons = {
    info: <FiInfo size={24} />,
    success: <FiCheckCircle size={24} />,
    error: <FiAlertCircle size={24} />
}

const Toast: FC<ToastProps> = ({ toast, style }) => {

    const { removeToast } = useToast();


    useEffect(() => {

        const timer = setTimeout(() => {
            removeToast(toast.id);
        }, 3000)

        return () => {
            clearTimeout(timer);
        }

    }, [removeToast, toast.id]);

    const handleRemoveToast = useCallback((id: string) => {
        removeToast(id);
    }, []);
    return (
        <Container type={toast.type} hasDescription={!!toast.description} style={style}>

            {icons[toast.type || 'info']}

            <div>
                <strong>{toast.title}</strong>
                {toast.description &&
                    <p>{toast.description}</p>
                }
            </div>
            <button onClick={() => handleRemoveToast(toast.id)}>
                <FiXCircle size={18} />
            </button>
        </Container>
    );
}


export default Toast;
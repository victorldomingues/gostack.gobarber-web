import React, { FC, useCallback, useRef } from "react";
import { Container, Content, Background, AnimationContainer } from "./styles";
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import logo from '../../assets/logo.svg'
import Input from "../../components/input";
import Button from "../../components/button";
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from "../../utils/get-validation-erros";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import { useToast } from "../../hooks/toast";

interface SignupFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: FC = () => {
    const formRef = useRef<FormHandles>(null);
    const toast = useToast();
    const history = useHistory();
    const handleSubmit = useCallback(async (data: SignupFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email  obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No minimo 6 digitos')
            });
            await schema.validate(data, {
                abortEarly: false,
            })

            await api.post('/users', data);

            toast.addToast({
                type: "info",
                title: 'Cadastro realizado!',
                description: 'Você ja pode fazer seu seu logon no GoBarber!'
            })

            history.push('/')

        } catch (err) {

            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }

            console.error(err);

            toast.addToast({
                type: 'error',
                description: 'Ocorreu um erro ao fazer cadastro, cheque as informações.',
                title: 'Erro ao realizar cadastro'
            });


        }
    }, []);
    return (
        <>
            <Container>

                <Background />
                <Content>
                    <AnimationContainer>
                        <img src={logo} alt='GoBarber' />
                        <Form ref={formRef} initialData={{}} onSubmit={handleSubmit}>
                            <h1>Faça o seu Logon</h1>
                            <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
                            <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
                            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                            <Button type="submit" placeholder="E-mail" > Cadastrar </Button>
                        </Form>
                        <Link to="/"> <FiArrowLeft /> Voltar para logon </Link>
                    </AnimationContainer>
                </Content>
            </Container>
        </>)
};

export default SignUp;
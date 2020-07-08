import React, { FC, useCallback, useRef } from "react";
import { Container, Content, Background, AnimationContainer } from "./styles";
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logo from '../../assets/logo.svg'
import Input from "../../components/input";
import Button from "../../components/button";
import { Form } from '@unform/web';
import { FormHandles } from "@unform/core";
import getValidationErrors from "../../utils/get-validation-erros";
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';
import { useToast } from "../../hooks/toast";
import { Link, useHistory } from "react-router-dom";

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: FC = () => {

    const formRef = useRef<FormHandles>(null);

    const { signIn, user } = useAuth();

    const toast = useToast();

    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().required('Email  obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No minimo 6 digitos')
            });
            await schema.validate(data, {
                abortEarly: false,
            })
            await signIn(data);

            history.push('/dashboard')

        } catch (err) {

            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }

            console.error(err);

            toast.addToast({
                type: 'error',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
                title: 'Erro ao realizar login'
            });

        }
    }, [signIn]);
    return (
        <>
            <Container>
                <Content>
                    <AnimationContainer>
                        <img src={logo} alt='GoBarber' />
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <h1>Faça o seu Logon</h1>
                            <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
                            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                            <Button type="submit" placeholder="E-mail" > Entrar </Button>
                            <a>Esqueci minha senha</a>
                        </Form>
                        <Link to='/signup'>
                            <FiLogIn /> Criar conta
                    </Link>
                    </AnimationContainer>
                </Content>
                <Background />

            </Container>
        </>)
};

export default SignIn;
import React, { createContext, FC, useCallback, useState, useContext } from "react";
import api from "../services/api";

interface AuthState {
    token: string;
    user: object;
}

interface SignCreadentials {
    email: string;
    password: string;
}
interface AuthContextData {
    user: object;
    signIn(creadentials: SignCreadentials): Promise<void>;
    signOut(): void;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: FC = ({ children }) => {

    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if (user && token) {
            return { token, user: JSON.parse(user) }
        }
        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password
        });
        const { user, token } = response.data;
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));
        localStorage.setItem('@GoBarber:token', token);
        setData({ token, user });
    }, []);

    const signOut = () => {
        localStorage.removeItem('@GoBarber:user');
        localStorage.removeItem('@GoBarber:token');
    };
    return (<AuthContext.Provider value={{ user: data.user, signIn, signOut }}> {children} </AuthContext.Provider>);
};

export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext);
    if (!context) {
        throw Error('useAuth must be used within an AuthProvider')
    }
    return context;
}


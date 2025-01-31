"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
    user: {
        idUsuario: number;
        nome: string;
        email: string;
        tipo: string;
        status: string;
    };
    updateUser: (u) => void;
    clearUser: () => void;
}

export const defaultUser = {
    idUsuario: 1,
    tipo: "CLIENTE",
    status: "",
    nome: "[NAME]",
    email: "[EMAIL]",
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(defaultUser);

    useEffect(() => {
        let u = localStorage.getItem("user");
        if (!u) {
            u = defaultUser;
        } else {
            u = JSON.parse(u);
        }
        setUser(u);
    }, []);

    const updateUser = (u) => {
        setUser(u);
        localStorage.setItem("user", JSON.stringify(u));
    };

    const clearUser = () => {
        setUser(defaultUser);
    };

    const value = {
        user,
        updateUser,
        clearUser
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
    const context = useContext(UserContext);

    if (context == null) {
        throw new Error("Não foi possível recuperar o Contexto");
    }

    return context;
}

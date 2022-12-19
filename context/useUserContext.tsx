import { createContext, useState } from 'react';

declare const ethereum: any;

interface IUserContext {
    currentAddress: string;
    setCurrentAddress: (address:string)=>void;
    isLogin: boolean;
    setIsLogin: (logined: boolean)=>void

}

export const UserContext = createContext<IUserContext>({
    currentAddress: '',
    setCurrentAddress: ()=>{},
    isLogin: false,
    setIsLogin: ()=>{}
});

export const UserContextProvider = ({children} : {children : React.ReactNode}) => {
    const [currentAddress, setCurrentAddress] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(false);

    return (
        <UserContext.Provider value={{currentAddress, setCurrentAddress, isLogin, setIsLogin}}>{children}</UserContext.Provider>
    );
}
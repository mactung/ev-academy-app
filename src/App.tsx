import React, { useEffect } from 'react';
import { useAppDispatch } from './stores/hooks';
import { setUser } from './stores/slices/storageSlice';
import { getUserByAccessToken } from './services/service';
import Cookies from 'universal-cookie';
import Routers from './router';

const App: any = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const cookies = new Cookies();
        if (cookies.get('access_token')) {
            getUserByAccessToken().then((dataUser) => {
                if (dataUser) {
                    dispatch(setUser(dataUser));
                }
            });
        }
    }, []);
    return <Routers />;
};

export default App;

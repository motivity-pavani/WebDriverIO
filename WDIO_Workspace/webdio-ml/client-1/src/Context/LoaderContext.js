import React, { createContext, useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const LoaderContext = createContext({
    setIsLoader: (con) => { },
    setLogo: (con) => { },
    logo: ""
});
export const LoaderProvider = ({ children }) => {
    const [isLoader, setIsLoader] = useState(false)
    const [logo, setLogo] = useState(false)
    useEffect(() => {
        if (localStorage && localStorage.userData) {
            let user = JSON.parse(localStorage.userData);
            setLogo(user.image)
        }
    }, [])

    return <LoaderContext.Provider value={{
        setIsLoader: setIsLoader,
        setLogo: setLogo,
        logo: logo
    }} >
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoader}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        {children}
    </LoaderContext.Provider>

}
export default LoaderContext;
import React from 'react'
export const userContext = React.createContext({
    isLoggedIn:false,
    profileData:null,
    // toggleLogin: () => {},
});

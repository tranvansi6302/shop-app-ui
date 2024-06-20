import { createContext, useState } from 'react'
import { getAccessToken, getProfile } from '../utils/helpers'

export const AppContext = createContext()

const initAppContext = {
    isAuthenticated: Boolean(getAccessToken()),
    setIsAuthenticated: () => null,
    profile: getProfile(),
    setProfile: () => null
}

export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(initAppContext.isAuthenticated)
    const [profile, setProfile] = useState(initAppContext.profile)

    const contextValue = {
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile
    }

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
// md5 sha1 sha256 sha512

export const getMinMaxPrice = (items) => {
    if (!items || items.length === 0) return 0
    const prices = items?.map((item) => item.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    return { minPrice, maxPrice }
}

export const saveAccessToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken)
}

export const getAccessToken = () => {
    return localStorage.getItem('accessToken') || ''
}

export const cleanAccessToken = () => {
    localStorage.removeItem('accessToken')
}

export const getProfile = () => JSON.parse(localStorage.getItem('profile'))

export const setProfile = (profile) => {
    localStorage.setItem('profile', JSON.stringify(profile))
}

export const cleanProfile = () => {
    localStorage.removeItem('profile')
}

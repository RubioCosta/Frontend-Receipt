
export const requestUserConfig = (token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    return config
}
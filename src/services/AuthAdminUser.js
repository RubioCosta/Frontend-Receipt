import axios from 'axios';

async function login(email, password) {

    try {
        
        const dataUser = {
            email,
            password
        }

        const response = await axios.post(`https://backend-receipt-production.up.railway.app/api/admin/login`, dataUser)

        return response.data

    } catch(err) {
        throw err.response.data
    }
}

const AuthService = {
    login
}

export default AuthService;
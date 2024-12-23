import axios from 'axios';
import { requestUserConfig } from '../utils/config';

async function showAllUsers(admin, token, date) {

    try {
        const config = requestUserConfig(token)

        const response = await axios.get(`https://backend-receipt-production.up.railway.app/api/user/${admin.id}?date=${date}`, config)

        return response.data

    } catch(err) {
        throw err.response.data
    }
}

async function updateUser(admin, token, data) {
    try {

        const config = requestUserConfig(token)

        const userData = {
            userId: data.userId,
            name: data.name,
            school: data.schoolName,
            mother_name: data.motherName,
            telephone_number: data.phoneNumber,
            month_value: data.monthlyValue,
            status: data.check
        }

        const response = await axios.post(`https://backend-receipt-production.up.railway.app/api/user/update/${admin.id}`, userData, config)

        return response.data

    } catch(err) {
        throw err.response.data
    }
}

async function registerUser(admin, token, data) {

    try {

        const config = requestUserConfig(token)

        const userData = {
            name: data.name,
            school: data.schoolName,
            mother_name: data.motherName,
            telephone_number: data.phoneNumber,
            month_value: data.monthlyValue
        }

        const response = await axios.post(`https://backend-receipt-production.up.railway.app/api/user/${admin.id}`, userData, config)

        return response.data

    } catch(err) {
        throw err.response.data
    }

}

async function searchUserName(admin, token, searchName, date) {

    try {

        const config = requestUserConfig(token);

        const response = await axios.get(`https://backend-receipt-production.up.railway.app/api/user/search/${admin.id}?searchName=${searchName}&date=${date}`, config)

        return response.data

    } catch(err) {
        throw err.response.data
    }

}

async function checkPaymentUser(token, userId, date, monthValue) {

    try {
        
        const config = requestUserConfig(token);

        const userData = {
            userId,
            date,
            monthValue
        }

        const response = await axios.post(`https://backend-receipt-production.up.railway.app/api/payment/`, userData, config)

        return response.data

    } catch(err) {
        throw err.response.data
    }

}

async function generateRecepitUsers(admin, token) {

    try {
        const config = requestUserConfig(token);

        const response = await axios.get(`https://backend-receipt-production.up.railway.app/api/user/receipt/${admin.id}`, config)

        return response.data

    } catch(err) {
        throw err.response.data
    }
}

const UserService = {
    showAllUsers,
    registerUser,
    searchUserName,
    checkPaymentUser,
    generateRecepitUsers,
    updateUser
}

export default UserService;
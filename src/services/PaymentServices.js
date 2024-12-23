import axios from 'axios';
import { requestUserConfig } from '../utils/config';

async function dataDashboard(admin, token) {

    try {

        const config = requestUserConfig(token);
        
        const response = await axios.get(`https://backend-receipt-production.up.railway.app/api/payment/${admin.id}`, config)

        return response.data

    } catch(err) {
        throw err.response.data
    }

}


const PaymentService = {
    dataDashboard,
}

export default PaymentService;
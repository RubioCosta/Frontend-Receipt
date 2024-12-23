import { useEffect, useContext, useState } from "react"

// Styles
import { DivDashboard } from "./styles"

// Components
import { TimeLineGraph } from "../../components/TimeLineGraph/TimeLineGraph"

// Services
import PaymentService from "../../services/PaymentServices";

// Context
import { AuthContext } from "../../context/AuthContext";

// Utils
import { alertMessage, formatCurrency } from '../../utils/utilityFunction'

export function Dashboard(){

    const [ data, setData ] = useState([])
    const [ totalUser , setTotalUser ] = useState('0')
    const [ totalPayment, setTotalPayment ] = useState('0')
    const [ total, setTotalValue ] = useState('0')

    const { token, admin } = useContext(AuthContext)

    const [showValue, setShowValue] = useState(false);

    const handleToggleValue = () => {
      setShowValue(!showValue);
    };

    useEffect(() => {

        const getData = async () => {

            if (!token) {
                return
            }

            try {

                const response = await PaymentService.dataDashboard(admin, token)

                setData(response.paymentsMonth)
                setTotalUser(response.totalUsers)
                setTotalPayment(response.usersPayment)
                setTotalValue(response.totalValue)

            } catch(err) {
                alertMessage(err.message, 'red')
            }

        }

        getData();

    }, [])

    return (
        <DivDashboard>
            <div className="title">
                <h2>Dashboard</h2>
            </div>
            <div className="area-graph">
                <div className="time-line">
                    <TimeLineGraph data={data} />
                </div>
                <div className="total-users">
                    <div className="circle">
                        <h3>{totalPayment}/{totalUser}</h3>
                        <h4>pago</h4>
                    </div>
                </div>
            </div>
            <div className="totalValue">
                <label>Valor Total:</label>
                {showValue ? (
                    <input type="text" value={formatCurrency(total)} readOnly />
                ) : (
                    <input type="password" value={formatCurrency(total)} readOnly />
                )}
                <button onClick={handleToggleValue}>
                    <i className={`lnr-eye bi bi-eye${!showValue ? '-slash-fill' : '-fill'}`} />
                </button>
            </div>
        </DivDashboard>
    )

}
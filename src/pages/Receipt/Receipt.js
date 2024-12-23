import { useEffect, useContext, useState, useRef } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import generatePDF, { Margin } from 'react-to-pdf';

// Styles
import { DivReceipt } from "./styles"

// Services
import UserService from "../../services/UserServices";

// Context
import { AuthContext } from "../../context/AuthContext";

// Utils
import { alertMessage, formatCurrency } from "../../utils/utilityFunction";
import extenso from '../../utils/utilityFunction';

const options = {
    page: {
        margin: Margin.SMALL,
        format: 'A4',
        orientation: 'landscape',
    },
}

export function Receipt(){
    const targetRef = useRef();

    const navigate = useNavigate()

    const { token, admin } = useContext(AuthContext)

    const defaultValue = "------------------------------------#-----------------------------------------"

    const location = useLocation();
    const receiptData = location.state?.data;

    const [ date, setDate ] = useState(receiptData.date);
    const [ description, setDescription ] = useState(receiptData.description);
    const [ descriptionSecond, setDescriptionSecond ] = useState(receiptData.descriptionSecond)
    const [ check, setCheck ] = useState(receiptData.check)
    const [ users, setUsers ] = useState([])

    const [ download, setDownload ] = useState(false)

    useEffect(() => {

        const getReceiptUsers = async () => {
            
            try {
                
                const response = await UserService.generateRecepitUsers(admin, token);

                const newData = response.data.map(user => {
                    return {
                        ...user,
                        month_value: user.month_value / 2
                    }
                })

                setUsers(newData)

                setDownload(true)

            } catch(err) {
                alertMessage(err.message, "red")
            }

        }

        getReceiptUsers();

    }, [])

    useEffect(() => {

        if (download && targetRef.current) {
            generatePDF(targetRef, options);

            navigate('/generate-receipt')
        }

    }, [download, targetRef])

    return (
        <DivReceipt ref={targetRef}>
                {users && users.map((user, index) => (
                    <div className={`recibo`}>
                        <div className="area-recibo" key={user.id}>
                            <div className="area-recibo-cabe">
                                <div className="text-title">RECIBO:</div>
                                <div className="N">
                                    <label>N°</label>
                                    <input type="text" value={user.id} readOnly className=" number browser-default" />
                                </div>
                                <div className="valorN">
                                    <label>VALOR:</label>
                                    <input type="text" value={formatCurrency(user.month_value)} readOnly className="browser-default" />
                                </div>
                            </div>
                            <div className="area-recibo-corpo">
                                <div className="area-1">
                                    <label>Recebi(emos) de</label>
                                    <input type="text" value={user.name} readOnly className="browser-default" />
                                </div>
                                <div className="area-2">
                                    <label>a quantia de</label>
                                    <input type="text" value={`${parseInt(user.month_value).toString().extenso()} Reais ${defaultValue}`} readOnly className="browser-default" />
                                </div>
                                <div className="area-hidden-1">
                                    <div className="linha"></div>
                                </div>
                                <div className="area-3">
                                    <label>Referente á</label>
                                    <input type="text" readOnly value={`${description} ${defaultValue}`} className="browser-default" />
                                </div>
                                <div className="area-hidden-2">
                                    <input type="text" readOnly className="browser-default" value={`${descriptionSecond} ${defaultValue}`} />
                                    <br />
                                    <label>e para a clareza firmo(amos) o presente.</label>
                                </div>
                                <div className="area-4">
                                    <input className="input-1 browser-default" readOnly type="text" value="jaraguá do sul" />
                                    <label>,</label>
                                    <input className="input-2 browser-default" readOnly type="text" value={date.slice(0, 2)} />
                                    <label>de</label>
                                    <input className="input-3 browser-default" readOnly type="text" value={date.slice(3, 5)} />
                                    <label>de</label>
                                    <input className="input-4 browser-default" readOnly type="text" value={date.slice(6, 10)} />
                                </div>
                                <div className="area-5">
                                    <label>Assinatura</label>
                                    <input type="text" readOnly className="browser-default" />
                                </div>
                                <div className="area-6">
                                    <label>Emitente</label>
                                    <input type="text" readOnly className="browser-default" />
                                </div>
                                <div className="area-7">
                                    <label>CPF</label>
                                    <input type="text" readOnly className="browser-default" />
                                    <label>RG</label>
                                    <input type="text" readOnly className="browser-default" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </DivReceipt>
    )

}
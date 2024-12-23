import { useState, useEffect, useContext } from 'react';
import { IMaskInput } from 'react-imask';
import { format } from "date-fns";

// Styles
import { DivCheck } from './styles';

// Services
import UserService from "../../services/UserServices";

// Context
import { AuthContext } from "../../context/AuthContext";

// Utils
import { formatCurrency, isValidMonthYearFormat, alertMessage } from '../../utils/utilityFunction'

export function CheckPayment({isOpen}) {
    const [date, setDate] = useState(format(new Date(), "MM/yyyy"))
    const [users, setUsers] = useState([]);

    const { token, admin } = useContext(AuthContext)

    const getUsers = async (dateFilter) => {

        try {

            const response = await UserService.showAllUsers(admin, token, dateFilter)
            setUsers(response.data)

        } catch(err) { 

            alertMessage(err.message, "red")

        }

    }

    useEffect(() => {
        getUsers(date)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();

        setDate(e.target.value)

        if (!isValidMonthYearFormat(e.target.value)){
            return alertMessage("Data informada é inválida!", "red")
        }

        getUsers(e.target.value);

    }

    const handleCheckPayment = (userId, monthValue, nameUser) => {
        
        const checkPayment = async () => {

            try {

                const response = await UserService.checkPaymentUser(token, userId, date, monthValue)

                alertMessage(`${response.message} ${nameUser}`, "green");

                getUsers(date)

            } catch(err) {

                alertMessage(err.message, "red");

            }

        }

        checkPayment();

    }

    return (
        <DivCheck>
            <div className="title">
                <h2>Checar Pagemento</h2>
            </div>
            <form className="col s12 area-form">
                <div className="row area-inputs">
                    <div className="input-field col s6 input">
                        <IMaskInput
                            mask="00/0000"
                            type="text"
                            value={date}
                            onBlur={handleSearch}                           
                        />
                        <label className={date ? 'active' : ''}>Mês/Ano</label>
                    </div>
                </div>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                {users && users.map((user) => (
                    user.status ? (
                        <tr className={`line line-done ${user.isPayment ? 'line-done' : 'line-pending'}`} key={user.id} onClick={() => handleCheckPayment(user.id, user.month_value, user.name)}>
                            <td>{user.name}</td>
                            <td>R$ {formatCurrency(user.month_value)}</td>
                        </tr>
                    ) : null
                ))}
                </tbody>
            </table>
            <footer className={isOpen ? 'isOpen' : ''}>
                <div className="subtitle">
                    <div className="pending"></div>
                    <p>Pendente</p>
                </div>
                <div className="subtitle">
                    <div className="done"></div>
                    <p>Pago</p>
                </div>
            </footer>
        </DivCheck>
    )
}
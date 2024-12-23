import { useEffect, useContext, useState } from "react"
import { IMaskInput } from "react-imask";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

// Styles
import { DivViews } from "./styles"

// Services
import UserService from "../../services/UserServices";

// Context
import { AuthContext } from "../../context/AuthContext";

// Utils
import { formatPhoneNumber, formatCurrency, isValidMonthYearFormat, alertMessage } from '../../utils/utilityFunction'

export function ViewRegisters({isOpen}){
    const [name, setName] = useState('');
    const [users, setUsers] = useState([])
    const [date, setDate] = useState(format(new Date(), "MM/yyyy"));

    const { token, admin } = useContext(AuthContext)

    const navigate = useNavigate()

    const getUsers = async (dateFilter) => {

        try {

            const response = await UserService.showAllUsers(admin, token, dateFilter)
            setUsers(response.data)

        } catch(err) { 

            alertMessage(err.message, "red")

        }

    }

    const getSearchUser = async (searchName, dateFilter) => {

        try {

            const response = await UserService.searchUserName(admin, token, searchName, dateFilter);

            setUsers(response.data)

        } catch(err) {

            alertMessage(err.message, "red")

        }

    }

    useEffect(() => {

        getUsers(date)

    }, [])

    const handleSearch = (e) => {
        e.preventDefault()

        name ? getSearchUser(name, date) : getUsers(date)

    }

    const handleSearchDate = (e) => {
        e.preventDefault();

        setDate(e.target.value)

        if (!isValidMonthYearFormat(e.target.value)){
            return alertMessage("Data informada é inválida!", "red")
        }

        getUsers(e.target.value);

    }

    const handleEdit = (dataUser) => {

        navigate('/edit', { state: { data: dataUser } });

    }

    return (
        <DivViews>
            <div className="title">
                <h2>Consultar</h2>
            </div>
            <form className="col s12 area-form">
                <div className="row area-inputs">
                    <div className="input-field col s6 input">
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                        />
                        <label>Pesquisar</label>
                    </div>
                    <a className="waves-effect waves-light btn btn-custom" onClick={handleSearch}>Buscar</a>
                </div>
                <div className="row area-inputs">
                    <div className="input-field col s6 input">
                        <IMaskInput
                            mask="00/0000"
                            type="text"
                            value={date}
                            onBlur={handleSearchDate}
                        />
                        <label className={date ? 'active' : ''}>Mês/Ano</label>
                    </div>
                </div>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user) => (
                    <tr onClick={() => handleEdit(user)} className={`line line-done ${user.isPayment ? 'line-done' : 'line-pending'}`} key={user.id}>
                        <td>{!user.status ? `${user.name} (Inativo)` : user.name}</td>
                        <td>{formatPhoneNumber(user.telephone_number)}</td>
                        <td>R$ {formatCurrency(user.month_value)}</td>
                     </tr>
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
        </DivViews>
    )

}
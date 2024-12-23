import { useState, useContext, useEffect } from "react"
import { IMaskInput } from "react-imask";
import { useNavigate, useLocation } from "react-router-dom";

// Styles
import { DivEdit } from "./styles"

// Utils
import { alertMessage, formatToDecimal } from '../../utils/utilityFunction'

// Services
import UserService from "../../services/UserServices";

// Context
import { AuthContext } from "../../context/AuthContext";

export function Edit(){

    const navigate = useNavigate()

    const { admin, token } = useContext(AuthContext)

    const location = useLocation();
    const dataUser = location.state?.data;

    const [ name, setName ] = useState(dataUser.name);
    const [ schoolName, setSchoolName ] = useState(dataUser.school);
    const [ motherName, setMotherName ] = useState(dataUser.mother_name);
    const [ phoneNumber, setPhoneNumber ] = useState(dataUser.telephone_number);
    const [ monthlyValue, setMonthlyValue ] = useState(dataUser.month_value);
    const [ check, setCheck ] = useState(dataUser.status)

    const handleCancel = (e) => {
        e.preventDefault();

        navigate('/view')
    }

    const handleEdit = (e) => {
        e.preventDefault();

        const updateUser = async () => {

            if (name === "" || schoolName === "" || motherName ==="" || phoneNumber === "" || monthlyValue === "") {
                return alertMessage("Preencha todos os campos!", "red")
            }

            const formattedNumber = phoneNumber.replace(/[^\d]/g, '');
            const formattedValue = formatToDecimal(monthlyValue)

            const data = {
                userId: dataUser.id,
                name,
                schoolName,
                motherName,
                phoneNumber: formattedNumber,
                monthlyValue: formattedValue,
                check
            }

            try {

                const response = await UserService.updateUser(admin, token, data)

                alertMessage(response.message, "green")

                navigate('/view')
                
            } catch(err) {
                alertMessage(err.message)
            }

        }

        updateUser();

    }

    return (
        <DivEdit>
            <div className="title">
                <h2>Editar</h2>
            </div>
            <form className="col s12 area-form">
                <div className="row area-inputs">
                    <div className="input-field col s6 input">
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label className="active">Nome</label>
                    </div>
                    <div className="input-field col s6 input">
                        <input 
                            type="text"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                        />
                        <label className="active">Escola</label>
                    </div>
                    <div className="input-field col s6 input">
                        <input 
                            type="text"
                            value={motherName}
                            onChange={(e) => setMotherName(e.target.value)}
                        />
                        <label className="active">Nome da Mãe</label>
                    </div>
                    <div className="input-field col s6 input">
                        <IMaskInput
                            mask="(00) 00000-0000"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <label className="active">Número Celular</label>
                    </div>
                    <div className="input-field col s6 input">
                        <IMaskInput
                                mask="000.00"
                                type="number"
                                value={monthlyValue}
                                onChange={(e) => setMonthlyValue(e.target.value)}
                        />
                        <label className="active">Valor Mensal</label>
                    </div>
                    <p className="checkbox">
                        <label>
                            <input type="checkbox" checked={check} onChange={() => setCheck((prevCheck) => {return !prevCheck})} />
                            <span>{check ? 'Usuário Ativo' : 'Usuário Inativo'}</span>
                        </label>
                    </p>
                </div>
                <div className="area-btn">
                    <a onClick={handleEdit} className="waves-effect waves-light btn btn-custom">Salvar</a>
                    <a onClick={handleCancel} className="waves-effect waves-light btn btn-custom cancel">Cancelar</a>
                </div>
            </form>
        </DivEdit>
    )

}
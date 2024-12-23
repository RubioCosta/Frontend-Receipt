import { useState, useContext } from "react"
import { IMaskInput } from "react-imask";

// Styles
import { DivRegister } from "./styles"

// Utils
import { alertMessage, formatToDecimal } from '../../utils/utilityFunction'

// Services
import UserService from "../../services/UserServices";

// Context
import { AuthContext } from "../../context/AuthContext";

export function Register(){

    const { admin, token } = useContext(AuthContext)

    const [ name, setName ] = useState('');
    const [ schoolName, setSchoolName ] = useState('');
    const [ motherName, setMotherName ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ monthlyValue, setMonthlyValue ] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        if (name === "" || schoolName === "" || motherName ==="" || phoneNumber === "" || monthlyValue === "") {
            return alertMessage("Preencha todos os campos!", "red")
        }

        const formattedNumber = phoneNumber.replace(/[^\d]/g, '');
        const formattedValue = formatToDecimal(monthlyValue)

        const dataUser = {
            name,
            schoolName,
            motherName,
            phoneNumber: formattedNumber,
            monthlyValue: formattedValue
        }

        const registerUser = async () => {
            try {

                const response = await UserService.registerUser(admin, token, dataUser)

                alertMessage(response.message, "green")

                setName('');
                setSchoolName('');
                setMotherName('');
                setPhoneNumber('');
                setMonthlyValue('');
                
            } catch(err) {
                alertMessage(err.message, "red")
            }
        }

        registerUser();

    }

    return (
        <DivRegister>
            <div className="title">
                <h2>Cadastro</h2>
            </div>
            <form className="col s12 area-form">
                <div className="row area-inputs">
                    <div className="input-field col s6 input">
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Nome</label>
                    </div>
                    <div className="input-field col s6 input">
                        <input 
                            type="text"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                        />
                        <label>Escola</label>
                    </div>
                    <div className="input-field col s6 input">
                        <input 
                            type="text"
                            value={motherName}
                            onChange={(e) => setMotherName(e.target.value)}
                        />
                        <label>Nome da Mãe</label>
                    </div>
                    <div className="input-field col s6 input">
                        <IMaskInput
                            mask="(00) 00000-0000"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <label>Número Celular</label>
                    </div>
                    <div className="input-field col s6 input">
                        <IMaskInput
                                mask="000.00"
                                type="number"
                                value={monthlyValue}
                                onChange={(e) => setMonthlyValue(e.target.value)}
                        />
                        <label>Valor Mensal</label>
                    </div>
                </div>
                <div className="area-btn">
                    <a onClick={handleRegister}  className="waves-effect waves-light btn btn-custom">Cadastrar</a>
                </div>
            </form>
        </DivRegister>
    )

}
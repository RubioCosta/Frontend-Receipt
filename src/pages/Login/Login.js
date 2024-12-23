import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useCookies } from 'react-cookie';

// Styles
import { DivLogin } from "./styles"

// Services
import AuthService from "../../services/AuthAdminUser"

// Utils
import { alertMessage } from '../../utils/utilityFunction'

export function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const [cookieAdmin, setCookieAdmin] = useCookies(['admin']);
    const [cookieToken, setCookieToken] = useCookies(['token']);

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        if (email === '' || password === '') {
            return alertMessage("Informe todos os campos para prosseguir!", 'red')
        }

        try {

            const adminUser = await AuthService.login(email, password)

            alertMessage(adminUser.message, 'green')

            const cookieAdmin = {
                id: adminUser.data.id,
                email: adminUser.data.email
            }

            setCookieAdmin('admin', cookieAdmin, { path: '/' });
            setCookieToken('token', adminUser.data.token, { path: '/' })

            navigate('/dashboard')

        } catch(err) {
            alertMessage(err.message, 'red')
        }

    }

    return(
        <DivLogin>
            <div className="area-login">
                <div className="title-login">
                    <h1>LOGIN</h1>
                </div>
                <form className="col s12 area-form">
                    <div className="row area-inputs">
                        <div className="input-field col s6 input">
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label>E-mail</label>
                        </div>
                        <div className="input-field col s6 input">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label>Senha</label>
                        </div>
                    </div>
                    <a onClick={handleLogin} className="waves-effect waves-light btn btn-custom">ENTRAR</a>
                </form>
            </div>
            <footer>
                By Rubio Rodrigo Costa -
                <i className="bi bi-instagram"></i>
                <i className="bi bi-facebook"></i>
                <i className="bi bi-linkedin"></i>
            </footer>
        </DivLogin>
    )

}
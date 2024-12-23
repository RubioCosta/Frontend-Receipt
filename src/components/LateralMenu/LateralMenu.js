import React, { useState, useEffect } from 'react';
import { DivMenu } from './styles';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Images
import IconReceipt from '../../assets/icon-recibo.png'

export function LateralMenu({ children, setIsSidebarOpen, isSidebarOpen }) {
  const [ register, setRegister ] = useState(false);
  const [ dashboard, setDashboard ] = useState(true);
  const [ view, setView ] = useState(false);
  const [ generate, setGenerate ] = useState(false);
  const [ check, setCheck ] = useState(false)

  const [selectedOption, setSelectedOption] = useState('dashboard')

  const [cookieUser, removeCookieUser] = useCookies(['user']);
  const [cookieToken, removeCookieToken] = useCookies(['token']);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const resetOptions = () => {
    setRegister(false)
    setDashboard(false)
    setView(false)
    setGenerate(false)
    setCheck(false)
  }

  useEffect(() => {
    resetOptions();

    switch (selectedOption) {
      case 'dashboard':
        setDashboard(true);
        break;
      case 'register':
        setRegister(true);
        break;
      case 'view':
        setView(true);
        break;
      case 'generate':
        setGenerate(true);
        break;
      case 'check':
        setCheck(true)
        break;
      default:
        break;
    }

  }, [selectedOption])

  const handleLogout = () => {
    removeCookieUser('user')
    removeCookieToken('token')
    
    navigate('/')
  }

  return (
    <DivMenu>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-details">
          <div className="logo_name">Menu</div>
          <i className={`bx ${isSidebarOpen ? 'bi-list-nested' : 'bi-list'}`} id="btn" onClick={() => toggleSidebar()}></i>
        </div>
        <ul className="nav-list">
          <li>
            <i className="bi bi-search"></i>
            <input className='input-search' type="text" placeholder="Search..." />
            <span className="tooltip">Buscar</span>
          </li>
          <li>
            <Link to="/dashboard" className={dashboard ? 'selected' : ''} onClick={() => setSelectedOption('dashboard')}>
              <i className="bi bi-bar-chart-line-fill"></i>
              <span className="links_name">Dashboard</span>
            </Link>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <Link to="/register" className={register ? 'selected' : ''} onClick={() => setSelectedOption('register')}>
              <i className="bi bi-person-plus-fill"></i>
              <span className="links_name">Cadastrar</span>
            </Link>
            <span className="tooltip">Cadastrar</span>
          </li>
          <li>
            <Link to="/view" className={view ? 'selected' : ''} onClick={() => setSelectedOption('view')}>
              <i className="bi bi-people-fill"></i>
              <span className="links_name">Consultar</span>
            </Link>
            <span className="tooltip">Consultar</span>
          </li>
          <li>
            <Link to="/check-payment" className={check ? 'selected' : ''} onClick={() => setSelectedOption('check')}>
              <i className="bi bi-calendar2-check-fill"></i>
              <span className="links_name">Checar Pagamento</span>
            </Link>
            <span className="tooltip">Checar Pagamento</span>
          </li>
          <li>
            <Link to="/generate-receipt" className={generate ? 'selected' : ''} onClick={() => setSelectedOption('generate')}>
              <i className="bi bi-file-earmark-arrow-down-fill"></i>
              <span className="links_name">Gerar Recibos</span>
            </Link>
            <span className="tooltip">Gerar Recibos</span>
          </li>
          <li>
            <NavLink to="/" onClick={handleLogout}>
              <i className="bi bi-door-open-fill"></i>
              <span className="links_name">Sair</span>
            </NavLink>
            <span className="tooltip">Sair</span>
          </li>
        </ul>
        <li className="profile">
          <div className="profile-details">
            <img src={IconReceipt} alt="Recibo" />
            <div className="name_job">
              <div className="name">SISTEMA</div>
              <div className="job">RECIBOS</div>
            </div>
          </div>
          <i className="bx bx-log-out" id="log_out"></i>
        </li>
      </div>
      <section className="home-section">
        <div className="text">
          {React.cloneElement(children, { isOpen: isSidebarOpen })}
        </div>
      </section>
    </DivMenu>
  );
}
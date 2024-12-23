import { useState } from "react";
import { IMaskInput } from "react-imask";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

// Styles
import { DivReceipt } from './styles'

// Pages
import { Receipt } from "../Receipt";

export function GenerateReceipt(){
    const [ date, setDate ] = useState(format(new Date(), 'dd/MM/yyyy'));
    const [ year, setYear ] = useState(format(new Date(), 'yyyy'))
    const [ description, setDescription ] = useState('Transporte Particular');
    const [ descriptionSecond, setDescriptionSecond ] = useState('---------------------------------------------------#--------------------------------------------');
    const [ check, setCheck ] = useState(false)
    
    const navigate = useNavigate();

    const handleDescriptionMensality = (e) => {
        setCheck((prevCheck) => {
            const newCheck = !prevCheck;
    
            if (newCheck) {
                setDescription(`${description}, referente 50% do valor da mensalidade para`);
                setDescriptionSecond(`garantir a vaga em ${ parseInt(year) + 1 }.`)
            } else {
                setDescription("Transporte Particular")
                setDescriptionSecond('---------------------------------------------------#--------------------------------------------')
            }
    
            return newCheck;
        });
    }

    const handleDownload = () => {
        
        const receiptData = {
            description,
            descriptionSecond,
            date,
            check
        }

        navigate('/generate', { state: { data: receiptData } });

    };

    return (
        <DivReceipt>
            <div className="title">
                <h2>Gerar Recibos</h2>
            </div>
            <form className="col s12 area-form">
                <div className="row area-inputs">
                    <div className="input-field col s6 input">
                        <input 
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label className={description ? 'active' : ''}>Descrição</label>
                    </div>
                </div>
                <p className="checkbox">
                    <label>
                        <input type="checkbox" checked={check} onChange={handleDescriptionMensality} />
                        <span>Texto 50% mensalidade</span>
                    </label>
                </p>
                <div className="row area-inputs">
                    <div className="input-field col s6 input">
                        <IMaskInput
                            mask="00/00/0000"
                            type="text"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <label className={date ? 'active' : ''}>Data</label>
                    </div>
                </div>
                <a className="waves-effect waves-light btn btn-custom">Buscar</a>
            </form>
            <div className="model-receipt" id="model-receipt">
                <div className="recibo">
                    <div className="area-recibo">
                        <div className="area-recibo-cabe">
                            <div className="text-title">RECIBO:</div>
                            <div className="N">
                                <label>N°</label>
                                <input type="text" readOnly className=" number browser-default" />
                            </div>
                            <div className="valorN">
                                <label>VALOR:</label>
                                <input type="text" value="" readOnly className="browser-default" />
                            </div>
                        </div>
                        <div className="area-recibo-corpo">
                            <div className="area-1">
                                <label>Recebi(emos) de</label>
                                <input type="text" value="" readOnly className="browser-default" />
                            </div>
                            <div className="area-2">
                                <label>a quantia de</label>
                                <input type="text" readOnly className="browser-default" />
                            </div>
                            <div className="area-hidden-1">
                                <div className="linha"></div>
                            </div>
                            <div className="area-3">
                                <label>Referente á</label>
                                <input type="text" readOnly value={description} className="browser-default" />
                            </div>
                            <div className="area-hidden-2">
                                <input type="text" readOnly className="browser-default" value={descriptionSecond} />
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
            </div>
            <div className="download">
                <a className="waves-effect waves-light btn btn-custom" onClick={handleDownload}>Gerar</a>
            </div>
        </DivReceipt>
    )

}
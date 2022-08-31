import React from "react";
import s from "../ComponentsStyles/Paginado.module.css"


export default function Paginado({paisePorPag,countries,pagina}){

    let numeroPags = []
    for(let i = 1; i <= Math.ceil(countries / paisePorPag); i++){
        numeroPags.push(i)
    }
    return(
        <div className={s.container}>
            <nav>
                <ul>
                    <li className={s.lista}>
                        {numeroPags && numeroPags.map(numero =>
                                <button key={numero} className={s.number} onClick={() => pagina(numero)}>
                                 {numero}
                                </button>
                        )}
                     </li>               
                </ul>
            </nav>
        </div>
    )
}
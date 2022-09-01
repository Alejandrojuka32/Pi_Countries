import React from "react";
import s from "../ComponentsStyles/SearchBar.module.css"

export default function SearchBar({onClickBar,onChangeBar}){
    return(
        <div>
            <form>
            <input type="text"
            placeholder="Buscar Pais"
            className={s.input}
            onChange={e => onChangeBar(e)}    
            />
            <button className={s.btnsearch} onClick={e => onClickBar(e)}>Buscar</button>
            </form>
        </div>
    )
}
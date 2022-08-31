import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBar } from "../Actions";
import s from "../ComponentsStyles/SearchBar.module.css"

export default function SearchBar(){
    const [name, setname] = useState("")
    
    const dispatch = useDispatch()

    function onChangeBar(e){
        e.preventDefault()
        setname(e.target.value)
    }

    function onClickBar(e){
        e.preventDefault()
        dispatch(searchBar(name))
    }
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
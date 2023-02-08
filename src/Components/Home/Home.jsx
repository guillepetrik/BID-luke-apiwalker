import React, { useEffect, useState } from 'react'
import axios from 'axios';
import obiwan from './obiwan.png';
import './../../App.css';

const Home = () => {

    const [options, setOptions] = useState([]);
    const [selected, setSelected] =useState("");
    const [id, setId] =useState(2);
    const [error, setError] =useState(false);
    const [info, setInfo] =useState([]);
    const [extra, setExtra]= useState([]);

    useEffect(() => {
        axios.get("http://swapi.dev/api/")
            .then(response=>response.data)
            .then(result =>{
                let resultList = [];
                for (const [key, value] of Object.entries(result)) {
                    resultList.push({name: key, route: value})
                }   
                setOptions(resultList);
                setSelected(resultList[0].route)                
            })
            .catch(error => {
                setError(true);
            })
    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault();
        setError(false);
        let url= selected + id;
        axios.get(url)
            .then(response=>response.data)
            .then(result => {
                setInfo(result);
                if (selected.includes("people")) {
                    axios.get(result.homeworld)
                        .then(rsp=>rsp.data)
                        .then(rp => {  
                            setExtra(rp);
                        })
                        .catch( er => {
                            setError(true);
                        })
                }
            })
            .catch(error => {
                setError(true);
            })  
    }

    return (
        <>
            <h1>Pagina Principal StarWars API</h1>
            <form onSubmit={handleSubmit} className='contenedor'>
                <select selected={selected} onChange={ (e)=>setSelected(e.target.value) } >
                    {
                        options.map(( item, index ) =>
                            <option key={item.name + index} value={item.route}>{ item.name }</option>)
                    }
                </select>
                <label>Id: <input type="number" value={id} className='entrada' onChange={ (e)=>setId(e.target.value)}/></label>
                <button className='btn' type="submit">Buscar</button>
            </form>
            {
                error ?
                <div className='cont'>
                    <h4>Estos no son los droides que está buscando</h4>
                    <img src={obiwan} alt='obiwan img'/>
                </div> :
                ""
            }
            
            {
                selected.includes("people")&&info.name?
                <ul>
                    <li><span>{info.name}</span></li>
                    <li>Altura: {info.height}cm</li>
                    <li>Peso: {info.mass}kg</li>
                    <li>Cabello: {info.hair_color}</li>
                    <li>Planeta Natal: {extra.name}</li>
                    
                </ul>:
                ""
            }
            {
                selected.includes("planets")&&info.rotation_period?
                <ul>
                    <li><span>{info.name}</span></li>
                    <li>Periodo de rotacion: {info.rotation_period}</li>
                    <li>Periodo de orbita: {info.orbital_period}</li>
                    <li>Diametro: {info.diameter}km</li>
                </ul>:
                ""
            }
            {
                selected.includes("films")&&info.title?
                <ul>
                    <li><span>{info.title}</span></li>
                    <li>Episodio: {info.episode_id}</li>
                    <li>Secuencia opening: {info.opening_crawl}</li>
                    <li>Director: {info.director}</li>
                </ul>:
                ""
            }
            {
                selected.includes("species")&&info.classification?
                <ul>
                    <li><span>{info.name}</span></li>
                    <li>Clasificacion: {info.classification}</li>
                    <li>Designacion: {info.designation}</li>
                    <li>Altura promedio: {info.average_height}cm</li>
                </ul>:
                ""
            }
            {
                selected.includes("vehicles")&&info.count?
                <ul>
                    <li>Cantidad: {info.count}</li>
                    <li>Url: <a href={info.next}>{info.next}</a></li>
                </ul>:
                ""
            }
            {
                selected.includes("starships")&&info.next?
                <ul>
                    <li>Cantidad: {info.count}</li>
                    <li>Url: <a href={info.next}>{info.next}</a></li>
                </ul>:
                ""
            }
        </>
    )
}

export default Home
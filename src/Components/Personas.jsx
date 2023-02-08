import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import obiwan from './../Components/Home/obiwan.png';
import './../App.css';

const Personas = () => {
    const params = useParams();
    const [people, setPeople] = useState({});
    const [error, setError] =useState(false);
    useEffect(() => {
        axios.get("https://swapi.dev/api/people/" + params.id)
            .then(response=>response.data)
            .then(result=>{
                let rutas = result.films;
                axios.all(rutas.map((promesa)=> axios.get(promesa)))
                    .then(resp=> {
                        let pelis = resp.map((item)=>item.data)
                        result.films = pelis;
                        setPeople(result);
                    })
                    .catch(err=>setError(true));
            })
            .catch(error => {
                setError(true);
            })
    }, [])
    
    return (
        <>
            <h1>Persona <span>{ params.id }</span> </h1>
            <h3>Nombre: <span>{people.name}</span></h3>
            <h3>Altura: <span>{people.height} cm</span></h3>
            <h3>Peso: <span>{people.mass} kg</span></h3>
            <h3>Peliculas:</h3>
                <ul>
                    {people.films?.map((item, idx, array)=>{
                        return (
                            <li key={"peli" +idx}>
                                <a href={item.url}>{item.title}</a>
                            </li>
                        )
                    } )}
                </ul>
            {
                error ?
                <h4>
                    Estos no son los droides que está buscando
                    <img src={obiwan} alt='obiwan img'/>
                </h4> :
                ""
            }
        </>
    )
}

export default Personas
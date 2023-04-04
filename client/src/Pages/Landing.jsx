import React from 'react';
import {Link} from 'react-router-dom'
import '../css/Landing.css';

function Landing() {
  return (
    <div className='contenedor_principal'>
      <Link to={"/home"}>
      <button className='button'>Entrar</button>
      </Link>
    </div>
  )
}

export default Landing
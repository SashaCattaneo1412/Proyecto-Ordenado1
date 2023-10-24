import React from 'react'
import Layout from '../components/Layout'
 import Link from 'next/link';
import Header from '../components/Header';
import CenteredContainer from '../components/CenteredContainer2';
import style from '../Styles/calendario.module.css';

function Calendario()

{
    
    return (
    <form>
         <Header/>
     <h1>Calendario</h1>
     <CenteredContainer>
      <div class={style.dias}>
      <div>LUN</div>
      <div>MAR</div>
      <div>MIE</div>
      <div>JUE</div>
      <div>VIE</div>
      <div>SAB</div>
      <div>DOM</div>
    </div>
     </CenteredContainer>
     </form>
     
        
      );
}

export default Calendario;
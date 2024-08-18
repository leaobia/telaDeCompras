
import React from 'react';
import './css/Header.css';

function Header({ categoriaAtual, quantidadeNaCategoria, backCategory, nextCategory }) {
  return (
    <header className='container__header'>
      <button onClick={backCategory}> &#8826;</button>
      <div className="container__header--categoria">
        ({quantidadeNaCategoria}) {categoriaAtual}
      </div>
      <button onClick={nextCategory}> &#8827;</button>
    </header>
  );
}

export default Header;

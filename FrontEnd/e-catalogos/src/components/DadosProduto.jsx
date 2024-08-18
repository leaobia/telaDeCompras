import React from 'react';

const DadosProduto = ({ name, reference, price, changeDirection }) => (
  <div className="container__dados">
    <button className="container__button" onClick={changeDirection}>&#8593;&#8595;</button>
    <span className="container__name">{name.split(' ')[0].toLowerCase()}</span>
    <span className="container__reference"><span className='ref'>REF: </span>{reference}</span>
    <span className="container__price">
      R$<span className="container__price-value">{price}</span>
    </span>
  </div>
);

export default DadosProduto;

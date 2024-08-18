import React from 'react';

const QuantidadeSelector = ({ precoAtual, precoAcumulado, quantity, diminuirQuantidade, adicionaQuantidade }) => (
  <div className="container__pack-quantity-selector">
    <div className="quantity-selector">
      <span className="quantity-selector__label">Atual</span>
      <span className="quantity-selector__price">R$ {precoAtual}</span>
    </div>

    <div className="quantity-selector__btns">
      <button className="quantity-selector__button" onClick={diminuirQuantidade}>-</button>
      <div className="quantity-selector__quantity">{quantity}</div>
      <button className="quantity-selector__button" onClick={adicionaQuantidade}>+</button>
    </div>
    <div className="quantity-selector">
      <span className="quantity-selector__label">Acumulado</span>
      <span className="quantity-selector__price">R$ {precoAcumulado}</span>
    </div>
  </div>
);

export default QuantidadeSelector;
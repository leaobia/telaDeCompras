import React from 'react';

const PackDisplay = ({ skus }) => (
  <div className="container__pack-display">
    {skus.map((sku, index) => (
      <div className="container__pack-item" key={index}>
        <span className="container__pack-size">{sku.size}</span>
        <span className="container__pack-stock">{sku.stock}</span>
      </div>
    ))}
    <span className='equal'>=</span>
    <div className="container__pack-item">
      <span>PACK</span>
      <span className="container__pack-stock container-pack-total">
        {skus.reduce((total, sku) => total + sku.stock, 0)}
      </span>
    </div>
  </div>
);

export default PackDisplay;
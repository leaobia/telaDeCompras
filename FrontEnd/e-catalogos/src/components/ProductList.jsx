import React, { useState, useEffect } from 'react';

function ProductList() {
  const [produtos, setProdutos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const produtosPorPagina = 1;

  useEffect(() => {
    fetch('http://localhost:3000/v1/eCatalogos/produtos')
      .then(response => response.json())
      .then(data => setProdutos(data.produtos))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  const paginaProdutos = produtos.slice(
    paginaAtual * produtosPorPagina,
    (paginaAtual + 1) * produtosPorPagina
  );

  const proximaPagina = () => {
    if ((paginaAtual + 1) * produtosPorPagina < produtos.length) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaAtual > 0) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  return (
    <div>
        {paginaProdutos.map(produto => (
          <div key={produto.id}>
            <h3>{produto.name}</h3>
            <p>{produto.category}</p>
            <p>{produto.price}</p>
          </div>
        ))}
  
      <button onClick={paginaAnterior} disabled={paginaAtual === 0}>
        Anterior
      </button>
      <button
        onClick={proximaPagina}
        disabled={(paginaAtual + 1) * produtosPorPagina >= produtos.length}
      >
        Próxima
      </button>
    </div>
  );
}

export default ProductList;

import React, { useState, useEffect } from 'react';

function ProductList() {
  const [produtos, setProdutos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const produtosPorPagina = 1;
  const [images, setImages] = useState({});
  const [skus, setSkus] = useState({});
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/v1/eCatalogos/produtos')
      .then(response => response.json())
      .then(data => setProdutos(data.produtos));
  }, []);

  useEffect(() => {
    if (produtos[paginaAtual]) {
      const produtoAtual = produtos[paginaAtual];
      if (!images[produtoAtual.id] && !skus[produtoAtual.id]) {
        fetch(`http://localhost:3000/v1/eCatalogos/images/${produtoAtual.id}`)
          .then(response => response.json())
          .then(imageData => {
            setImages(prevImages => ({
              ...prevImages,
              [produtoAtual.id]: imageData.images
            }));
            setImage(imageData.images[0].path);
          });
        fetch(`http://localhost:3000/v1/eCatalogos/skus/${produtoAtual.id}`)
          .then(response => response.json())
          .then(skusData => {
            console.log(skusData);
          });
      } else {
        setImage(images[produtoAtual.id][0].path);
      }
    }
  }, [paginaAtual, produtos, images]);
  const proximaPagina = () => {
    if ((paginaAtual + 1) * produtosPorPagina >= produtos.length) {
      setPaginaAtual(0);
    } else {
      setPaginaAtual(paginaAtual + 1);
    }
  };
  const paginaAnterior = () => {
    if (paginaAtual === 0) {
      setPaginaAtual(Math.ceil(produtos.length / produtosPorPagina) - 1);
    } else {
      setPaginaAtual(paginaAtual - 1);
    }
  };


  const produtoAtual = produtos[paginaAtual];
  return (
    <div className='container'>
      <header className='container__header'>
        <div className="container__header--categoria">
          Categoria Name
        </div>
      </header>
      {produtoAtual && (
        <div className='container__produto'>
          {images[produtoAtual.id] && images[produtoAtual.id].length > 0 && (
            <div className='container__imagens'>
              <div className="container__imagem-grande" style={{ backgroundImage: `url(${image})` }}>
                <button className="container__botao container__botao--anterior" onClick={paginaAnterior}>
                  &larr;
                </button>
                <button
                  className="container__botao container__botao--proxima"
                  onClick={proximaPagina}
                >
                  &rarr;
                </button>
              </div>

              <div className="containerPesquisar">
                <div className='container__troca-imagem'>
                  {images[produtoAtual.id].map((img, index) => (
                    <button
                      key={index}
                      className="container__thumbnail"
                      onClick={() => setImage(img.path)}
                    >
                      <img
                        src={img.path}
                        alt={`Thumbnail ${index + 1}`}
                        className="container__thumbnail-img"
                        style={{ width: 50, height: 50 }}
                      />
                    </button>
                  ))}
                </div>
              </div>


            </div>
          )}

          <div className="linhaPai">
            <div className="linha"></div>
          </div>
          <div className="container__dados">
            <button className="container__button">&#8593;&#8595;</button>
            <span className="container__name">{produtoAtual.name.split(' ')[0].toLowerCase()}</span>
            <span className="container__reference">REF: {produtoAtual.reference}</span>
            <span className="container__price">
              R$ <span className="container__price-value">{produtoAtual.price}</span>
            </span>
          </div>

          <div className="container__pack">
            <div className="container__pack-display">
              <div className="container__pack-item">
                <span className="container__pack-size">P</span>
                <span className="container__pack-stock">4</span>
              </div>
              <div className="container__pack-item">
                <span className="container__pack-size">M</span>
                <span className="container__pack-stock">1</span>
              </div>
              <div className="container__pack-item">
                <span className="container__pack-size">G</span>
                <span className="container__pack-stock">4</span>
              </div>
              <div className="container__pack-item">
                <span className="container__pack-size">GG</span>
                <span className="container__pack-stock"> 1</span>
              </div>

              <span className='equal'>=</span>
              <div className="container__pack-item">
                <span>PACK</span>
                <span className="container__pack-stock"> 10</span>
              </div>
            </div>

            <div className="container__pack-quantity-selector">
              <div className="quantity-selector">
                <span className="quantity-selector__label">Atual</span>
                <span className="quantity-selector__price">R$ 0,00</span>
              </div>

              <div className="quantity-selector__btns">
                <button className="quantity-selector__button">-</button>
                <div className="quantity-selector__quantity">0</div>
                <button className="quantity-selector__button">+</button>
              </div>
              <div className="quantity-selector">
                <span className="quantity-selector__label">Acumulado</span>
                <span className="quantity-selector__price">R$ 0,00</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );


}
export default ProductList;
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
          )}
          <div className="container__dados">
            botao, nome, referencia, preco
          </div>
          <div className="container__pack">
            <div className="container__pack-display">aaaaaaaaaaaaaaaaaaaaaaa</div>
            <div className="container__pack-quantity-selector">eeeeeeeeeeeeeeeeeee</div>
          </div>
        </div>
      )}
    </div>
  );
  

}
export default ProductList;
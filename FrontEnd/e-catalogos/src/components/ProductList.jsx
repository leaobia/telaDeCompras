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
    if ((paginaAtual + 1) * produtosPorPagina < produtos.length) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaAtual > 0) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const produtoAtual = produtos[paginaAtual];

  return (
    <div>
      {produtoAtual && (
        <div key={produtoAtual.id}>
          <h3>{produtoAtual.name}</h3>
          <p>{produtoAtual.category}</p>
          <p>{produtoAtual.price}</p>

          {images[produtoAtual.id] && images[produtoAtual.id].length > 0 && (
            <>
              <div>
                <img src={image}alt="imagem" />
                {images[produtoAtual.id].map((img, index) => (
                  <button key={index} onClick={() => setImage(img.path)}>
                    <img src={img.path} alt={`Thumbnail ${index + 1}`} style={{ width: 50, height: 50 }} />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

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
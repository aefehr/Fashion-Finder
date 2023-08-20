import React, { useState } from 'react';

function UploadButton() {
  const [similarProducts, setSimilarProducts] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const response = await fetch('http://localhost:3002/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setSimilarProducts(data.data.result_groups[0].similar_products);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {similarProducts.map(product => (
        <div key={product.id}>
          <p><strong>Brand:</strong> {product.brand_name}</p>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>URL:</strong> <a href={product.url} target="_blank">{product.url}</a></p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default UploadButton;
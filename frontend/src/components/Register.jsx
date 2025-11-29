import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!image) return setMessage("Please select an image");

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image); // <-- must match backend field

    try {
      const res = await axios.post('http://localhost:3000/api/product/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage("Product created successfully!");
      setName('');
      setPrice('');
      setImage(null);

    } catch (err) {
      setMessage(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Create Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name='image' onChange={e => setImage(e.target.files[0])} required />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default Register;

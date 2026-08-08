import { useState } from "react";

function AddProduct({ products, addNewProduct }: any) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!name || !code || !category || !price || !image || !description) {
      alert("Please fill all fields.");
      return;
    }

    const exists = products.find((product: any) => product.code === code);

    if (exists) {
      alert("Product code already exists.");
      return;
    }

    const newProduct = {
      id: products.length + 1,
      name,
      code,
      category,
      price: Number(price),
      image,
      description,
    };

    addNewProduct(newProduct);

    setName("");
    setCode("");
    setCategory("Electronics");
    setPrice("");
    setImage("");
    setDescription("");

    alert("Product added successfully!");
  };

  return (
    <div className="page">
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Product Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Electronics</option>
          <option>Books</option>
          <option>Clothing</option>
          <option>Sports</option>
          <option>Home</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;

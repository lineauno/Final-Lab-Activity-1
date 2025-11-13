import { useState } from "react";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const productData = { name, price, description, stock };

    try {
      const response = await fetch("http://localhost:8082/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error("Failed to create product");

      setName("");
      setPrice("");
      setDescription("");
      setStock("");
      setMessage("Product created successfully! 🎉");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.container}> 
      <form onSubmit={handleSubmit} style={styles.form}>
        
        {}
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input} 
        />

        {/* Description Input - Apply input style */}
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input} 
        />

        {/* Price Input - Apply input style */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={styles.input}
        />

        {/* Stock Input - Apply input style */}
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          style={styles.input}
        />

        {/* Save Button - Apply button style */}
        <button type="submit" disabled={saving} style={styles.button}>
          {saving ? "Saving, please wait..." : "Save"}
        </button>
      </form>
      {message && (
        <p style={{ color: message.startsWith("Error") ? "red" : "green", marginTop: "1rem" }}>
          {message}
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: "2rem auto",
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "10px",
    maxWidth: "400px",
    backgroundColor: "#fdfdfd",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem", 
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "1rem",
    boxSizing: "border-box", 
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#007bff", 
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "background-color 0.2s",
  }
};

export default ProductForm;
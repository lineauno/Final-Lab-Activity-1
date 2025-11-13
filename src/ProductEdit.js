import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 

const API_BASE_URL = "http://localhost:8082/api/products"; 

const ProductEdit = () => {
  const { productId } = useParams();
  const navigate = useNavigate(); 

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
        setStock(data.stock);
        setLoading(false);
      })
      .catch((err) => {
        setMessage(`Error loading product: ${err.message}`);
        setLoading(false);
      });
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const productData = { name, price, description, stock };

    try {
      const response = await fetch(`${API_BASE_URL}/${productId}`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error("Failed to update product");

      setMessage("Product updated successfully! ✅");

    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading product data for editing...</div>;

  return (
    <div style={styles.container}>
      <h2>Edit Product: {name}</h2>
      
      {/* Apply form style for vertical layout and gaps */}
      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* Name Input */}
        <input 
          type="text" 
          placeholder="Product Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={styles.input} // Added input styling
        />
        
        {/* Description Input */}
        <textarea 
          placeholder="Description (optional)" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          style={styles.input} // Added textarea styling
        />
        
        {/* Price Input */}
        <input 
          type="number" 
          placeholder="Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
          style={styles.input} // Added input styling
        />
        
        {/* Stock Input */}
        <input 
          type="number" 
          placeholder="Stock" 
          value={stock} 
          onChange={(e) => setStock(e.target.value)} 
          required 
          style={styles.input} // Added input styling
        />

        <button 
          type="submit" 
          disabled={saving}
          style={styles.button} // Added button styling
        >
          {saving ? "Updating..." : "Update Product"}
        </button>
      </form>
      {message && <p style={{ color: message.startsWith("Error") ? "red" : "green", marginTop: "1rem" }}>{message}</p>}
    </div>
  );
};

// --- Styles copied from ProductForm.js (and slightly enhanced for clarity) ---
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
    gap: "0.8rem", // Increased gap slightly for better spacing
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "background-color 0.2s",
  }
};

export default ProductEdit;
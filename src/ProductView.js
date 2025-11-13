import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 

const ProductView = () => {
  const { productId } = useParams(); 
  const navigate = useNavigate(); 

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const API_BASE_URL = "http://localhost:8082/api/products"; 

  useEffect(() => {
    fetch(`${API_BASE_URL}/${productId}`)
      .then((response) => { 
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        return response.json();
      })
      .then((data) => { 
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => { 
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete product ID ${productId}?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${productId}`, {
        method: "DELETE", // Use the DELETE method
      });

      if (!response.ok) throw new Error("Failed to delete product");

      navigate("/product-list", { state: { message: "Product deleted successfully!" } });
    } catch (err) {
      setError(`Deletion Error: ${err.message}`);
    }
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div style={containerStyle}> {/* Apply container style */}
      <h2>{product.name} Details</h2>
      <p><strong>ID:</strong> {product.id}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p><strong>Stock:</strong> {product.stock}</p>
      
      {/* Action Buttons */}
      <div style={buttonGroupStyle}>
        {/* Edit Button */}
        <button 
          onClick={() => navigate(`/edit-product/${productId}`)} 
          style={editButtonStyle}
        >
          Edit Product
        </button>
        
        {/* Delete Button */}
        <button 
          onClick={handleDelete} 
          style={deleteButtonStyle}
          // className="button-delete"
        >
          Delete Product 🗑️
        </button>
      </div>
    </div>
  );
};

// --- Styles ---
// Centralized style objects for better readability
const containerStyle = {
  maxWidth: '800px',
  margin: '2rem auto',
  padding: '1.5rem',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  backgroundColor: '#fff',
};

const buttonGroupStyle = {
  marginTop: '25px', // More spacing from details
  display: 'flex',
  gap: '10px', // Space between buttons
};

const baseButtonStyle = {
  padding: '10px 18px',
  borderRadius: '5px',
  border: '1px solid',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease', // Smooth transitions
};

const editButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: '#f0f0f0',
  borderColor: '#ccc',
  color: '#333',
  // You can add hover effects via CSS or more complex JS for inline styles
  // For simplicity, omitting dynamic hover effects in inline style example
};

const deleteButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: '#dc3545', // Bootstrap 'danger' red
  borderColor: '#dc3545',
  color: 'white',
};


export default ProductView;
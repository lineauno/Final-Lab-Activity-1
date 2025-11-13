import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; 

const API_BASE_URL = 'http://localhost:8082/api/products';

function ProductList() {
    const [products, setProducts] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const location = useLocation(); 

    useEffect(() => {
        fetch(API_BASE_URL)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(json => {
                setProducts(json);
                setLoading(false);
            })
            .catch(err => { // handle any errors during fetch
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div style={styles.loading}>Loading products...</div>;
    }

    if (error) {
        return <div style={styles.error}>Error fetching products: {error.message}</div>;
    }

    if (products.length === 0) {
        return <div style={styles.container}>No products available.</div>;
    }

    return (
        <div style={styles.container}>
            <h2>Product List</h2>

            {}
            {location.state?.message && (
                <div style={styles.successMessage}>
                    {location.state.message}
                </div>
            )}

            <table style={styles.table}>
                <thead style={styles.thead}>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Price</th>
                        <th style={styles.th}>Actions</th> {/* New column for buttons/links */}
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} style={styles.tr}>
                            <td style={styles.td}>{product.name}</td>
                            <td style={styles.td}>{product.description}</td>
                            <td style={styles.td}>${product.price ? parseFloat(product.price).toFixed(2) : 'N/A'}</td>
                            <td style={styles.tdAction}>
                                {/* Link to ProductView */}
                                <Link to={`/product/${product.id}`} style={styles.link}>
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// --- Inline Styles for Frontend Fixes ---
const styles = {
    container: {
        maxWidth: '1000px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '1.5rem',
    },
    thead: {
        backgroundColor: '#f4f4f4',
        borderBottom: '2px solid #ddd',
    },
    th: {
        textAlign: 'left',
        padding: '12px 15px',
        fontWeight: 'bold',
        color: '#333',
    },
    tr: {
        borderBottom: '1px solid #eee',
    },
    td: {
        padding: '12px 15px',
        verticalAlign: 'top',
    },
    tdAction: {
        padding: '12px 15px',
        verticalAlign: 'top',
        whiteSpace: 'nowrap', // Prevents the link from wrapping
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'color 0.2s',
    },
    successMessage: {
        padding: '15px',
        marginBottom: '20px',
        backgroundColor: '#d4edda',
        color: '#155724',
        border: '1px solid #c3e6cb',
        borderRadius: '5px',
    },
    loading: {
        textAlign: 'center',
        padding: '2rem',
        fontSize: '1.2rem',
    },
    error: {
        textAlign: 'center',
        padding: '2rem',
        fontSize: '1.2rem',
        color: 'red',
    },
};

export default ProductList;
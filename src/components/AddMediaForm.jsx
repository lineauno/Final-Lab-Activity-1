import React, { useState } from 'react';

const initialFormState = {
    title: '',
    media_type: 'KDrama',
    status: 'On-Going',
    rating: '', 
    genres: '',
    author_artist: '',
    date_finished: '',
    episode_progress: '',
    notes: ''
};

function AddMediaForm({ onMediaAdded, API_BASE_URL, AUTH_TOKEN }) {
    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Saving...');
        
        try {
            const response = await fetch(`${API_BASE_URL}/media`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' 
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                 console.error("Error creating media item:", data.errors || data.message);
                 setMessage('Error: Failed to add item. Check console for details.');
                 return;
            }

            // Success (status 201 Created)
            onMediaAdded(data); 
            setFormData(initialFormState); 
            setMessage('Success! Item added to tracker.');
            setTimeout(() => setMessage(''), 3000);
            
        } catch (error) {
            console.error("Network or parsing error:", error);
            setMessage('Error: Failed to connect to API.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="media-form-grid">
                {/* Row 1: Core Fields */}
                <input 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="Title (e.g., Descendants of the Sun)" 
                    required 
                />
                <select name="media_type" value={formData.media_type} onChange={handleChange} required>
                    <option value="KDrama">KDrama</option>
                    <option value="Manhwa">Manhwa</option>
                    <option value="Book">Book</option>
                    <option value="Anime">Anime</option>
                    <option value="CDrama">CDrama</option>
                </select>
                <input 
                    name="status" 
                    value={formData.status} 
                    onChange={handleChange} 
                    placeholder="Status (e.g., Finished, On-Going)" 
                    required 
                />
                
                {/* Row 2: Optional/Detailed Fields */}
                <input 
                    name="rating" 
                    value={formData.rating} 
                    onChange={handleChange} 
                    placeholder="Rating (e.g., 9.3, 4.5/5, 5★★★★★)" 
                />
                <input 
                    name="genres" 
                    value={formData.genres} 
                    onChange={handleChange} 
                    placeholder="Genres (e.g., Romance, Fantasy)" 
                />
                <input 
                    name="author_artist" 
                    value={formData.author_artist} 
                    onChange={handleChange} 
                    placeholder="Author/Artist (for Manhwa/Book)" 
                />

                {/* Row 3: Progress & Notes */}
                <input 
                    name="episode_progress" 
                    value={formData.episode_progress} 
                    onChange={handleChange} 
                    placeholder="Progress (e.g., S2: E10)" 
                />
                <input 
                    type="date"
                    name="date_finished" 
                    value={formData.date_finished} 
                    onChange={handleChange} 
                />
                <textarea 
                    name="notes" 
                    value={formData.notes} 
                    onChange={handleChange} 
                    placeholder="Personal notes..." 
                ></textarea>
                
                {/* Submit */}
                <div className="submit-container">
                    <button 
                        type="submit" 
                        className="add-item-button"
                    >
                        Add Item
                    </button>
                    {message && <p className="message-text" style={{ fontSize: '0.9rem' }}>{message}</p>}
                </div>
            </div>
        </form>
    );
}

export default AddMediaForm;
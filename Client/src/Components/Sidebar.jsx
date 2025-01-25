import { useState } from 'react';
import '../Css/Sidebar.css';

const Sidebar = ({ onSearch }) => {
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ type, title });
    };

    return (
        <div className="sidebar">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select 
                        id="type" 
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                        className="dropdown"
                    >
                        <option value="" disabled>Select</option>
                        <option value="mcq">MCQ</option>
                        <option value="anagram">Anagram</option>
                        <option value="content_only">Content Only</option>
                        <option value="read_along">Read Along</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text" 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter question title"
                    />
                </div>
                <button type="submit" className="submit-button">Search</button>
            </form>
        </div>
    );
};

export default Sidebar;
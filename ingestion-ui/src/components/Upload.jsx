import React, { useState } from 'react';
import ApiService from '../services/apiService';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    try {
      await ApiService.uploadFile(file);
      setMessage('File uploaded successfully');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Upload Page</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Upload;

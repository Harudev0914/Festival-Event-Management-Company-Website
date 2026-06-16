'use client';

import React, { useState, useEffect } from 'react';

const MainVisualManager = () => {
  const [config, setConfig] = useState({ imageUrl: '', title: '', subtitle: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/config/main_visual_config')
      .then(res => res.json())
      .then(data => {
        if (data.value) setConfig(data.value);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    await fetch('/api/admin/config/main_visual_config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: config }),
    });
    alert('Updated successfully');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Main Visual Configuration</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>Image URL: </label>
        <input value={config.imageUrl} onChange={e => setConfig({...config, imageUrl: e.target.value})} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Title: </label>
        <input value={config.title} onChange={e => setConfig({...config, title: e.target.value})} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Subtitle: </label>
        <input value={config.subtitle} onChange={e => setConfig({...config, subtitle: e.target.value})} style={{ width: '100%' }} />
      </div>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default MainVisualManager;

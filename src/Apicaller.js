import React, { useState, useEffect } from 'react';

const ApiCaller = () => {
  const [data, setData] = useState('');
  const [response, setResponse] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jsonData = JSON.parse(data);
    fetch('https://your-app-name.herokuapp.com/bfhl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then(response => response.json())
      .then(data => setResponse(data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={data} onChange={(event) => setData(event.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <div>
        {response && (
          <div>
            <h2>Response from Backend</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiCaller;
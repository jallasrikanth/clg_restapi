import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const parsedData = JSON.parse(jsonInput);

      if (!parsedData.data) {
        throw new Error('Invalid JSON: Missing "data" field');
      }

      const response = await fetch('https://restapi-du8rhbwe6-jallasrikanths-projects.vercel.app/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: parsedData.data }),
      });

      const result = await response.json();
      setResponseData(result);
    } catch (err) {
      setError(err.message || 'Invalid JSON input');
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderFilteredResponse = () => {
    if (!responseData) return null;

    return (
      <div className="filtered-response">
        {selectedOptions.includes('alphabets') && responseData.alphabets.length > 0 && (
          <p>Alphabets: {responseData.alphabets.join(',')}</p>
        )}
        {selectedOptions.includes('numbers') && responseData.numbers.length > 0 && (
          <p>Numbers: {responseData.numbers.join(',')}</p>
        )}
        {selectedOptions.includes('highest_lowercase_alphabet') && responseData.highest_lowercase_alphabet.length > 0 && (
          <p>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet.join(',')}</p>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>ABCD123</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          API Input
          <textarea
            value={jsonInput}
            onChange={handleInputChange}
            placeholder='{"data":["M","1","334","4","B"]}'
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {responseData && (
        <>
          <label>
            Multi Filter
            <select multiple={true} onChange={handleOptionChange}>
              <option value="alphabets">Alphabets</option>
              <option value="numbers">Numbers</option>
              <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
            </select>
          </label>
          {renderFilteredResponse()}
        </>
      )}
    </div>
  );
}

export default App;
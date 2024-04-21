import React, { useState } from 'react';

const Home = ({ isLoggedIn }) => {
  const [apiUrl, setApiUrl] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleApiUrlChange = (event) => {
    setApiUrl(event.target.value);
  }

  const handleJsonInputChange = (event) => {
    setJsonInput(event.target.value);
  }

  const selectButton = (button) => {
    setSelectedButton(button);
  }

  const handleSubmit = () => {
    console.log("Submitting to API URL:", apiUrl);
    console.log("With JSON Input:", jsonInput);
    console.log("Under Rate Limiting Tier (Button):", selectedButton);

    const endpointUrl = selectedButton === 'blue' ? 'https://example.com/api/basic' :
      selectedButton === 'green' ? 'https://example.com/api/standard' :
        'https://example.com/api/premium';

    console.log("Endpoint URL being used:", endpointUrl);

    fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonInput
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Response from API:", data);
        setResponse(`Response: ${JSON.stringify(data, null, 2)}`);
      })
      .catch(error => {
        console.error("Error fetching API:", error);
        setResponse(`Failed to fetch API: ${error.message}`);
      });
  }

  return (
    <div>
      <div className='flex justify-center items-center text-white text-3xl h-full ' style={{ marginTop: '60px' }}>
        <div className="w-1/2 flex justify-center items-center pl-20">
          <iframe src="https://giphy.com/embed/bGgsc5mWoryfgKBx1u" width="480" height="480" title="API Gif"></iframe>
        </div>
        <div className="w-1/2 flex flex-col">
          <div><h1 style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Cross The Limits With RAM API LIMITER</h1></div>
          <input
            className="input-box transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            type="text"
            placeholder="Enter API URL"
            value={apiUrl}
            onChange={handleApiUrlChange}
            style={inputStyle}
          />
          <textarea
            className="input-box transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter JSON Policy"
            value={jsonInput}
            onChange={handleJsonInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={textareaStyle}
          />
          <div style={{ paddingLeft: '40%', paddingTop: '5%', width: '100%' }}><h3 style={{ fontWeight: 'bold' }}>OR</h3></div>
          <div className="flex flex-row items-center mt-10 space-x-4">
            {renderButton('blue', 'Basic', selectButton, selectedButton)}
            {renderButton('green', 'Standard', selectButton, selectedButton)}
            {renderButton('red', 'Premium', selectButton, selectedButton)}
          </div>
          <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded mt-4" style={buttonStyle} onClick={handleSubmit}>Submit</button>
          {response && <div className="response mt-4 p-3 rounded bg-gray-200 text-black" style={{ whiteSpace: 'pre-wrap' }}>{response}</div>}
        </div>
      </div>
    </div >
  )
}

const inputStyle = {
  height: '60px', width: '630px', marginTop: '20px', color: 'black',
  borderRadius: '15px', background: 'linear-gradient(to right, #ffffff 0%, #cccccc 100%)',
  boxShadow: '1px 1px 2px #e6e6e6, -1px -1px 2px #ffffff, 1px -1px 2px #cccccc, -1px 1px 2px #b3b3b3',
  overflow: 'hidden', padding: '0 15px', fontSize: '14px'
};

const textareaStyle = {
  height: '120px', width: '630px', marginTop: '20px', color: 'black',
  borderRadius: '15px', background: 'linear-gradient(to right, #ffffff 0%, #cccccc 100%)',
  boxShadow: '1px 1px 2px #e6e6e6, -1px -1px 2px #ffffff, 1px -1px 2px #cccccc, -1px 1px 2px #b3b3b3',
  overflow: 'hidden', resize: 'none', padding: '0 15px', fontSize: '14px'
};

const buttonStyle = {
  height: '50px', width: '630px'
};

const handleFocus = (e) => {
  e.target.style.height = '120px';
  window.scrollTo({ top: e.target.offsetTop, behavior: 'smooth' });
};

const handleBlur = (e) => {
  e.target.style.height = '60px';
};

const renderButton = (id, label, onClickFunction, selectedId) => (
  <button
    className={`mb-4 text-white font-bold py-2 px-4 rounded ${selectedId === id ? 'opacity-50' : ''}`}
    style={{ height: '70px', width: '200px', background: id === 'blue' ? 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' : id === 'green' ? 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)' : 'linear-gradient(to right, #f54ea2 0%, #ff7676 100%)' }}
    onClick={() => onClickFunction(id)}
  >
    {label}
  </button>
);

export default Home;

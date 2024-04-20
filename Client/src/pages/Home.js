import React, { useState } from 'react';

const Home = ({ isLoggedIn }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedButton, setSelectedButton] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (selectedButton) {
      setSelectedButton(null); // Clear button selection when typing starts
    }
  }

  const selectButton = (button) => {
    if (inputValue) {
      setInputValue(''); // Clear input value when a button is selected
    }
    setSelectedButton(button);
  }

  const handleSubmit = () => {
    console.log("Input Value:", inputValue);
    console.log("Selected Button:", selectedButton);
  }

  return (
    <div>
      <div className='flex justify-center items-center text-white text-3xl h-full ' style={{ marginTop: '60px' }}>
        <div className="w-1/2 flex justify-center items-center pl-20">
          <iframe src="https://giphy.com/embed/bGgsc5mWoryfgKBx1u" width="480" height="480"></iframe>
        </div>

        <div className="w-1/2 flex flex-col">
          <div><h1 style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Cross The Limits With RAM API LIMITER</h1></div>

          <input
            className="input-box transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            type="text"
            placeholder="Enter API URL"
            style={{
              height: '60px',
              width: '630px',
              marginTop: '20px',
              color: 'black',
              borderRadius: '15px',
              background: 'linear-gradient(to right, #ffffff 0%, #cccccc 100%)',
              boxShadow: '1px 1px 2px #e6e6e6, -1px -1px 2px #ffffff, 1px -1px 2px #cccccc, -1px 1px 2px #b3b3b3',
              overflow: 'hidden',
              padding: '0 15px', // Added padding
              fontSize: '14px' // Smaller text size
            }}
          />


          <textarea
            className="input-box transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter JSON Policy"
            style={{
              height: '60px',
              width: '630px',
              marginTop: '20px',
              color: 'black',
              borderRadius: '15px',
              background: 'linear-gradient(to right, #ffffff 0%, #cccccc 100%)',
              boxShadow: '1px 1px 2px #e6e6e6, -1px -1px 2px #ffffff, 1px -1px 2px #cccccc, -1px 1px 2px #b3b3b3',
              overflow: 'hidden',
              resize: 'none',
              padding: '0 15px', // Added padding
              fontSize: '14px' // Smaller text size
            }}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={(e) => {
              e.target.style.height = '120px';
              window.scrollTo({ top: e.target.offsetTop, behavior: 'smooth' });
            }}
            onBlur={(e) => {
              e.target.style.height = '60px';
            }}
          />
          <div style={{ paddingLeft: '40%', paddingTop: '5%', width: '100%' }}><h3 style={{ fontWeight: 'bold' }}>OR</h3></div>
          <div className="flex flex-row items-center mt-10 space-x-4">
            <button className={`mb-4 text-white font-bold py-2 px-4 rounded ${selectedButton === 'blue' ? 'opacity-50' : ''}`} style={{ height: '70px', width: '200px', background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' }} onClick={() => selectButton('blue')}>Basic</button>
            <button className={`mb-4 text-white font-bold py-2 px-4 rounded ${selectedButton === 'green' ? 'opacity-50' : ''}`} style={{ height: '70px', width: '200px', background: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)' }} onClick={() => selectButton('green')}>Standard</button>
            <button className={`mb-4 text-white font-bold py-2 px-4 rounded ${selectedButton === 'red' ? 'opacity-50' : ''}`} style={{ height: '70px', width: '200px', background: 'linear-gradient(to right, #f54ea2 0%, #ff7676 100%)' }} onClick={() => selectButton('red')}>Premium</button>
          </div>
          <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded mt-4" style={{ height: '50px', width: '630px' }} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div >
  )
}

export default Home

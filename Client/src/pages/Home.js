import React, { useState } from 'react';

const Home = ({ isLoggedIn }) => {

  // Define the state variable 'inputValue' and the setter function 'setInputValue'
  const [inputValue, setInputValue] = useState('');
  const [selectedButton, setSelectedButton] = useState(null);

  // Define the 'handleInputChange' function to update 'inputValue' based on input changes
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const selectButton = (button) => {
    setSelectedButton(button);
  }

  const handleSubmit = () => {
    // Here you can handle the submission of data
    console.log("Input Value:", inputValue);
    console.log("Selected Button:", selectedButton);
    // Add your submission logic here
  }
  return (
    <div>
      <div className='flex justify-center items-center text-white text-3xl h-full ' style={{ marginTop: '60px' }}>
        <div className="w-1/2 flex justify-center items-center pl-20">
          {/* Add a title attribute to the iframe for accessibility */}
          <iframe src="https://giphy.com/embed/bGgsc5mWoryfgKBx1u" width="480" height="480"></iframe>
        </div>

        <div className="w-1/2 flex flex-col">
          <div><h1 style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Cross The Limits With RAM API LIMITER</h1></div>
          <input type="text" placeholder="  Enter API" className="input-box" style={{ height: '60px', width: '630px', marginTop: '20px', color: 'black', borderRadius: '15px' }} value={inputValue} onChange={handleInputChange} />
          <div className="flex flex-row items-center mt-10 space-x-4">
            <button className={`mb-4 text-white font-bold py-2 px-4 rounded ${selectedButton === 'blue' ? 'opacity-50' : ''}`} style={{ height: '70px', width: '200px', background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' }} onClick={() => selectButton('blue')}>Basic</button>
            <button className={`mb-4 text-white font-bold py-2 px-4 rounded ${selectedButton === 'green' ? 'opacity-50' : ''}`} style={{ height: '70px', width: '200px', background: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)' }} onClick={() => selectButton('green')}>Standard</button>
            <button className={`mb-4 text-white font-bold py-2 px-4 rounded ${selectedButton === 'red' ? 'opacity-50' : ''}`} style={{ height: '70px', width: '200px', background: 'linear-gradient(to right, #f54ea2 0%, #ff7676 100%)' }} onClick={() => selectButton('red')}>Premium</button>
          </div>
          <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded mt-4" style={{ height: '50px', width: '630px' }} onClick={handleSubmit}>Submit</button>
        </div>

      </div>

    </div>
  )
}

export default Home

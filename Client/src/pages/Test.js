import axios from 'axios';
import React, { useState } from 'react';

const RateLimiterTester = () => {
    const [jsonPolicy, setJsonPolicy] = useState('');
    const [numRequests, setNumRequests] = useState(0);
    const [results, setResults] = useState([]);

    const sendRequests = async () => {
        try {
            // Make sure numRequests is sent as a number
            const response = await axios.post('https://gs616iijmj.execute-api.us-east-1.amazonaws.com/prod', {
                jsonPolicy,
                numRequests: parseInt(numRequests, 10)
            });
            // Set results to an array if the response data is an array, otherwise set as an empty array
            setResults(Array.isArray(response.data) ? response.data : []);
            console.log(results);
        } catch (error) {
            console.error('Error sending requests:', error);
            // Reset results on error to ensure consistency
            setResults([]);
        }
    };

    return (
        <div className='text-white' style={{ padding: '20px', backgroundColor: '#333' }}>
            <h2>Rate Limiter Tester</h2>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                JSON Policy:
                <textarea
                    style={{ color: 'black', height: '100px', width: '300px', marginTop: '5px' }}
                    value={jsonPolicy}
                    onChange={(e) => setJsonPolicy(e.target.value)}
                />
            </label>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                Number of Requests:
                <input
                    style={{ color: 'black' }}
                    type="number"
                    value={numRequests}
                    onChange={(e) => setNumRequests(parseInt(e.target.value, 10) || 0)}  // Convert to number immediately
                />
            </label>
            <button style={{ display: 'block', marginBottom: '10px' }} onClick={sendRequests}>Send Requests</button>
            <h3>Results:</h3>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        Request {index + 1}: {result.status || "No status available"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RateLimiterTester;


import axios from 'axios';
import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    PieController,
    Tooltip
} from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, PieController);

const RateLimiterTester = () => {
    const [jsonPolicy, setJsonPolicy] = useState('');
    const [numRequests, setNumRequests] = useState(1);
    const [results, setResults] = useState([]);
    const chartRef = useRef(null);

    const sendRequests = async () => {
        let newResults = []; // Temporary array to hold new results
        for (let i = 0; i < numRequests; i++) {
            try {
                const response = await axios.post('https://gs616iijmj.execute-api.us-east-1.amazonaws.com/prod', jsonPolicy, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // Assuming the response.data itself is the result object with a statusCode property
                console.log('Request Result:', response.data);
                newResults.push(response.data);
            } catch (error) {
                console.error('Error sending request:', error);
                newResults.push({ statusCode: error.response?.status }); // Push error status code
            }
        }
        setResults(newResults); // Update state with new results
    };

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy(); // Destroy the current chart instance if exists
        }

        const ctx = document.getElementById('pie-chart').getContext('2d');
        chartRef.current = new ChartJS(ctx, {
            type: 'pie',
            data: {
                labels: ['Successful (200)', 'Rate Limited (429)', 'Other'],
                datasets: [{
                    data: results.reduce((acc, result) => {
                        if (result.statusCode === 200) acc[0]++;
                        else if (result.statusCode === 429) acc[1]++;
                        else acc[2]++;
                        return acc;
                    }, [0, 0, 0]),
                    backgroundColor: ['green', 'red', 'gray'],
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
            },
        });
    }, [results]); // Depend on results to update the chart

    return (
        <div className="text-white flex pt-10 pl-40">
            <div className="flex-1 pl-10">
                <h2 className="text-lg" style={{ fontWeight: 'bold' }}>Rate Limiter Tester</h2>

                <label className="block mb-2">
                    <textarea className="w-full p-2 mt-1 text-black"
                        style={{
                            height: '300px',
                            width: '630px',
                            borderRadius: '10px',
                            boxShadow: '1px 1px 5px white',
                            background: 'linear-gradient(to bottom, #ffffff, #d3d3d3)' // Gradient from white to light gray
                        }}
                        rows="4"
                        placeholder="Enter JSON Policy here..."
                        value={jsonPolicy}
                        onChange={(e) => setJsonPolicy(e.target.value)} />
                </label>
                <label className="block mb-2">
                    <strong>Number of Requests:</strong>
                    <input className="w-full p-2 text-black"
                        style={{
                            height: '60px',
                            width: '630px',
                            borderRadius: '10px',
                            boxShadow: '1px 1px 5px white',
                            background: 'linear-gradient(to bottom, #ffffff, #d3d3d3)' // Gradient from white to light gray
                        }}
                        type="number"
                        min="1"
                        value={numRequests}
                        onChange={(e) => setNumRequests(parseInt(e.target.value) || 1)} />
                </label>
                <button className="p-2 bg-blue-500 cursor-pointer "
                    style={{
                        height: '60px',
                        width: '630px',
                        borderRadius: '10px',
                        boxShadow: '1px 1px 5px blue',
                        background: 'linear-gradient(to right, #007bff, #004085)' // Gradient from blue to dark blue
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #0056b3, #001f3f)'} // Darker gradient on hover
                    onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #007bff, #004085)'} // Original gradient when not hovered
                    onClick={sendRequests}>Send Requests</button>
            </div>
            <div className="flex-1" style={{ height: '500px', width: '500px' }}>
                <canvas id="pie-chart" height="450" width="450"></canvas>
            </div>
        </div>
    );
};

export default RateLimiterTester;


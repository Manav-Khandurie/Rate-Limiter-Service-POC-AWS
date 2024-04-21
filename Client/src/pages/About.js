import React from 'react'
import one from "../assets/1.png"
import two from "../assets/2.png"
import three from "../assets/3.png"
import four from "../assets/4.png"

function About() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400vh', backgroundColor: 'black' }}>

            <div className='text-white' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img src={one} alt="Logo" width={300} height={300} loading="lazy" />
                <h3 >iToken Bucket: In this algorithm, there is a bucket that holds<br />
                    a certain number of tokens. Tokens are added to the bucket at a fixed<br />
                    rate. When a request arrives, it consumes a token from the bucket.<br />
                    If there are no tokens available, the request is either delayed or<br />
                    rejected. This algorithm allows bursts of traffic to be accommodated<br />
                    as long as there are tokens in the bucket.
                </h3>
            </div>
            <div className='text-white' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

                <h3>Fixed Window: In this algorithm, a fixed window of time is defined <br />
                    (e.g., one second). Each time a request arrives, it increments a counter <br />
                    ssociated with that window. If the counter exceeds a predefined limit <br />
                    within the window, subsequent requests are either delayed or rejected until<br />
                    the window resets. This algorithm can lead to burstiness, as it doesn't<br />
                    smooth out traffic evenly.
                </h3>
                <img src={two} alt="Logo" width={300} height={300} loading="lazy" />
            </div>

            <div className='text-white' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img src={four} alt="Logo" width={300} height={300} loading="lazy" />
                <h3 >Sliding Window: Similar to the fixed window, but instead of resetting<br />
                    the window at fixed intervals, the window slides continuously. Each request<br />
                    increments the counter for its respective window, and the system tracks<br />
                    the total count within a sliding time frame. If the total count exceeds<br />
                    the limit, further requests are delayed or rejected. This algorithm provides<br />
                    a smoother rate limiting mechanism compared to the fixed window, as it<br />
                    doesn't have abrupt resets.</h3>
            </div>
            <div className='text-white' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

                <h3>Lambda3-RL:<br />
                    "function":  Indicates that this configuration is for a rate limiter <br />
                    implementation named "Lambda3-RL".<br />
                    "payload": Contains parameters specific to this implementation.<br />
                    "resource":  Specifies the resource or endpoint being rate-limited.<br />
                    "url":  The URL associated with the resource.<br />
                    "limit":  Sets the limit for the maximum number of requests allowed<br />
                    within the specified window size.<br />
                    "window_size_seconds": Defines the size of the time window in seconds <br />
                    within which the specified limit applies.<br />
                </h3>
                <img src={three} alt="Logo" width={300} height={300} loading="lazy" />
            </div>

        </div>
    )
}

export default About
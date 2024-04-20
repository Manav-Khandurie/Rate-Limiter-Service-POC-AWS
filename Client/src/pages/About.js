import React from 'react'
import one from "../assets/1.png"
import two from "../assets/2.png"

function About() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>

            <div className='text-white' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img src={one} alt="Logo" width={300} height={300} loading="lazy" />
                <h3 >iufnarjibfiusarhfoieanfiuenoigfneraoighe4uigjiperbgouiegouipran<br />
                    wtb4wuifobwiubfiuw  nfoiuwn iunhiofnoinw33oui</h3>
            </div>
            <div className='text-white' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

                <h3>iufnarjibfiusarhfoieanfiuenoigfneraoighe4uigjiperbgouiegouipran<br />
                    wtb4wuifobwiubfiuw  nfoiuwn iunhiofnoinw33oui</h3>
                <img src={two} alt="Logo" width={300} height={300} loading="lazy" />
            </div>



        </div>
    )
}

export default About
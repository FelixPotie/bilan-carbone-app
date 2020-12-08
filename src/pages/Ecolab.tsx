import React, { useEffect, useState } from 'react'

export default function Ecolab() {
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        if (document.getElementById('test') === null) {
            const scriptTag = document.createElement('script');
            scriptTag.src = 'https://ecolab.ademe.fr/apps/transport/iframe.js'
            scriptTag.id = 'test'
            scriptTag.async = true
            // scriptTag.style.display = "block"
            scriptTag.style.width = "300px"
            scriptTag.style.height = "300px"

            scriptTag.addEventListener('load', () => setLoaded(true))
            document.body.appendChild(scriptTag)
        }
    })

    useEffect(() => {
        if (!loaded) return;
    }, [loaded])


    return (
    <div style={{"height":"1100px", "margin":"20px"}}>
        <script  style={{"height":"1070px"}} id="ecolab-transport" data-distanceInitiale="29" src="https://ecolab.ademe.fr/apps/transport/iframe.js"></script>
    </div>
    )
}
 
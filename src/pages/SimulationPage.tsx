import React from 'react'
import withRoot from '../modules/withRoot'
import Simulation from '../modules/views/Simulation';
import Auth from '../modules/components/Auth';



function SimulationPage() {

    return (
        <div>
            <Auth/>
            <Simulation/>
        </div>

    )
}

export default withRoot(SimulationPage);

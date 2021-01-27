import React from 'react'
import withRoot from '../modules/withRoot'
import Simulation from '../modules/views/Simulation';
import Auth from '../modules/components/Auth';



function AddJourney() {

    return (
        <div>
            <Auth/>
            <Simulation/>
        </div>
    )
}

export default withRoot(AddJourney);

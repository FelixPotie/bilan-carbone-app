import React from 'react'
import withRoot from '../modules/withRoot'
import Simulation from '../modules/views/Simulation';
import Auth from '../modules/components/Auth';



function UpdateJourney() {

    return (
        <div>
            <Auth/>
            <Simulation label="update"/>
        </div>
    )
}

export default withRoot(UpdateJourney);

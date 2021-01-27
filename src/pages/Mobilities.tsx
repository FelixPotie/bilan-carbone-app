import React from 'react'
import withRoot from '../modules/withRoot'
import MobilitiesContainer from '../modules/views/Mobility';
import Auth from '../modules/components/Auth';


function Mobilities() {

    return (
        <div>
            <Auth/>
            <MobilitiesContainer/>
        </div>
    )
}

export default withRoot(Mobilities);

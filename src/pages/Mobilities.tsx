import React from 'react'
import withRoot from '../modules/withRoot'
import MobilitiesContainer from '../modules/components/Mobility';


function Mobilities() {

    return (
        <React.Fragment>
            <MobilitiesContainer/>
        </React.Fragment>
    )
}

export default withRoot(Mobilities);

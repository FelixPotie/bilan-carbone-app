import React from 'react'
import withRoot from '../modules/withRoot'
import AddMobilityContainer from '../modules/views/AddMobility';
import Auth from '../modules/components/Auth';



function AddMobility() {

    return (
        <div>
            <Auth/>
            <AddMobilityContainer/>
        </div>
    )
}

export default withRoot(AddMobility);

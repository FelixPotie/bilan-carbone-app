import React from 'react'
import withRoot from '../modules/withRoot'
import AddMobilityContainer from '../modules/components/AddMobility';
import Simulation from '../modules/components/Simulation';



function SimulationPage() {

    return (
        <Simulation/>
    )
}

export default withRoot(SimulationPage);

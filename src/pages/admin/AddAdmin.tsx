import React from 'react'
import withRoot from '../../modules/withRoot'
import AddAdminContainer from '../../modules/components/admin/AddAdmin';




function ListAdmin() {
    return (
        <AddAdminContainer/>
    );
}

export default withRoot(ListAdmin);

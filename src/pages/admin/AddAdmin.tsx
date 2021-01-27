import React from 'react'
import withRoot from '../../modules/withRoot'
import AddAdminContainer from '../../modules/components/admin/AddAdmin';
import Auth from '../../modules/components/Auth';




function ListAdmin() {
    return (
        <div>
            <Auth label="admin"/>
            <AddAdminContainer/>
        </div>
        
    );
}

export default withRoot(ListAdmin);

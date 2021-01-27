import React from 'react'
import withRoot from '../../modules/withRoot'
import ListAdminContainer from '../../modules/components/admin/ListAdmin';
import Auth from '../../modules/components/Auth';




function ListAdmin() {
    return (
        <div>
            <Auth label="admin"/>
            <ListAdminContainer/>
        </div>
        
    );
}

export default withRoot(ListAdmin);

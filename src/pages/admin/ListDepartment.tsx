import React from 'react'
import withRoot from '../../modules/withRoot'
import ListDepartmentContainer from '../../modules/components/admin/ListDepartment';
import Auth from '../../modules/components/Auth';




function ListDepartment() {
    return (
        <div>
            <Auth label="admin"/>
            <ListDepartmentContainer/>
        </div>
        
    );
}

export default withRoot(ListDepartment);

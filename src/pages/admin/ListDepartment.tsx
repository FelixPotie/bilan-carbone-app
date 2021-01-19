import React from 'react'
import withRoot from '../../modules/withRoot'
import ListDepartmentContainer from '../../modules/components/admin/ListDepartment';




function ListDepartment() {
    return (
        <ListDepartmentContainer/>
    );
}

export default withRoot(ListDepartment);
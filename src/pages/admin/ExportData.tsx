import React from 'react'
import withRoot from '../../modules/withRoot'
import ExportDataContainer from '../../modules/components/admin/ExportData';
import Auth from '../../modules/components/Auth';



function ExportData() {
    return (
        <div>
            <Auth label="admin"/>
            <ExportDataContainer/>
        </div>
        
    );
}

export default withRoot(ExportData);

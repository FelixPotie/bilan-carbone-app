import React from 'react'
import withRoot from '../../modules/withRoot'
import SearchStudent from '../../modules/components/admin/SearchStudent';
import Auth from '../../modules/components/Auth';




function SearchStudentPage() {
    return (
        <div>
            <Auth label="admin"/>
            <SearchStudent/>
        </div>
        
    );
}

export default withRoot(SearchStudentPage);
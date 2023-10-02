import React from 'react';
import { Route } from 'react-router-dom';

import Admin from 'components/User/Admin';
import Users from 'components/User/components/Users';
import Homes from 'components/User/components/Homes';
import Lands from 'components/User/components/Lands';
import AdminForm from 'components/User/components/AdminForm';

export default [
    <Route
        key="users"
        path="/admin/users"
        exact
        element={
            <>
                <Admin>
                    <Users />
                </Admin>
            </>
        }
    />,
    <Route
        key="homes"
        path="admin/homes"
        exact
        element={
            <>
                <Admin>
                    <Homes />
                </Admin>
            </>
        }
    />,
    <Route
        key="lands"
        path="admin/lands"
        exact
        element={
            <>
                <Admin>
                    <Lands />
                </Admin>
            </>
        }
    />,
    <Route
        key="createAdmin"
        path="admin/create_admin"
        exact
        element={
            <>
                <Admin>
                    <AdminForm />
                </Admin>
            </>
        }
    />,
];

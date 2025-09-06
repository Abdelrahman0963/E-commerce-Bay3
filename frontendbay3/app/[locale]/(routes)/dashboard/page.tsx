import ProtectedAdmin from '@/app/components/ProtectedAdmin'
import Dashboard from '@/app/pages/Dashboard'
import React from 'react'

const page = () => {
    return (
        <ProtectedAdmin>
            <Dashboard />
        </ProtectedAdmin>
    )
}

export default page

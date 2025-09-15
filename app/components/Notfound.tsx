import React from 'react'

const Notfound = () => {
    return (
        <section className="container !mx-auto !py-26 md:!py-30 md:!px-6 !px-4 flex flex-col md:flex-row gap-4 items-center">
            <div className=" max-w-md">
                <h1 className="text-2xl font-bold">404</h1>
                <p className="text-gray-600">Page not found</p>
            </div>
        </section>
    )
}

export default Notfound

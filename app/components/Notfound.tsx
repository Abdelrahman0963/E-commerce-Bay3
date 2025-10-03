import React from 'react'
import Link from 'next/link'
import { LiaSadTear } from "react-icons/lia";

const Notfound = () => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-[var(--dashboard-color)] text-white px-4 md:px-6 py-20">
            <div className="text-center max-w-lg">
                <LiaSadTear className="text-[80px] text-indigo-500 mx-auto mb-4" />
                <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-lg text-gray-300 mb-6">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>
                <Link href="/" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded transition">
                    Go Back Home
                </Link>
            </div>
        </section>
    )
}

export default Notfound

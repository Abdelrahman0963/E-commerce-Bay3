import Link from 'next/link'
import React from 'react'
import { IoNotifications } from "react-icons/io5";
import { useAuthStore } from '@/app/store/useAuthStore'
import { useRouter } from 'next/navigation';
const AuthDrop = () => {
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();
    const handelLogout = () => {
        logout();
        router.push("/");
    }
    return (
        <div className='flex flex-col items-center justify-center bg-white drop-shadow-xl rounded-lg !p-4 absolute top-20 z-50 '>
            <nav className="flex items-center justify-end gap-1 cursor-pointer !pb-5">
                <strong className='!py-4 !px-6 rounded-full bg-[var(--user-color)] text-[var(--primary-color)] border-2 border-gray-500 text-[1.5rem]'>A</strong>
                <nav className='flex flex-col items-start justify-end'>
                    <span className='text-black  '>Hello,</span>
                    <h3 className='text-black'>Abedelrahman Sayed</h3>
                </nav>
            </nav>
            <nav className='flex flex-col items-start justify-end gap-4 w-full border-t-2 border-gray-300 !pt-6'>
                <Link href="/notifications" className='text-black flex items-center gap-1 hover:text-[var(--primary-color)]'><IoNotifications /> Notifications</Link>
                <Link href="/yourads" className='text-black hover:text-[var(--primary-color)]'>Your Ads</Link>
                <button onClick={handelLogout} className='text-black cursor-pointer hover:text-[var(--primary-color)]'>Logout</button>
            </nav>
        </div>
    )
}

export default AuthDrop

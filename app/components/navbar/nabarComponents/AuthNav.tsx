import React, { useEffect } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import AuthDrop from './AuthDrop';
import { useAuthStore } from '@/app/store/useAuthStore'

const AuthNav = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const username = useAuthStore((state) => state.username);
    const initials = username
        ? username
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "U";
    return (
        <>
            <nav onClick={() => setIsOpen(!isOpen)} className="user-icon flex items-center gap-1 cursor-pointer relative">
                <strong className='rounded-full w-10 h-10 flex items-center justify-center bg-[var(--user-color)] text-[var(--primary-color)] border-2 border-gray-500 text-[1.3rem]'>{initials}</strong>
                <span className="text-black">{username || "Guest"}</span>
                <IoIosArrowDown />
            </nav>
            {isOpen && (
                <AuthDrop />
            )}
        </>
    )
}

export default AuthNav

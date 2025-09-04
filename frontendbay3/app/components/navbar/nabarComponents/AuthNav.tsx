import React from 'react'
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
                <strong className='!py-2 !px-3 rounded-full bg-[var(--user-color)] text-[var(--primary-color)] border-2 border-gray-500 text-[1rem]'>{initials}</strong>
                <IoIosArrowDown />
            </nav>
            {isOpen && (
                <AuthDrop />
            )}
        </>
    )
}

export default AuthNav

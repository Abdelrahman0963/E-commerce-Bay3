import React, { useEffect, useRef } from 'react'
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

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block">
            <nav
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 cursor-pointer"
            >
                <strong className='rounded-full w-10 h-10 flex items-center justify-center bg-[var(--user-color)] text-[var(--primary-color)] border-2 border-gray-500 text-[1.3rem]'>
                    {initials}
                </strong>
                <IoIosArrowDown />
            </nav>

            {isOpen && (
                <AuthDrop />
            )}
        </div>
    )
}

export default AuthNav

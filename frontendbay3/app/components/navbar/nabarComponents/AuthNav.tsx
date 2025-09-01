import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import AuthDrop from './AuthDrop';

const AuthNav = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <nav onClick={() => setIsOpen(!isOpen)} className="user-icon flex items-center gap-1 cursor-pointer relative">
                <strong className='!py-2 !px-3 rounded-full bg-[var(--user-color)] text-[var(--primary-color)] border-2 border-gray-500 text-[1rem]'>A</strong>
                <IoIosArrowDown />
            </nav>
            {isOpen && (
                <AuthDrop />
            )}
        </>
    )
}

export default AuthNav

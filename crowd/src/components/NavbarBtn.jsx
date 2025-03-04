import React from 'react'
import { FiArrowDownRight } from "react-icons/fi";

const NavbarBtn = () => {
  return (
    <button className='text-white font-semibold bg-gray-800 rounded-full flex items-center border-1 border-orange-500 px-3 py-2 gap-1 bg-gradient-to-r from-orange-400  to-purple-500 cursor-pointer hover:scale-110 transition-all duration-500 shadow-sm hover:shadow-orange-400'>
        Create
        <div className='sm:hidden md:block'>
        <FiArrowDownRight />
        </div>
    </button>
  )
}

export default NavbarBtn
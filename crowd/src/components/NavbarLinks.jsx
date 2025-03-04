import React from 'react'

const links = [
    { link:"About", section:"about" },
    { link:"Services", section:"services" },
    { link:"Tutorial", section:"tutorial" },
    { link:"Contact", section:"contact" },

 ];
const Navbarlinks = () => {

  return (
    <ul className='flex gap-3 py-3 m-auto text-center items-center justify-center font-bold text-1xl'>
        {links.map((link,index) =>{

            return <li key={index} className='group'>
                <a href='#' className='cursor-pointer text-orange-400 font-bold hover:text-orange-500 transition-all duration-500'>{link.link}</a>

                <div className='mx-auto bg-purple-500 w-0 group-hover:w-full h-[1px] transition-all duration-500'></div>
            </li>;

        
        })}
    </ul>
  );
}

export default Navbarlinks
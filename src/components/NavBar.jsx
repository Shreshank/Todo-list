import React from 'react'

const NavBar = () => {
  return (
    <nav className='bg-[#8d4cb5] flex justify-around items-center py-3 w-full'>
      <div className='flex items-center gap-1 sm:gap-3 *:cursor-pointer *:transition-all *:hover:font-bold'>
        <img className='w-6 hover:invert' src="todo.svg" alt="Todo" />
        <h1>Todo</h1>
      </div>
      <ul className='flex gap-4 sm:gap-10 *:cursor-pointer *:hover:font-bold'>
        <li>Home</li>
        <li>About</li>
        <li>Email</li>
      </ul>
    </nav>
  )
}

export default NavBar

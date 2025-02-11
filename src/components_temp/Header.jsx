import React from 'react'

function Header() {
    return (
        <div className='sticky top-0 z-50 w-full'>
            {/* Logo & Name */}
            <div className='flex items-center justify-center gap-5 text-center bg-slate-900 text-white py-4'>
                <img src='/pngwing.png' className='h-10' />
                <h1 className='text-xl font-bold'>Project Management System</h1>
            </div>

        </div>
    )
}

export default Header
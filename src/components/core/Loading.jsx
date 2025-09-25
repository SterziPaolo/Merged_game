import React from 'react'

export default function Loading() {
    return (
        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center bg-black opacity-40'>
            <div className="custom-loader"></div>
        </div>
    )
}
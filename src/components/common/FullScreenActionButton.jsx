import React from 'react'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

export default function FullScreenActionButton({ onToggleAction, fullScreen }) {

    return (
        <div className={'absolute right-5 top-5'}>
            <button
                onClick={onToggleAction}
                className='bg-green-100 w-[40px] h-[40px] rounded-xl text-white font-bold active:bg-green-300 hover:border border-green-300'>
                {!fullScreen ?
                    <span className='flex items-center justify-center rotate-[-45deg]'>
                        <AiOutlineArrowLeft />
                        <AiOutlineArrowRight />
                    </span>
                    :
                    <span className='flex items-center justify-center rotate-[-45deg]'>
                        <AiOutlineArrowRight />
                        <AiOutlineArrowLeft />
                    </span>
                }
            </button>
        </div>
    )
}
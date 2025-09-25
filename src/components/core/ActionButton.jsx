import React from 'react'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

const ActionButton = ({ onHandleAction }) => {
    return (
        <div className='absolute bottom-10 w-full flex justify-between px-10'>
            <button
                className='
                    px-[12px] py-[8px] rounded-[12px] font-bold bg-green-200 text-white border-green-50
                    hover:bg-green-100 hover:text-white active:bg-green-500'
                onClick={() => onHandleAction('prev')}
            >
                <span className='flex gap-x-2 items-center px-3'><AiOutlineArrowLeft />Prev</span>
            </button>
            <button
                className='
                    px-[12px] py-[8px] rounded-[12px] font-bold bg-green-200 text-white border-green-50
                    hover:bg-green-100 hover:text-white active:bg-green-500'
                onClick={() => onHandleAction('next')}
            >
                <span className='flex gap-x-2 items-center px-3'>Next<AiOutlineArrowRight /></span>
            </button>
        </div>
    )
}

export default ActionButton;
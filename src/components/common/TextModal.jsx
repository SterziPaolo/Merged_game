import { useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import useOnClickOutside from '../../hooks/useOnClickOutside'

export default function TextModal({ onShow, context }) {
    const ref = useRef(null);
    useOnClickOutside(ref, () => onShow(false))
    return (
        <div className='absolute w-full h-full  flex justify-center items-center'>
            <div className='w-full h-full bg-black opacity-40' />
            <div
                className='absolute flex flex-col top-[30%] right-[30%] w-[40rem] !bg-white rounded-xl px-10 pt-10 pb-5 z-[1000]'
                ref={ref}
            >
                <button
                    onClick={onShow}
                    className='absolute top-1 right-1 p-2 hover:rounded-full hover:bg-[#cbcfd9] hover:text-white'>
                    <AiOutlineClose />
                </button>
                <p className='mb-10 pb-3'>
                    {context}
                </p>
                <button
                    className='bg-green-100 w-full h-[40px] rounded-xl text-white font-bold active:bg-green-300 hover:border border-green-300'
                    onClick={onShow}
                >OK</button>
            </div>
        </div>
    )
}
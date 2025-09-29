import React, { useState } from 'react'

import logo from '../assets/logo.png'
import FullScreenActionButton from '../components/common/FullScreenActionButton';
import InformationButton from '../components/core/InformationButton';

import { STATIC_URL } from '../utils/constants';

const MARK_TEXT = "Eteon";

export default function Header({ dispSel, onHandleFullScreenMode, onHandleInformationModal }) {
    const [isVisible, setIsVisible] = useState(false);

    const onHandleChange = () => {
        setIsVisible((prev) => !prev)
        onHandleFullScreenMode()
    }

    return (
        <>
            {!isVisible ?
                <div className={`bg-green-100 w-full h-[80px] flex justify-between items-center px-10 transition-opacity duration-1000 ${!isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className='flex flex-start items-center gap-x-6'>
                        <img
                            className='h-[50px] opacity-70 rounded-xl'
                            src={logo}
                        />
                        <p className='font-bold text-4xl text-white italic'>{MARK_TEXT}</p>
                    </div>
                    <div className='flex flex-row gap-x-3 items-center'>
                        <a
                            className='text-white text-[1rem] px-2 hover:text-blue-600'
                            href={STATIC_URL[dispSel]}
                            target='blank'
                        >
                            {STATIC_URL[dispSel].slice(8, STATIC_URL[dispSel].length-1)}
                        </a>
                        <InformationButton onHandleClick={onHandleInformationModal} />
                        <FullScreenActionButton onToggleAction={onHandleChange} fullScreen={isVisible} />
                    </div>
                </div>
                :
                <FullScreenActionButton onToggleAction={onHandleChange} fullScreen={isVisible} />
            }
        </>
    )
}
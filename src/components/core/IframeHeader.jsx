import React from 'react'

import mono from '../../assets/mono.png'
import settings from '../../assets/settings.png'

export default function IframeHeader() {
    return (
        <header className="bg-white w-full bg-gray-50 border-b border-blackskin-100 rounded-t-xl flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-2">
                <div className="">
                    {/* <div className="w-3 h-3 bg-red-500"></div>
                    <div className="w-3 h-3 bg-orange-500"></div>
                    <div className="w-3 h-3 bg-blue-500"></div>
                    <div className="w-3 h-3 bg-yellow-400"></div> */}
                    <img 
                        className='w-8 h-8'
                        src={mono}
                    />
                </div>
                <span className="font-semibold text-lg">Artemis</span>
                <span className="bg-[#dcfce7] text-[#15803d] text-xs px-2 py-0.5 rounded-full">
                    AI-Powered Hiring
                </span>
            </div>

            <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-200 hover:opacity-70">
                    <img 
                        className='w-5 h-5'
                        src={settings}
                    />
                </button>
                <div className="w-8 h-8 rounded-full bg-[#e5e7eb] flex items-center justify-center font-bold text-sm text-gray-700">
                    AP
                </div>
            </div>
        </header>
    )
}
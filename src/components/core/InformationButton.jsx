import React, { useState } from "react";
import { AiOutlineInfo } from "react-icons/ai";

export default function InformationButton ({onHandleClick}) {
    return (
        <div className="absolute right-[4rem] top-5 ">
            <button
                className="bg-green-100 w-[40px] h-[40px] rounded-xl text-white font-bold active:bg-green-300 border hover:border-green-300"
                onClick={onHandleClick}
            >
                <AiOutlineInfo size='30' className="mx-auto"/>
            </button>
        </div>
    )
}
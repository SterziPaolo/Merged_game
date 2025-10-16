import { SignIn } from "@clerk/clerk-react";
import { backgroundRoom } from "../assets/images";

function Auth() {
    return (
        <div className="w-full h-full">
            <div className="absolute top-0 left-0 w-full h-full">
                <img className="w-full h-full object-cover" src={backgroundRoom} />
            </div>
            <div className="w-full h-full">
                <div className="w-full h-screen absolute top-0 left-0 bg-black opacity-[0.6]" />
                <div className="w-full h-screen m-auto flex justify-center items-center">
                    <SignIn />
                </div>
            </div>
        </div>
    )
}

export default Auth
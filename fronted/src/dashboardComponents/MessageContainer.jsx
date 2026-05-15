import {useState} from "react";


const MessageContainer=()=>{

    return(
        <>
        <div className="h-screen w-screen fixed top-0 left-0 z-5000 backdrop-blur-[10px] flex justify-center items-center">

            <div className="h-[500px] w-[300px]  rounded  bg-gradient-to-r from-[#ff9169a0] to-[#e04ef39b] ">
                <div onClick={()=>{
                    alert("working");
                }} >close</div>
            </div>
            
        </div>
        
        
        </>
    )
}

export {MessageContainer};
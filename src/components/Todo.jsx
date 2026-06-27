import { FaEyeDropper } from "react-icons/fa6"
import { GiPin } from "react-icons/gi"
import { IoMdColorFill } from "react-icons/io"
import AutoResizeTextarea from "./AutoResizeTextarea.jsx"
import { useState } from "react"
import { FaPencilAlt } from "react-icons/fa"

export default function Todo(props) {
    return (
        <div 
            className={`cursor-grab ${props.todo.bgColor} min-h-[350px] max-h-[350px] min-w-[350px] max-w-[350px] flex flex-col justify-between ${props.todo.isSelected ? 'border-[5px] border-green-300' : ''} p-[25px]`} 
        >
            <div 
                className="flex flex-col min-h-0"
            >
                <p className="text-2xl font-semibold shrink-0">{props.todo.title}</p>
                <p className="overflow-y-auto min-h-0 flex-1">{props.todo.content}</p>
            </div>
            <div 
                className="flex justify-between items-end pt-[25px]"
            >
                <div className="flex items-center gap-x-[5px]">
                    <GiPin 
                        className="cursor-pointer mr-2" 
                        size={20}
                        onClick={() => {
                            props.pin(props.todo.id)
                        }} 
                    />
                    <FaPencilAlt 
                        className="cursor-pointer"
                        size={20}
                        onClick={() => props.handleSelect(props.todo.id)}  
                    />
                </div>
                <p className="text-sm">{props.todo.date}</p>
            </div>
        </div>
    )
}   
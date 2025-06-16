import { FaEyeDropper } from "react-icons/fa6"
import { GiPin } from "react-icons/gi"
import { IoMdColorFill } from "react-icons/io"
import AutoResizeTextarea from "./AutoResizeTextarea.jsx"
import { useState } from "react"
import { FaPencilAlt } from "react-icons/fa"

export default function Todo(props) {
    return (
        <div 
            draggable
            className={`cursor-grab ${props.todo.bgColor} min-h-[350px] max-h-[350px] min-w-[350px] max-w-[350px] overflow-y-scroll hide-scrollbar flex flex-col justify-between ${props.todo.isSelected ? 'border-[5px] border-green-300' : ''} p-[25px]`} 
        >
            <div 
                className="flex flex-col"
            >
                <p className="resize-none overflow-hidden text-2xl font-semibold outline-none">{props.todo.title}</p>
                <p className="resize-none overflow-hidden outline-none">{props.todo.content}</p>
            </div>
            <div 
                className="flex justify-between items-end pt-[25px]"
            >
                <div className="flex items-center gap-x-[5px]">
                    <GiPin 
                        className="cursor-default" 
                        onClick={() => {
                            props.pin(props.todo.id)
                        }} 
                    />
                    <FaPencilAlt 
                        className="cursor-default"
                        onClick={() => props.handleSelect(props.todo.id)}  
                    />
                </div>
                <p className="text-sm">{props.todo.date}</p>
            </div>
        </div>
    )
}   
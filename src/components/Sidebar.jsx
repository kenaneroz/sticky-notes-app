import { MdOutlineDarkMode } from "react-icons/md"
import { PiSunBold } from "react-icons/pi"
import Color from "./Color";

export default function Sidebar(props) {
    return (
        <div className="md:h-screen w-max flex md:flex-col justify-center items-center gap-y-[10px] gap-y-[25px] gap-x-[10px] rounded-full p-[50px]">
            <div className="bg-gray-600 flex md:flex-col items-center gap-[15px] rounded-full p-[15px]">
                <button 
                    className="cursor-pointer bg-gray-500 text-gray-100 h-[50px] min-w-[50px] text-3xl font-light rounded-[100px]" 
                    onClick={() => {
                        if(props.selected !== '') {
                            props.setSelected('')
                        } else {
                            props.setRightBarShow(prev => !prev)
                        }
                        props.setRightBarTitle('Title')
                        props.setRightBarContent('Content')
                        props.setUpdatingCreating('creating')
                    }}
                >+</button>
            </div>
            <div className="bg-gray-600 flex md:flex-col rounded-full p-[10px]">
                <MdOutlineDarkMode 
                    id='darkModeIcon'
                    className={`cursor-pointer ${props.mode === 'dark' ? 'bg-gray-500' : ''} text-4xl text-gray-100 rounded-full p-[10px]`} 
                    onClick={(e) => props.handleMode(e)}            
                />
                <PiSunBold 
                    className={`cursor-pointer ${props.mode === 'light' ? 'bg-gray-500' : ''} text-4xl text-gray-100 rounded-full p-[10px]`}
                    onClick={(e) => props.handleMode(e)}  
                />
            </div>
            <div>
                <p 
                    className="cursor-pointer bg-gray-600 text-gray-100 text-center text-sm rounded-full p-[10px]"
                    onClick={() => {
                        props.handleDeleteAll()
                        props.setRightBarShow(false)
                    }}
                >Remove All</p>
            </div>
        </div>
    )
}
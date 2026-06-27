import { IoClose } from "react-icons/io5"
import Color from "./Color";

export default function RightBar(props) {
    const colors = ['bg-red-300', 'bg-green-200', 'bg-blue-300', 'bg-purple-300', 'bg-orange-200']
    const colorPalettes = colors.map(color => {
        return <Color
            key={color}
            backgroundColor={color}
            bg={props.bg}
            setBg={props.setBg}
            handleTodoBgChange={props.handleTodoBgChange}
        />
    })

    return (
        <div className={`bg-gray-600 text-gray-100 h-screen md:w-[400px] w-full absolute top-[0px] right-[0px] transition duration-500 ease-in-out flex flex-col ${props.rightBarShow ? 'translate-x-[0px]' : 'translate-x-[100%]'} p-[25px]`}>
            <div className="flex justify-between items-center mb-[100px]">
                {
                    props.updatingCreating === 'creating'
                    ?
                    <button 
                        className="cursor-pointer" 
                        onClick={(e) => {
                            props.newTodo(e, props.rightBarTitle, props.rightBarContent)
                            props.setRightBarTitle('Title')
                            props.setRightBarContent('Content')
                            props.setRightBarShow(false)
                        }}
                    >Create</button>
                    :
                    <div className="flex gap-[25px]">
                        <button 
                            className="cursor-pointer" 
                            onClick={() => {
                                props.update()
                                props.setRightBarShow(false)
                                props.handleTodoBgChange(props.bg)
                            }}
                        >Update</button>
                        <button
                            className="cursor-pointer" 
                            onClick={() => {
                                props.handleDelete()
                            }}
                        >Remove</button>
                    </div>
                }
                <button
                    className="cursor-pointer"
                    onClick={() => props.setRightBarShow(false)}
                >Close</button>
            </div>
            <div>
                <textarea
                    value={props.rightBarTitle}
                    rows="3"
                    className="resize-none w-full outline-none overflow-hidden text-2xl font-semibold border rounded-[15px] p-[10px] mb-[5px]" 
                    onChange={(e) => props.setRightBarTitle(e.target.value)}
                ></textarea>
                <textarea 
                    value={props.rightBarContent}
                    rows="10"
                    className="resize-none w-full outline-none border p-[10px] rounded-[15px]" 
                    onChange={(e) => props.setRightBarContent(e.target.value)}
                ></textarea>
                <p className="mt-[25px] pl-[15px] pb-[5px]">Background Color</p>
                <div className="bg-gray-500 w-max flex items-center gap-[10px] rounded-full p-[15px]">{colorPalettes}</div>
            </div>
        </div>
    )
}
import { div } from "framer-motion/client"
import { useContext, useState } from "react"
import { GlobalApi } from "../context/GlobalContext"
import { add_Comment } from "../../service/firebaseCrudOperation";
import { User } from "lucide-react";

export default function Comment({ comment }) {
    const [text, setText] = useState("");
    const { currentUserInfo, selectedProductG } = useContext(GlobalApi);

    const handleSend = async () => {
        if (!text.trim()) return;
        await add_Comment(selectedProductG.id, text, currentUserInfo);
        setText("");
    };
    return (
        <div className="px-4 font-semibold pt-12">
            <h1 className="text-2xl">Comment </h1>
            <div className="flex gap-1 lg:gap-3 items-center mt-7">
                <textarea maxLength={120} style={{ resize: "none" }} type="text" placeholder="Write your comment" className="w-[100%] lg:w-[40%] outline-none border-gray-300 focus:border focus:outline-none border py-1 px-1 font-medium text-[13px] lg:text-[15px]"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="bg-black text-white text-[14px] lg:text-[16px]  px-3 py-.5 lg:px-6 lg:py-1.2 h-10 rounded-lg cursor-pointer" onClick={() => {
                    handleSend()
                }}>
                    Send
                </button>
            </div>
            <div className="pt-5 w-full lg:grid lg:grid-cols-3 gap-2">
                {
                    comment.map((item, i) => {
                        return (
                            <div className="h-auto px-2 py-2 bg-white  mb-2 relative rounded-lg shadow-md shadow-gray-200">
                                <div className="flex flex-row items-center gap-2">
                                    <div className="w-6 h-6 rounded-full border flex items-center justify-center">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h1 className="text-[13px] font-semibold">{item.name}</h1>
                                        <h1 className="text-[11px] font-semibold opacity-55">{item.email}</h1>
                                    </div>
                                </div>
                                <h1 className="pl-2 mt-2 pb-5 line-clamp-3 text-[13px]">{item.comment}</h1>
                                <h1 className="pl-2 mt-2 pb-2 absolute bottom-0 right-2 text-[9px]">{item.createdAt?.toDate().toLocaleString("en-US", {
                                    weekday: "short",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true
                                })}
                                </h1>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
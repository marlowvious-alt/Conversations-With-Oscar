import Button from "../Componants/Button";
import { useNavigate } from "react-router-dom";
import ow from "../assets/ow.png";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { createConversation } from "../services/api";
import { useState } from "react";

export default function Home() {

    const { user } = useAuth();
    const [prompt, setPrompt] = useState("");
    const navigate = useNavigate();
    const createConvo = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/sign-in');
            toast.error('You must be signed in to create a conversation');
            return};
        try{
            const res = await createConversation({ character: "oscar-wilde",prompt });
            if(res.status === 401) {
                console.log(res)
                navigate('/sign-in');
                return toast.error('You must be signed in to create a conversation');
            }
            const conversationId = res?.data?.conversationId;
            navigate(`/conversation/${conversationId}`);
        }catch(err){
            console.log(err);
            toast.error(err?.response?.data?.message || 'Failed to create conversation');
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen px-5">
            <div className="flex-col px-7 pb-10 shadow-[3px_3px_black] relative border border-black bg-[#f7f7f7] flex justify-center max-w-[500px] my-auto">
                <img src={ow} alt="" className="w-[9.5rem]" />
                <h1 className="font-semibold text-5xl -mt-5 leading-[55px]">Conversations With Oscar</h1>
                <p className="font-light mt-7 ">What if you could ask Oscar anything? - and read his resplies in his own wording?</p>
                <form onSubmit={createConvo}>
                <input value={prompt} onChange={(e) => setPrompt(e.target.value)} type="text " placeholder="Ask Oscar"
                    className={"mt-4 block w-full border px-3 py-2 rounded pr-10"}
                />
                <Button className="w-fit mt-3">Submit</Button>
                </form>
            </div>
        </div>
    )
}
'use client'

import * as React from 'react';

import { Loader2 } from "lucide-react"

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {useApiGet, useApiPost} from "../../../services/utils";
import {useInitializeChat, useInvokeChat} from "../../../services/chatServices/index";
import {Badge} from "../ui/badge";

export default function ChatComponent() {
    const scrollContainer = React.useRef(null);

    const [userChatText, setUserChatText] = React.useState("");
    const [botAIStatus, setBotAIStatus] = React.useState(false);
    const [conversationChain, setConversationChain] = React.useState([]);

    const initChatData = useApiGet(["init-chat"], useInitializeChat, {});
    const invokeChatChain = useApiPost(
        useInvokeChat,
        (data) => {
            setConversationChain(prevState => ([
                ...prevState, data
            ]));
        },
        (e) => {
            console.log("e.message:", e.message);
        },
        [],
        {}
    );

    const sendMessage = () => {
        if (userChatText && userChatText.length > 0) {
            const currentMessage = { id: "user", message: userChatText }

            setConversationChain(prevState => ([
                ...prevState, currentMessage
            ]));

            invokeChatChain.mutate({ prompt: userChatText })

            setUserChatText("");
        }
    }

    const handleSendOnClick = () => {
        sendMessage();
    }

    const handleEnterKey = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            sendMessage();
        }
    }

    const handleScroll = (ref: any) => {
        ref.scrollTo({
            top: ref.scrollHeight,
            left: 0,
            behavior: "smooth",
        });
    };

    React.useEffect(() => {
        if (initChatData) {
            if(initChatData?.status === 'success') setBotAIStatus(true);
            else setBotAIStatus(false);
        }
    }, [initChatData]);

    React.useEffect(() => {
        handleScroll(scrollContainer.current);
    }, [conversationChain]);

    React.useEffect(() => {

    }, [invokeChatChain])

    return (
        <div className="w-full h-screen flex flex-col items-center gap-y-4 bg-gray-800 p-12">
            <p className="w-full text-2xl text-neutral-200 uppercase subpixel-antialiased font-extralight">LangChain LLM Chat App</p>

            <Card className="w-full h-[85vh] bg-transparent relative p-4 flex flex-col gap-y-2 items-center">
                <Badge className={`absolute right-1 top-1 flex flex-row gap-x-2 border-none ${botAIStatus ? 'bg-green-200' : 'bg-red-200'}`}>
                    { initChatData.isLoading && <Loader2 className="text-slate-500 h-4 w-4 animate-spin" /> }
                    <p className="text-xs text-slate-500 subpixel-antialiased font-extralight uppercase">{botAIStatus ? 'Online' : 'Offline'}</p>
                </Badge>

                <div className="h-[70vh] w-full overflow-auto pt-2 pb-8" ref={scrollContainer}>
                    {conversationChain && conversationChain.map(( data, index ) => (
                        <div key={data.id} className={`p-2 w-full flex ${ data.id === 'user' ? 'flex-row-reverse' : 'flex-row' }`}>
                            <Card className={`border-none py-4 px-8 max-w-full md:max-w-[60%] ${ data.id === 'user' ? 'bg-gray-500' : 'bg-neutral-500' }`}>
                                <p className="text-white text-base">{data.message}</p>
                            </Card>
                        </div>
                    ))}
                    {invokeChatChain.isPending &&
                        <div className={`p-2 w-full flex flex-row animate-ping`}>
                            <Card className={`border-none py-4 px-8 w-12 max-w-full md:max-w-[60%] bg-gray-500`}>{}</Card>
                        </div>
                    }
                </div>

                { conversationChain.length === 0 && <p className="text-white text-lg">No Queries</p>}

                <Card className="w-full bg-neutral-100 w-[98%] h-[15%] absolute bottom-2 flex flex-col md:flex-row gap-x-6 px-2 items-center">
                    <Textarea
                        className="h-[90%] w-full md:w-[80%] grow border-none text-lg"
                        placeholder="Type your message here."
                        value={userChatText}
                        onChange={e => setUserChatText(e.target.value)}
                    />
                    <Button
                        className="h-[90%] w-full md:w-24 uppercase"
                        onClick={handleSendOnClick}
                        disabled={userChatText.length === 0}
                        onKeyUp={handleEnterKey}
                    >
                        Send
                    </Button>
                </Card>
            </Card>

            {/*<h1 className='py-4 text-2xl font-bold text-sky-400 text-center pt-12'>Next.js With ChatGPT</h1>*/}
            {/*<p className='py-4 text-xl font-bold text-sky-400 text-center'>If you discover any issue, please feel free to contact me.</p>*/}
            {/*<div className='bg-sky-100'>*/}
            {/*    <div className='container mx-auto px-12 max-sm:px-6 py-6 overflow-auto h-[72vh] chat-container' ref={scrollContainer}>*/}
            {/*        {userChat.map((ele, key) => {*/}
            {/*            return (*/}
            {/*                <div key={`blockchat-${key}`}>*/}
            {/*                    <div key={`userchat-${key}`} className='flex flex-col gap-2 items-end justify-center'>*/}
            {/*                        <div className='bg-[#efffde] rounded-2xl px-6 py-2 max-w-[50%] break-words'>{ele}</div>*/}
            {/*                    </div>*/}
            {/*                    {botChat[key] && <div key={`botchat-${key}`} className='flex flex-col gap-2 items-start justify-center break-words'>*/}
            {/*                        <div className='bg-white rounded-2xl px-6 py-2 max-w-[50%]'>{botChat[key]}</div>*/}
            {/*                    </div>}*/}
            {/*                </div>*/}
            {/*            )*/}
            {/*        })}*/}
            {/*        {isLoading && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className='container mx-auto px-12 max-sm:px-2 flex justify-center '>*/}
            {/*    <div className="relative w-1/2 flex items-start py-6 max-xl:w-full flex justify-center max-md:flex-col max-md:items-center gap-4">*/}
            {/*        <textarea value={messageText} onChange={e => setMessageText(e.target.value)} onKeyUp={handleEnterKey}*/}
            {/*                  className="outline-none bg-sky-50 border border-sky-300 text-sky-900 w-full h-14 px-6 py-3"*/}
            {/*                  placeholder="PLEASE TYPE YOUR TEXT HERE ..." />*/}
            {/*        <button className='bg-sky-500 rounded-full text-white text-3xl font-black px-6 py-2 active:translate-y-1' onClick={sendMessage}>*/}
            {/*            Send*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

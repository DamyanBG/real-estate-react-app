/**
 * v0 by Vercel.
 * @see https://v0.dev/t/fI8ayWdmWJ8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatDateTime } from "../../utils/date";

const AvatarImageComponent = ({ alt, src, fallbackText }) => (
    <Avatar className="h-8 w-8">
        <AvatarImage alt={alt} src={src} />
        <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
);

const ParnerMessageUI = ({ partnerAvatarEl, text, time }) => (
    <div className="flex items-start space-x-3">
        {partnerAvatarEl}
        <div className="max-w-[75%] space-y-1.5 rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
            <p>{text}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
        </div>
    </div>
);

const CurrentUserMessageUI = ({ currUserAvatarEl, text, time }) => (
    <div className="flex items-start space-x-3 justify-end">
        <div className="max-w-[75%] space-y-1.5 rounded-lg bg-blue-500 p-3 text-sm text-white">
            <p>{text}</p>
            <p className="text-xs opacity-80">{time}</p>
        </div>
        {currUserAvatarEl}
    </div>
);

export default function ChatView({
    partnerNames,
    currUserNames,
    messages,
    onSend,
}) {
    const [message, setMessage] = useState("");
    const currUserNamesText = `${currUserNames.first_name} ${currUserNames.last_name}`;
    const currUserInitials = `${currUserNames.first_name[0]}${currUserNames.last_name[0]}`;
    const currUserAvatarEl = (
        <AvatarImageComponent
            alt={currUserNamesText}
            src="/placeholder-avatar.jpg"
            fallbackText={currUserInitials}
        />
    );
    const partnerNamesText = `${partnerNames.first_name} ${partnerNames.last_name}`;
    const partnerInitials = `${partnerNames.first_name[0]}${partnerNames.last_name[0]}`;
    const partnerAvatarEl = (
        <AvatarImageComponent
            alt={partnerNamesText}
            src="/placeholder-avatar.jpg"
            fallbackText={partnerInitials}
        />
    );

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSend = () => {
        onSend(message);
        setMessage("");
    };

    const messagesEls = messages.map((m) => {
        if (m.isCurrent) {
            return (
                <CurrentUserMessageUI
                    key={m.id}
                    currUserAvatarEl={currUserAvatarEl}
                    text={m.text}
                    time={formatDateTime(m.created_on)}
                />
            );
        }
        return (
            <ParnerMessageUI
                key={m.id}
                partnerAvatarEl={partnerAvatarEl}
                text={m.text}
                time={formatDateTime(m.created_on)}
            />
        );
    });

    return (
        <div className="flex h-[80dvh] w-full flex-col">
            <header className="flex items-center justify-between bg-gray-100 px-4 py-3 shadow-sm dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                    {partnerAvatarEl}
                    <div className="text-sm font-medium">
                        {partnerNamesText}
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    {currUserAvatarEl}
                    <div className="text-sm font-medium">
                        {currUserNamesText}
                    </div>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="grid gap-4">{messagesEls}</div>
            </div>
            <div className="bg-gray-100 px-4 py-3 shadow-sm dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                    <Input
                        className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Type your message..."
                        type="text"
                        value={message}
                        onChange={handleChange}
                    />
                    <Button onClick={handleSend} variant="primary">
                        Send
                    </Button>
                </div>
            </div>
        </div>
    );
}

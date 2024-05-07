/**
 * v0 by Vercel.
 * @see https://v0.dev/t/fI8ayWdmWJ8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatComponent() {
    return (
        <div className="flex h-[100dvh] w-full flex-col">
            <header className="flex items-center justify-between bg-gray-100 px-4 py-3 shadow-sm dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            alt="John Doe"
                            src="/placeholder-avatar.jpg"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-medium">John Doe</div>
                </div>
                <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            alt="Jane Smith"
                            src="/placeholder-avatar.jpg"
                        />
                        <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-medium">Jane Smith</div>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="grid gap-4">
                    <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                alt="John Doe"
                                src="/placeholder-avatar.jpg"
                            />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="max-w-[75%] space-y-1.5 rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
                            <p>Hey Jane, how's it going?</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                10:30 AM
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 justify-end">
                        <div className="max-w-[75%] space-y-1.5 rounded-lg bg-blue-500 p-3 text-sm text-white">
                            <p>Hi John, I'm doing great! How about you?</p>
                            <p className="text-xs opacity-80">10:31 AM</p>
                        </div>
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                alt="Jane Smith"
                                src="/placeholder-avatar.jpg"
                            />
                            <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                alt="John Doe"
                                src="/placeholder-avatar.jpg"
                            />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="max-w-[75%] space-y-1.5 rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
                            <p>I'm doing well, thanks for asking!</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                10:32 AM
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 justify-end">
                        <div className="max-w-[75%] space-y-1.5 rounded-lg bg-blue-500 p-3 text-sm text-white">
                            <p>
                                That's great to hear! I was wondering if you're
                                free for lunch today?
                            </p>
                            <p className="text-xs opacity-80">10:33 AM</p>
                        </div>
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                alt="Jane Smith"
                                src="/placeholder-avatar.jpg"
                            />
                            <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 px-4 py-3 shadow-sm dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                    <Input
                        className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Type your message..."
                        type="text"
                    />
                    <Button variant="primary">Send</Button>
                </div>
            </div>
        </div>
    );
}

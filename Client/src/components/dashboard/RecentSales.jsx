import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function RecentSales() {
    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">openai.com</p>
                    <p className="text-sm text-muted-foreground">
                        Analysis Request #1024
                    </p>
                </div>
                <div className="ml-auto font-medium text-emerald-500">+82%</div>
            </div>
            <div className="flex items-center">
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">anthropic.com</p>
                    <p className="text-sm text-muted-foreground">
                        Analysis Request #1023
                    </p>
                </div>
                <div className="ml-auto font-medium text-emerald-500">+78%</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarFallback>GG</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">google.com/gemini</p>
                    <p className="text-sm text-muted-foreground">
                        Analysis Request #1022
                    </p>
                </div>
                <div className="ml-auto font-medium text-emerald-500">+91%</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">microsoft.com/copilot</p>
                    <p className="text-sm text-muted-foreground">
                        Analysis Request #1021
                    </p>
                </div>
                <div className="ml-auto font-medium text-amber-500">+45%</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarFallback>MP</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">perplexity.ai</p>
                    <p className="text-sm text-muted-foreground">
                        Analysis Request #1020
                    </p>
                </div>
                <div className="ml-auto font-medium text-emerald-500">+89%</div>
            </div>
        </div>
    )
}

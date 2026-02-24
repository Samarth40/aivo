import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AuthPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-primary">AIVO</CardTitle>
                    <CardDescription>Sign in to optimize your AI visibility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded text-center text-sm text-muted-foreground">
                        [ Authentication Form Placeholder ]
                    </div>
                    <Button className="w-full">Sign In</Button>
                </CardContent>
            </Card>
        </div>
    )
}

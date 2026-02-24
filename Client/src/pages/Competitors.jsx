import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Competitors() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Competitor Intelligence</h1>
                    <p className="text-muted-foreground">Compare structure and entity coverage against top ranking pages.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm">Run New Scan</button>
            </div>

            <Card className="w-full border-border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Gap Analysis Grid</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted text-muted-foreground uppercase text-xs border-b">
                                <tr>
                                    <th className="px-4 py-3">Metric</th>
                                    <th className="px-4 py-3 text-primary font-bold">Your URL</th>
                                    <th className="px-4 py-3">Competitor 1</th>
                                    <th className="px-4 py-3">Competitor 2</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border/50">
                                    <td className="px-4 py-3 font-medium">FAQ Schema</td>
                                    <td className="px-4 py-3 text-destructive">Missing</td>
                                    <td className="px-4 py-3">Present</td>
                                    <td className="px-4 py-3">Present</td>
                                </tr>
                                <tr className="border-b border-border/50">
                                    <td className="px-4 py-3 font-medium">Entity: "LLM"</td>
                                    <td className="px-4 py-3">Defined (3x)</td>
                                    <td className="px-4 py-3">Defined (5x)</td>
                                    <td className="px-4 py-3 text-destructive">Missing</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">Readability</td>
                                    <td className="px-4 py-3">Grade 9</td>
                                    <td className="px-4 py-3">Grade 8</td>
                                    <td className="px-4 py-3">Grade 11</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

import React from 'react'

export default function AnalysisReport() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analysis Report</h1>
                    <p className="text-muted-foreground truncate max-w-md">https://example.com/blog/what-is-agentic-ai</p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-muted-foreground uppercase font-semibold tracking-wider">AI Visibility Score</div>
                    <div className="text-4xl font-extrabold text-primary">82/100</div>
                </div>
            </div>

            {/* Tabs Placeholder */}
            <div className="flex border-b border-border">
                <div className="px-4 py-2 border-b-2 border-primary text-primary font-medium">Semantic Match</div>
                <div className="px-4 py-2 text-muted-foreground hover:text-foreground cursor-pointer">Entity Coverage</div>
                <div className="px-4 py-2 text-muted-foreground hover:text-foreground cursor-pointer">Tone & Clarity</div>
            </div>

            <div className="p-12 border border-dashed rounded-xl bg-muted/20 text-center text-muted-foreground flex flex-col items-center justify-center">
                <p>Engine data visualizer will render here.</p>
                <p className="text-sm mt-2">Connecting to PyTorch backend...</p>
            </div>
        </div>
    )
}

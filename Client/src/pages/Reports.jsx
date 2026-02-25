import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download } from "lucide-react"

const recentReports = [
    { id: 1, name: "Q3 SEO Performance Review.pdf", date: "Oct 12, 2026", size: "2.4 MB" },
    { id: 2, name: "Weekly AEO Keyword Tracking.csv", date: "Oct 09, 2026", size: "845 KB" },
    { id: 3, name: "Competitor Market Share Analysis.pdf", date: "Oct 01, 2026", size: "4.1 MB" },
]

export default function Reports() {
    return (
        <div className="flex-1 space-y-6 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
            </div>

            <Card className="bg-card/40 border-border/40 shadow-sm mt-4">
                <CardHeader>
                    <CardTitle>Generated Analyses</CardTitle>
                    <CardDescription>
                        Download your previously generated intelligence reports.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentReports.map((report) => (
                            <div key={report.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-background/50 hover:bg-muted/30 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-primary/10 rounded-md">
                                        <FileText className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-foreground">{report.name}</h4>
                                        <p className="text-xs text-muted-foreground">{report.date} • {report.size}</p>
                                    </div>
                                </div>
                                <button className="text-muted-foreground hover:text-foreground p-2 pointer-events-auto">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

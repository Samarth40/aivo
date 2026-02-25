import React from "react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreVertical, Focus, Target, RefreshCw, CheckCircle2 } from "lucide-react"

const documents = [
    {
        id: "1",
        header: "Cover page",
        type: "Cover page",
        status: "In Process",
        target: 18,
        limit: 5,
        reviewer: "Eddie Lake",
    },
    {
        id: "2",
        header: "Table of contents",
        type: "Table of contents",
        status: "Done",
        target: 29,
        limit: 24,
        reviewer: "Eddie Lake",
    },
    {
        id: "3",
        header: "Executive summary",
        type: "Narrative",
        status: "Done",
        target: 10,
        limit: 13,
        reviewer: "Eddie Lake",
    },
    {
        id: "4",
        header: "Technical approach",
        type: "Narrative",
        status: "Done",
        target: 27,
        limit: 23,
        reviewer: "Jamik Tashpulatov",
    },
]

export function DataTable() {
    return (
        <div className="space-y-4">
            {/* Table Top Controls */}
            <div className="flex items-center justify-between">
                <div className="flex bg-card/60 rounded-lg p-1 border border-border/50 shadow-sm">
                    <Button variant="secondary" size="sm" className="bg-muted text-foreground hover:bg-muted font-medium rounded-md px-4 shadow-sm h-8 text-xs">
                        Outline
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-transparent font-medium px-4 h-8 text-xs">
                        Past Performance <Badge variant="secondary" className="ml-2 bg-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/20 px-1.5 py-0">3</Badge>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-transparent font-medium px-4 h-8 text-xs">
                        Key Personnel <Badge variant="secondary" className="ml-2 bg-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/20 px-1.5 py-0">2</Badge>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-transparent font-medium px-4 h-8 text-xs">
                        Focus Documents
                    </Button>
                </div>

                <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="bg-card/40 border-border/50 text-xs font-medium h-8">
                        <Focus className="w-4 h-4 mr-2" />
                        Customize Columns
                    </Button>
                    <Button variant="secondary" size="sm" className="text-xs font-medium h-8">
                        <span className="mr-1 text-base leading-none">+</span> Add Section
                    </Button>
                </div>
            </div>

            {/* Table Body */}
            <div className="rounded-xl border border-border/40 bg-card/40 overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-card/40">
                        <TableRow className="border-border/40 hover:bg-transparent">
                            <TableHead className="w-12 text-center border-r border-border/40"><Checkbox /></TableHead>
                            <TableHead className="font-semibold text-foreground">Header</TableHead>
                            <TableHead className="font-semibold text-foreground">Section Type</TableHead>
                            <TableHead className="font-semibold text-foreground">Status</TableHead>
                            <TableHead className="font-semibold text-foreground">Target</TableHead>
                            <TableHead className="font-semibold text-foreground">Limit</TableHead>
                            <TableHead className="font-semibold text-foreground">Reviewer</TableHead>
                            <TableHead className="w-12 text-center"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {documents.map((doc) => (
                            <TableRow key={doc.id} className="border-border/40 hover:bg-muted/30">
                                <TableCell className="text-center border-r border-border/40">
                                    <div className="flex items-center justify-center space-x-2">
                                        <span className="text-[10px] text-muted-foreground/50 tracking-[2px]">:::</span>
                                        <Checkbox />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{doc.header}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted/50 border border-border/50 text-muted-foreground">
                                        {doc.type}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {doc.status === "Done" ? (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">
                                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                            Done
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border/50">
                                            <RefreshCw className="w-3.5 h-3.5 mr-1" />
                                            In Process
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium text-foreground/80">{doc.target}</TableCell>
                                <TableCell className="font-medium text-foreground/80">{doc.limit}</TableCell>
                                <TableCell className="text-muted-foreground">{doc.reviewer}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-foreground">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

import React from "react"
import { DataTable } from "@/components/dashboard/DataTable"

export default function DataLibrary() {
    return (
        <div className="flex-1 space-y-6 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Data Library</h2>
            </div>
            <p className="text-muted-foreground">Manage your indexed documents and training material.</p>

            {/* Re-using the custom DataTable component from earlier for the library */}
            <div className="pt-4">
                <DataTable />
            </div>
        </div>
    )
}

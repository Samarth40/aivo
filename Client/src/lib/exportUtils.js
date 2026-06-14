export function downloadCSV(filename, rows) {
    if (!rows || !rows.length) return

    const keys = Object.keys(rows[0])
    const csvContent = [
        keys.join(','),
        ...rows.map(row => keys.map(k => {
            let val = row[k] === null || row[k] === undefined ? '' : row[k]
            val = String(val).replace(/"/g, '""')
            if (val.search(/("|,|\n)/g) >= 0) {
                val = `"${val}"`
            }
            return val
        }).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

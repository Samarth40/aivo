import { useEffect, useState } from "react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const DATA_3M = [
    { date: "Jan 15", score: 42 },
    { date: "Jan 22", score: 48 },
    { date: "Jan 29", score: 45 },
    { date: "Feb 5", score: 53 },
    { date: "Feb 12", score: 58 },
    { date: "Feb 19", score: 61 },
    { date: "Feb 26", score: 64 },
    { date: "Mar 5", score: 59 },
    { date: "Mar 12", score: 67 },
    { date: "Mar 19", score: 72 },
    { date: "Mar 26", score: 74 },
    { date: "Apr 2", score: 71 },
]

const DATA_30D = [
    { date: "Mar 4", score: 59 },
    { date: "Mar 7", score: 62 },
    { date: "Mar 10", score: 60 },
    { date: "Mar 13", score: 65 },
    { date: "Mar 16", score: 68 },
    { date: "Mar 19", score: 72 },
    { date: "Mar 22", score: 70 },
    { date: "Mar 25", score: 74 },
    { date: "Mar 28", score: 73 },
    { date: "Apr 1", score: 71 },
]

const DATA_7D = [
    { date: "Mar 27", score: 73 },
    { date: "Mar 28", score: 72 },
    { date: "Mar 29", score: 74 },
    { date: "Mar 30", score: 70 },
    { date: "Mar 31", score: 71 },
    { date: "Apr 1", score: 73 },
    { date: "Apr 2", score: 71 },
]

const DATASETS = { "3m": DATA_3M, "30d": DATA_30D, "7d": DATA_7D }

function useCSSColor(varName) {
    const [color, setColor] = useState("#888")
    useEffect(() => {
        const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
        if (raw) setColor(raw.startsWith("oklch") || raw.startsWith("#") || raw.startsWith("rgb") ? raw : `oklch(${raw})`)
    }, [varName])
    return color
}

export function Overview({ range = "3m" }) {
    const primaryColor = useCSSColor("--primary")
    const borderColor = useCSSColor("--border")
    const mutedFg = useCSSColor("--muted-foreground")
    const popoverBg = useCSSColor("--popover")

    const data = DATASETS[range] || DATA_3M

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={borderColor} strokeOpacity={0.4} vertical={false} />
                <XAxis
                    dataKey="date"
                    stroke={mutedFg}
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dy={8}
                />
                <YAxis
                    stroke={mutedFg}
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                    dx={-8}
                    tickFormatter={(v) => `${v}`}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: popoverBg,
                        borderColor: borderColor,
                        borderRadius: '8px',
                        fontSize: '12px',
                    }}
                    labelStyle={{ color: mutedFg, fontWeight: 600, marginBottom: 4 }}
                    itemStyle={{ color: primaryColor }}
                    formatter={(value) => [`${value}/100`, "AI Visibility Score"]}
                />
                <Area
                    type="monotone"
                    dataKey="score"
                    stroke={primaryColor}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#scoreGradient)"
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 2, stroke: popoverBg }}
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

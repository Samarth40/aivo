import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
    { name: "Jun 24", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Jun 25", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Jun 26", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Jun 27", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Jun 28", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Jun 29", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Jun 30", total: Math.floor(Math.random() * 5000) + 1000 },
]

export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    {/* A secondary subtle gradient line effect seen in the mockup */}
                    <linearGradient id="colorOverlay" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                />
                <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--primary))' }}
                />
                <Area
                    type="monotone"
                    dataKey="total"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                />
                {/* Simulate the double wave in the mockup by drawing a second area slightly offset */}
                <Area
                    type="monotone"
                    dataKey={(d) => d.total * 0.6}
                    stroke="#ffffff"
                    strokeOpacity={0.5}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorOverlay)"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

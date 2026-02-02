'use client';

import { ComposedChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface HistoryDataPoint {
    date: string;
    value: number;
}

interface ValueHistoryChartProps {
    data: HistoryDataPoint[];
    isLoading: boolean;
}

export default function ValueHistoryChart({ data, isLoading }: ValueHistoryChartProps) {
    const formatUsd = (num: number) => {
        if (num === 0) return '';
        if (num >= 1000000) {
            return '$' + (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return '$' + (num / 1000).toFixed(0) + 'K';
        }
        return '$' + num.toFixed(0);
    };

    const getOrdinalSuffix = (day: number) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatDate = (dateStr: any) => {
        if (!dateStr) return '';
        // Create date object and force UTC interpretation
        const date = new Date(String(dateStr) + 'T00:00:00Z');
        const month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
        const day = date.getUTCDate();
        return `${month} ${day}${getOrdinalSuffix(day)}`;
    };

    // Keep short format for X-axis to avoid overcrowding, or use the full format if space allows.
    // User asked for "Spell out the date fully", usually implies inside tooltip or if labels are sparse.
    // Given we switched to weekly labels, we can probably fit "Jan 27" on axis and full in tooltip, 
    // OR try full on axis. Let's use short for axis and full for tooltip to be safe, or just distinct functions.
    // Actually, user said "Spell out the date fully: January 27th", likely for the tooltip since axis would overlap.
    // Let's create a specific format for the Tooltip.

    const formatAxisDate = (dateStr: string) => {
        const date = new Date(dateStr + 'T00:00:00Z');
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
    };

    // Calculate daily increase
    const chartData = data.map((point, index) => {
        const prevValue = index > 0 ? data[index - 1].value : point.value;
        const increase = Math.max(0, point.value - prevValue);
        return {
            ...point,
            increase
        };
    });

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-white/40 font-mundial">Loading chart data...</div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <p className="text-white/60 font-mundial text-lg mb-2">No history data yet</p>
                <p className="text-white/40 font-mundial text-sm">
                    The chart will populate as daily snapshots are recorded.
                </p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFE048" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#FFE048" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="date"
                        tickFormatter={formatAxisDate}
                        stroke="#ffffff60"
                        fontSize={14}
                        tickLine={false}
                        axisLine={false}
                        interval={6} // Show label every 7 days (weekly)
                        fontFamily="var(--font-brice)"
                        fontWeight="700"
                        padding={{ left: 20, right: 20 }}
                    />
                    <YAxis
                        yAxisId="left"
                        tickFormatter={formatUsd}
                        stroke="#ffffff60"
                        fontSize={14}
                        tickLine={false}
                        axisLine={false}
                        width={80}
                        fontFamily="var(--font-brice)"
                        fontWeight="700"
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#121212',
                            border: '1px solid #FFE048',
                            borderRadius: '12px',
                            fontSize: '16px',
                            padding: '16px',
                            fontFamily: 'var(--font-brice)',
                            fontWeight: '700',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                        }}
                        labelFormatter={formatDate}
                        formatter={(value: number) => ['$' + value.toLocaleString(undefined, { maximumFractionDigits: 0 }), 'Total Value']}
                        itemStyle={{ color: '#FFE048' }}
                        labelStyle={{ color: '#ffffff', marginBottom: '8px', fontSize: '18px' }}
                    />
                    <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="value"
                        stroke="#FFE048"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

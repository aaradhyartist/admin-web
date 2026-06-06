import { useState } from 'react';

/**
 * Lightweight dependency-free SVG line/area chart.
 * props:
 *   data: [{ label: string, value: number }]
 *   color: hex string (default red)
 */
export default function TrendChart({ data = [], color = '#DC2626' }) {
    const [hover, setHover] = useState(null);

    const W = 520;
    const H = 180;
    const P = { top: 16, right: 12, bottom: 24, left: 12 };
    const innerW = W - P.left - P.right;
    const innerH = H - P.top - P.bottom;

    const max = Math.max(1, ...data.map((d) => d.value));
    const n = data.length;
    const stepX = n > 1 ? innerW / (n - 1) : 0;

    const x = (i) => P.left + i * stepX;
    const y = (v) => P.top + innerH - (v / max) * innerH;

    const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.value)}`).join(' ');
    const areaPath = n
        ? `${linePath} L ${x(n - 1)} ${P.top + innerH} L ${x(0)} ${P.top + innerH} Z`
        : '';

    const gid = `grad-${color.replace('#', '')}`;

    return (
        <div className="w-full">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="none">
                <defs>
                    <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.35" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* baseline grid */}
                {[0.25, 0.5, 0.75, 1].map((g) => (
                    <line
                        key={g}
                        x1={P.left}
                        x2={W - P.right}
                        y1={P.top + innerH * g}
                        y2={P.top + innerH * g}
                        stroke="#ffffff"
                        strokeOpacity="0.06"
                        strokeWidth="1"
                    />
                ))}

                {n > 0 && (
                    <>
                        <path d={areaPath} fill={`url(#${gid})`} />
                        <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

                        {/* points + hover hit areas */}
                        {data.map((d, i) => (
                            <g key={i}>
                                {hover === i && (
                                    <circle cx={x(i)} cy={y(d.value)} r="4.5" fill={color} stroke="#0c0c0c" strokeWidth="2" />
                                )}
                                <rect
                                    x={x(i) - stepX / 2}
                                    y={0}
                                    width={stepX || innerW}
                                    height={H}
                                    fill="transparent"
                                    onMouseEnter={() => setHover(i)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </g>
                        ))}
                    </>
                )}
            </svg>

            {/* x-axis labels (first / mid / last) + hover readout */}
            <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-500 font-medium">
                <span>{data[0]?.label}</span>
                <span className="text-slate-300 font-bold">
                    {hover != null && data[hover]
                        ? `${data[hover].label}: ${data[hover].value}`
                        : data[Math.floor(n / 2)]?.label}
                </span>
                <span>{data[n - 1]?.label}</span>
            </div>
        </div>
    );
}

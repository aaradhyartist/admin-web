// Tiny dependency-free CSV exporter.
// columns: [{ key, label, format? }]  rows: array of objects
const escape = (val) => {
    if (val == null) return '';
    const s = String(val);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function exportToCsv(filename, columns, rows) {
    const header = columns.map((c) => escape(c.label)).join(',');
    const body = rows
        .map((row) =>
            columns
                .map((c) => escape(c.format ? c.format(row[c.key], row) : row[c.key]))
                .join(',')
        )
        .join('\n');

    // BOM so Excel reads UTF-8 correctly
    const blob = new Blob(['﻿' + header + '\n' + body], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export const csvDate = (d) => (d ? new Date(d).toISOString() : '');

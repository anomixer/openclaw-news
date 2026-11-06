const MONTHS = {
    jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12,
    january: 1, february: 2, march: 3, april: 4, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

const TW_PERIODS = { '上旬': 'early', '中旬': 'mid', '下旬': 'late' };

function pad(n) {
    return String(n).padStart(2, '0');
}

function periodId(label) {
    const text = String(label || '').trim();

    const tw = text.match(/^(\d{4})-(\d{2})\s*(上旬|中旬|下旬)/);
    if (tw) return `${tw[1]}-${tw[2]}-${TW_PERIODS[tw[3]]}`;

    const en = text.match(/^(Early|Mid|Late)\s+([A-Za-z]+)\s+(\d{4})/);
    if (en && MONTHS[en[2].toLowerCase()]) {
        return `${en[3]}-${pad(MONTHS[en[2].toLowerCase()])}-${en[1].toLowerCase()}`;
    }

    const ym = text.match(/^(\d{4})-(\d{2})/);
    if (ym) return `${ym[1]}-${ym[2]}`;

    const mon = text.match(/^([A-Za-z]+)\s+(\d{4})/);
    if (mon && MONTHS[mon[1].toLowerCase()]) {
        return `${mon[2]}-${pad(MONTHS[mon[1].toLowerCase()])}`;
    }

    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function periodEnd(id) {
    const parts = String(id || '').split('-');
    if (parts.length < 2) return null;
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    if (!year || !month) return null;
    let day;
    if (parts[2] === 'early') day = 10;
    else if (parts[2] === 'mid') day = 20;
    else if (parts[2] === 'late') day = new Date(Date.UTC(year, month, 0)).getUTCDate();
    else day = new Date(Date.UTC(year, month, 0)).getUTCDate();
    return `${year}-${pad(month)}-${pad(day)}`;
}

module.exports = { periodId, periodEnd };

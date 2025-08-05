export function convertDate(paDate: Date) {
    try {
        const date = new Date(paDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear() + 543).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (error) {
        console.error(`Error convertDate :`, error);
        return "";
    }
};

export function formatDateToThai(date: Date): string {
    try {
        const months = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        const year = date.getFullYear() + 543;
        const month = months[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');
        return `${day} ${month} ${year}`;
    } catch (error) {
        console.error(`Error formatDateToThai :`, error);
        return "";
    }
};

export function getDay(date: Date): string {
    return date.getDate().toString().padStart(2, '0');
};

export function getThaiMonthShort(date: Date): string {
    const thaiMonths = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    return thaiMonths[date.getMonth()];
};

export function getThaiYear(date: Date): number {
    return date.getFullYear() + 543;
};

export function formatDateToYMD(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
};

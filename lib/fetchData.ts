// T یک Placeholder است که موقع استفاده مشخص می‌شود چیست
export async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('خطا در دریافت داده');
    }
    return response.json();
}
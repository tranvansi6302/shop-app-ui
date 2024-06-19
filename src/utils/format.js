export const formatCurrencyVND = (currency) => {
    return (currency && currency.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })) ?? 0
}

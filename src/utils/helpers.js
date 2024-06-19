export const getMinMaxPrice = (items) => {
    if (!items || items.length === 0) return 0
    const prices = items?.map((item) => item.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    return { minPrice, maxPrice }
}

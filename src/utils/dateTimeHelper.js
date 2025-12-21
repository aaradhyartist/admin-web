export const DateHelper = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

}
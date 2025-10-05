export const convertDateToLocale = (dateString: string, locale: string = 'ru-RU'): string => {
    const date = new Date(dateString);

    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};
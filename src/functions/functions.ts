import DOMPurify from 'isomorphic-dompurify';

export const convertDateToLocale = (dateString: string, locale: string = 'ru-RU'): string => {
    const date = new Date(dateString);

    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

export function createSanitizedHTML(htmlString: string | null | undefined): { __html: string; } {
    const sanitized = DOMPurify.sanitize(htmlString || '');
    return { __html: sanitized };
}
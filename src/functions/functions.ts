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
    return {__html: sanitized};
}

export function normalizePhone(phone: string) {
    return phone.replace(/[^\+0-9]+/g, '').replace(/^[78]/, '+7');
}

export function createEmailLink(email: string) {
    return 'mailto:' + email;
}

export function createPhoneLink(phone: string) {
    return 'tel:' + normalizePhone(phone);
}

export function createTelegramLink(telegram: string) {
    return 'https://t.me/' + telegram;
}

export function createWhatsappLink(whatsapp: string) {
    return 'https://wa.me/' + normalizePhone(whatsapp);
}

export function createVkLink(vk: string) {
    return 'https://vk.ru/' + vk;
}

export function createMaxLink(max: string) {
    return 'https://max.ru/' + max;
}

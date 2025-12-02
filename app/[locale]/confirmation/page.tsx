import { setRequestLocale } from 'next-intl/server';
import ConfirmationContent from '@/components/ConfirmationContent';

export default function ConfirmationPage({ params: { locale } }: { params: { locale: string } }) {
    setRequestLocale(locale);
    return <ConfirmationContent />;
}

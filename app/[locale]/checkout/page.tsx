import { setRequestLocale } from 'next-intl/server';
import CheckoutForm from '@/components/CheckoutForm';
import Header from '@/components/Header';

export default function CheckoutPage({ params: { locale } }: { params: { locale: string } }) {
    setRequestLocale(locale);
    return (
        <>
            <Header />
            <CheckoutForm />
        </>
    );
}

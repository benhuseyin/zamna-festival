import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['tr', 'en'],

    // Used when no locale matches
    defaultLocale: 'tr',

    localePrefix: 'always'
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(tr|en)/:path*']
};

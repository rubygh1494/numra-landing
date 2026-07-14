import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'NUMRA — Your numbers. Your next move.',
  description: 'The first numerology app built for action. Know when to launch, who to trust, and what your numbers are actually telling you.',
  openGraph: {
    title: 'NUMRA — Your numbers. Your next move.',
    description: 'The first numerology app built for action, not just identity.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1017537037806339');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}

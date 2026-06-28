import './globals.css'

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
      </head>
      <body>{children}</body>
    </html>
  )
}

import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workout Tracker',
  description: 'Personal workout tracking application by Naiara',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

import { Children } from '@/types';

export default function RootLayout({ children }: Children) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}

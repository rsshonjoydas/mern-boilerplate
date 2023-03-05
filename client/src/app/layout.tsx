import { Children } from '@/types';
import '../styles/index.scss';

export default function RootLayout({ children }: Children) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}

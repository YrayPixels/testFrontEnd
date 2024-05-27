
import { PRIMARY, SECONDARY } from './__utils__/utils';
import '../styles.css';
// export const metadata = {
//   title: 'Servena',
//   description: 'Self Service Platform',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='' style={{ color: SECONDARY }}>
        {children}
      </body>
    </html>
  )
}


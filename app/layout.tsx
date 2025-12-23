import "./globals.css";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.css'; 


export const metadata = {
  title: "My App",
  description: "Example with Navbar in layout",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />     
        <main>{children}</main>
      </body>
    </html>
  );
}

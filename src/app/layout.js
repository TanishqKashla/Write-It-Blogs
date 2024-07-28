import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import localfont from "next/font/local";
import AuthProvider from "@/providers/AuthProvider";
import { Raleway } from "next/font/google";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: '400', // Set the desired font weight here
});

const helvetica = localfont({
  src: [
    {
      path: "../../public/fonts/Helvetica.ttf",
      weight: "500",
    },
  ]
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: '400', // Set the desired font weight here
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400', // Set the desired font weight here
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Write It",
  description: "Developed by Tanishq Kashla",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <main>
          <AuthProvider>
            <Nav />
            {children}
          </AuthProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}


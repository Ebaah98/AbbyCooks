import "./globals.css";
import "../App.css"; // Current project has App.css too

export const metadata = {
    title: "Abby Kookz | Premium African Catering",
    description: "Modern Ghanaian Catering & Delivery in the Bronx and Yonkers.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" type="image/png" href="/logo.png" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}

import "./globals.css";

export const metadata = {
  title: "Jangam Udaya Bhanu | AI Engineer",
  description: "Elite AI Engineering and Fullstack Development",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

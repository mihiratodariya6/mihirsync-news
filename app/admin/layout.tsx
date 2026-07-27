import "../globals.css";
import AuthGuard from "../../components/admin/AuthGuard";

export const metadata = {
  title: "MihirSync | Enterprise CMS",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}
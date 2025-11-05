export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboardLayout">
      <main className="mainContainer">{children}</main>
    </div>
  );
}

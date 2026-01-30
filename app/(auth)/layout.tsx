import { BottomNavigation } from "@/components/BottomNavigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <main className="max-w-4xl mx-auto">{children}</main>
      <BottomNavigation />
    </div>
  );
}

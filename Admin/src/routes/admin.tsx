import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/lib/auth-store";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/admin")({
  component: AdminShell,
});

function AdminShell() {
  const isAuthed = useAuth((s) => s.isAuthed);
  if (!isAuthed) return <Navigate to="/login" />;
  return (
    <AdminLayout>
      <Outlet />
      <Toaster position="top-right" richColors />
    </AdminLayout>
  );
}

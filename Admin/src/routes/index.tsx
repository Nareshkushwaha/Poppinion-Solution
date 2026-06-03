import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-store";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const isAuthed = useAuth((s) => s.isAuthed);
  return <Navigate to={isAuthed ? "/admin" : "/login"} />;
}

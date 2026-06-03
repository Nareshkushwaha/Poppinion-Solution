import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { PageHeader } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Website Settings — Poppinion Admin" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [siteName, setSiteName] = useState("Poppinion Solutions");
  const [siteUrl, setSiteUrl] = useState("https://poppinion.com");
  const [maintenance, setMaintenance] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  // FETCH SETTINGS FROM DATABASE
  const fetchSettings = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/settings');
      const data = await res.json();
      if (data.success && data.data) {
        setSiteName(data.data.siteName || "");
        setSiteUrl(data.data.siteUrl || "");
        setMaintenance(data.data.maintenance || false);
        setAnalytics(data.data.analytics || false);
      }
    } catch (error) {
      console.error("Fetch settings error:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // SAVE SETTINGS TO DATABASE
  const save = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteName,
          siteUrl,
          maintenance,
          analytics
        })
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Backend server connect nahi ho raha.");
    }
  };

  return (
    <div>
      <PageHeader title="Website Settings" description="Global settings for your website."
        action={<Button className="gradient-brand text-white border-0" onClick={save}><Save className="size-4 mr-2" /> Save</Button>}
      />
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">General</h3>
          <div className="space-y-2"><Label>Site Name</Label><Input value={siteName} onChange={(e) => setSiteName(e.target.value)} /></div>
          <div className="space-y-2"><Label>Site URL</Label><Input value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} /></div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div><p className="font-medium text-sm">Maintenance Mode</p><p className="text-xs text-muted-foreground">Show maintenance page to visitors</p></div>
            <Switch checked={maintenance} onCheckedChange={setMaintenance} />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div><p className="font-medium text-sm">Enable Analytics</p><p className="text-xs text-muted-foreground">Track website usage</p></div>
            <Switch checked={analytics} onCheckedChange={setAnalytics} />
          </div>
        </Card>
      </div>
    </div>
  );
} 
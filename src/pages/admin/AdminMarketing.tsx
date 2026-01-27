import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Facebook, Instagram, Linkedin, MessageSquare } from "lucide-react";

const AdminMarketing = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Marketing Management</h1>
        <p className="text-muted-foreground">Manage campaigns and social media integrations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Across all platforms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Facebook</CardTitle>
            <Facebook className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Followers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Instagram</CardTitle>
            <Instagram className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Followers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">LinkedIn</CardTitle>
            <Linkedin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Connections</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Meta Business Suite</CardTitle>
            <CardDescription>Facebook & Instagram campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Configure Meta API keys to enable integration</p>
            <p className="text-sm">Go to API Keys settings to add your Meta credentials</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>WhatsApp Business</CardTitle>
            <CardDescription>Customer communication</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="h-5 w-5" />
              <p>Configure WhatsApp API keys to enable integration</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>LinkedIn Marketing</CardTitle>
            <CardDescription>Professional network campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Configure LinkedIn API keys to enable integration</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Analytics</CardTitle>
            <CardDescription>Performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No campaign data available yet</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMarketing;

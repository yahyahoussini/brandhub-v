import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send, Users, TrendingUp } from "lucide-react";

const AdminEmail = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Email Marketing</h1>
        <p className="text-muted-foreground">Manage email campaigns and newsletters</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Total subscribers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sent Emails</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">Average open rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">Average click rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Email Service Provider</CardTitle>
            <CardDescription>Resend API Integration</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Configure Resend API key to enable email campaigns</p>
            <p className="text-sm">Go to API Keys settings to add your Resend credentials</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Campaigns</CardTitle>
            <CardDescription>Latest email campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No campaigns created yet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Templates</CardTitle>
            <CardDescription>Email templates library</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Create email templates for your campaigns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Automation</CardTitle>
            <CardDescription>Automated email sequences</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Set up automated email workflows</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminEmail;

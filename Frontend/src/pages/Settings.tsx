
import { AppShell } from "@/components/layout/AppShell";
import { useState } from "react";
import { Check, Moon, Sun, Bell, Globe, Lock, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";

const Settings = () => {
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [expiryAlerts, setExpiryAlerts] = useState(true);
  const [inventoryAlerts, setInventoryAlerts] = useState(true);
  const [language, setLanguage] = useState("en");
  const [dateFormat, setDateFormat] = useState("YYYY-MM-DD");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [autoLogout, setAutoLogout] = useState("30");
  
  const handleSaveGeneralSettings = () => {
    toast.success("General settings saved successfully.");
  };
  
  const handleSaveNotificationSettings = () => {
    toast.success("Notification settings saved successfully.");
  };
  
  const handleSavePreferences = () => {
    toast.success("Preferences saved successfully.");
  };
  
  const handleSaveSecuritySettings = () => {
    toast.success("Security settings saved successfully.");
  };

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure system preferences and manage user settings.
        </p>
        
        <Tabs defaultValue="general">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-64 flex-shrink-0">
              <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
                <TabsTrigger value="general" className="justify-start w-full">
                  <Globe className="h-4 w-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger value="notifications" className="justify-start w-full">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="preferences" className="justify-start w-full">
                  <User className="h-4 w-4 mr-2" />
                  Preferences
                </TabsTrigger>
                <TabsTrigger value="security" className="justify-start w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1">
              <TabsContent value="general" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Configure the basic system settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Theme</Label>
                          <p className="text-sm text-muted-foreground">
                            Choose between light and dark theme.
                          </p>
                        </div>
                        <div>
                          <RadioGroup 
                            value={theme} 
                            onValueChange={setTheme}
                            className="flex"
                          >
                            <div className="flex items-center space-x-2 mr-4">
                              <RadioGroupItem value="light" id="light" />
                              <Label htmlFor="light" className="flex items-center">
                                <Sun className="h-4 w-4 mr-1" />
                                Light
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="dark" id="dark" />
                              <Label htmlFor="dark" className="flex items-center">
                                <Moon className="h-4 w-4 mr-1" />
                                Dark
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Language</Label>
                          <p className="text-sm text-muted-foreground">
                            Select your preferred language.
                          </p>
                        </div>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ru">Russian</SelectItem>
                            <SelectItem value="jp">Japanese</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Automatic Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Keep the system updated automatically.
                          </p>
                        </div>
                        <Switch checked={true} />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveGeneralSettings}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure how you receive alerts and notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Enable Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive all system notifications.
                          </p>
                        </div>
                        <Switch 
                          checked={notifications} 
                          onCheckedChange={setNotifications} 
                        />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Critical Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive alerts for critical system events.
                          </p>
                        </div>
                        <Switch 
                          checked={criticalAlerts} 
                          onCheckedChange={setCriticalAlerts}
                          disabled={!notifications} 
                        />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Item Expiry Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive alerts when items are approaching expiry.
                          </p>
                        </div>
                        <Switch 
                          checked={expiryAlerts} 
                          onCheckedChange={setExpiryAlerts}
                          disabled={!notifications} 
                        />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Inventory Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive alerts for low stock items.
                          </p>
                        </div>
                        <Switch 
                          checked={inventoryAlerts} 
                          onCheckedChange={setInventoryAlerts}
                          disabled={!notifications} 
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveNotificationSettings}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>User Preferences</CardTitle>
                    <CardDescription>
                      Customize your experience with personal preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Date Format</Label>
                          <p className="text-sm text-muted-foreground">
                            Choose your preferred date format.
                          </p>
                        </div>
                        <Select value={dateFormat} onValueChange={setDateFormat}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Weight Unit</Label>
                          <p className="text-sm text-muted-foreground">
                            Select your preferred weight unit.
                          </p>
                        </div>
                        <Select value={weightUnit} onValueChange={setWeightUnit}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">Kilograms (kg)</SelectItem>
                            <SelectItem value="lb">Pounds (lb)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Compact UI Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Display more information in less space.
                          </p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSavePreferences}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Configure security settings and access controls.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account.
                          </p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Auto-Logout Timer</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically log out after inactivity.
                          </p>
                        </div>
                        <Select value={autoLogout} onValueChange={setAutoLogout}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Activity Logging</Label>
                          <p className="text-sm text-muted-foreground">
                            Log all cargo-related activities for auditing.
                          </p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Access Controls</Label>
                          <p className="text-sm text-muted-foreground">
                            Manage user access to system features.
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Shield className="h-4 w-4" />
                          <span>Manage</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSecuritySettings}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </AppShell>
  );
};

export default Settings;

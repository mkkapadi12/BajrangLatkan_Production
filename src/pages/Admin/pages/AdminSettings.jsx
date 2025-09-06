import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Building2,
  Bell,
  Shield,
  Save,
  Upload,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";
import { useAdminContext } from "@/context/AdminContext";

export function AdminSettings() {
  const { admin } = useAdminContext();
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@bajranglatkan.com",
    phone: "+91 98765 43210",
    address: "Sector 15, Chandigarh, Punjab",
    bio: "Managing Bajrang Latkan operations since 2020",
  });

  const [businessData, setBusinessData] = useState({
    businessName: "Bajrang Latkan",
    tagline: "Premium Handcrafted Latkans",
    address: "Industrial Area, Ludhiana, Punjab",
    phone: "+91 98765 43210",
    email: "info@bajranglatkan.com",
    website: "www.bajranglatkan.com",
    gst: "03ABCDE1234F1Z5",
    description:
      "Leading manufacturer of traditional and designer latkans for textile industry",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    taskReminders: true,
    paymentAlerts: true,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
  });

  const handleSaveProfile = () => {
    console.log("Saving profile:", profileData);
    // Handle profile save logic
  };

  const handleSaveBusiness = () => {
    console.log("Saving business:", businessData);
    // Handle business save logic
  };

  const handleSaveNotifications = () => {
    console.log("Saving notifications:", notifications);
    // Handle notifications save logic
  };

  const handleSaveSecurity = () => {
    console.log("Saving security:", security);
    // Handle security save logic
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B] mb-2">Settings</h1>
        <p className="text-[#475569]">
          Manage your account, business, and system preferences
        </p>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          {[
            {
              tab: "Profile",
              value: "profile",
              icon: User,
            },
            {
              tab: "Business",
              value: "business",
              icon: Building2,
            },
            {
              tab: "Notifications",
              value: "notifications",
              icon: Bell,
            },
            {
              tab: "Security",
              value: "security",
              icon: Shield,
            },
          ].map((tabs, index) => (
            <TabsTrigger
              key={index}
              value={tabs.value}
              className="flex items-center justify-center gap-2 text-sm font-medium md:text-base"
            >
              <tabs.icon className="hidden w-4 h-4 md:w-5 md:h-5 text-bajrang-brand md:block" />
              <span>{tabs.tab}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="text-[#1E293B] flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6">
                <Avatar className="w-16 h-16 sm:w-24 sm:h-24 ring-2 ring-bajrang-accent hover:ring-bajrang-warning">
                  <AvatarImage
                    src={admin?.photo || "/placeholder.svg"}
                    alt={admin?.adminname}
                  />
                  <AvatarFallback className="text-lg font-semibold md:text-3xl text-bajrang-brand bg-bajrang-accent/20">
                    {admin?.adminname
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button
                    variant="outline"
                    className="border-[#7B1E3A] text-[#7B1E3A] hover:bg-[#7B1E3A] hover:text-white bg-transparent"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-[#475569] mt-2">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="adminname">Full Name</Label>
                  <Input
                    id="adminname"
                    value={admin?.adminname}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={admin?.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] h-4 w-4" />
                    <Input
                      id="phone"
                      className="pl-10"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] h-4 w-4" />
                    <Input
                      id="address"
                      className="pl-10"
                      value={profileData.address}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  placeholder="Tell us about yourself..."
                />
              </div>
              <Button
                onClick={handleSaveProfile}
                className="bg-[#7B1E3A] hover:bg-[#7B1E3A]/90 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Settings */}
        <TabsContent value="business">
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="text-[#1E293B] flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={businessData.businessName}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        businessName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={businessData.tagline}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        tagline: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="businessEmail">Business Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] h-4 w-4" />
                    <Input
                      id="businessEmail"
                      type="email"
                      className="pl-10"
                      value={businessData.email}
                      onChange={(e) =>
                        setBusinessData({
                          ...businessData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="businessPhone">Business Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] h-4 w-4" />
                    <Input
                      id="businessPhone"
                      className="pl-10"
                      value={businessData.phone}
                      onChange={(e) =>
                        setBusinessData({
                          ...businessData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] h-4 w-4" />
                    <Input
                      id="website"
                      className="pl-10"
                      value={businessData.website}
                      onChange={(e) =>
                        setBusinessData({
                          ...businessData,
                          website: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="gst">GST Number</Label>
                  <Input
                    id="gst"
                    value={businessData.gst}
                    onChange={(e) =>
                      setBusinessData({ ...businessData, gst: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="businessAddress">Business Address</Label>
                <Textarea
                  id="businessAddress"
                  rows={2}
                  value={businessData.address}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={businessData.description}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <Button
                onClick={handleSaveBusiness}
                className="bg-[#7B1E3A] hover:bg-[#7B1E3A]/90 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Business Info
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="text-[#1E293B] flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-[#E2E8F0] rounded-lg">
                  <div>
                    <h4 className="font-medium text-[#1E293B]">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-[#475569]">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        emailNotifications: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-[#E2E8F0] rounded-lg">
                  <div>
                    <h4 className="font-medium text-[#1E293B]">
                      SMS Notifications
                    </h4>
                    <p className="text-sm text-[#475569]">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        smsNotifications: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-[#E2E8F0] rounded-lg">
                  <div>
                    <h4 className="font-medium text-[#1E293B]">
                      Push Notifications
                    </h4>
                    <p className="text-sm text-[#475569]">
                      Receive browser push notifications
                    </p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        pushNotifications: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-[#E2E8F0] rounded-lg">
                  <div>
                    <h4 className="font-medium text-[#1E293B]">
                      Weekly Reports
                    </h4>
                    <p className="text-sm text-[#475569]">
                      Receive weekly business reports
                    </p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        weeklyReports: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-[#E2E8F0] rounded-lg">
                  <div>
                    <h4 className="font-medium text-[#1E293B]">
                      Task Reminders
                    </h4>
                    <p className="text-sm text-[#475569]">
                      Get reminders for pending tasks
                    </p>
                  </div>
                  <Switch
                    checked={notifications.taskReminders}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        taskReminders: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-[#E2E8F0] rounded-lg">
                  <div>
                    <h4 className="font-medium text-[#1E293B]">
                      Payment Alerts
                    </h4>
                    <p className="text-sm text-[#475569]">
                      Alerts for salary and payment updates
                    </p>
                  </div>
                  <Switch
                    checked={notifications.paymentAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        paymentAlerts: checked,
                      })
                    }
                  />
                </div>
              </div>
              <Button
                onClick={handleSaveNotifications}
                className="bg-[#7B1E3A] hover:bg-[#7B1E3A]/90 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="text-[#1E293B] flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-[#E2E8F0] rounded-lg">
                  <div>
                    <h4 className="font-medium text-[#1E293B]">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-sm text-[#475569]">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={security.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      setSecurity({ ...security, twoFactorAuth: checked })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="sessionTimeout">
                      Session Timeout (minutes)
                    </Label>
                    <Select
                      value={security.sessionTimeout}
                      onValueChange={(value) =>
                        setSecurity({ ...security, sessionTimeout: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="passwordExpiry">
                      Password Expiry (days)
                    </Label>
                    <Select
                      value={security.passwordExpiry}
                      onValueChange={(value) =>
                        setSecurity({ ...security, passwordExpiry: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                    <Select
                      value={security.loginAttempts}
                      onValueChange={(value) =>
                        setSecurity({ ...security, loginAttempts: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                        <SelectItem value="10">10 attempts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                  <h4 className="font-medium text-[#1E293B] mb-2">
                    Change Password
                  </h4>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                    <Button
                      variant="outline"
                      className="border-[#7B1E3A] text-[#7B1E3A] hover:bg-[#7B1E3A] hover:text-white bg-transparent"
                    >
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleSaveSecurity}
                className="bg-[#7B1E3A] hover:bg-[#7B1E3A]/90 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

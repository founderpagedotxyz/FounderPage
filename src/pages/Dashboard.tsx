import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUser, signOut } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileText, LogOut, Plus, ExternalLink, Trash2, Pencil, Palette, Shield, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Database } from "@/integrations/supabase/types";
import { ImageUpload } from "@/components/ImageUpload";
import { RevenueChart } from "@/components/RevenueChart";
import { StripeConnect } from "@/components/StripeConnect";
import { usernameSchema, profileSchema, RESERVED_USERNAMES } from "@/lib/validation";
import { ThemeSelector, ThemeKey, FontKey } from "@/components/ThemeSelector";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Startup = Database["public"]["Tables"]["startups"]["Row"];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [startups, setStartups] = useState<Startup[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState<ThemeKey>("default");
  const [fontFamily, setFontFamily] = useState<FontKey>("dm-sans");
  
  const [editingStartupId, setEditingStartupId] = useState<string | null>(null);
  const [startupName, setStartupName] = useState("");
  const [startupDescription, setStartupDescription] = useState("");
  const [startupUrl, setStartupUrl] = useState("");
  const [startupCategory, setStartupCategory] = useState("");
  const [startupLogoUrl, setStartupLogoUrl] = useState("");

  useEffect(() => {
    loadUserData();
    
    const stripeConnected = searchParams.get("stripe_connected");
    if (stripeConnected === "true") {
      toast.success("Stripe connected! Click 'Sync' to fetch your revenue data.");
      window.history.replaceState({}, "", "/dashboard");
    }
  }, [searchParams]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      // Check if user is admin
      const { data: hasAdminRole } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      setIsAdmin(!!hasAdminRole);

      // Load profile - Usamos maybeSingle para evitar el crash si el perfil no existe
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      if (profileData) {
        setProfile(profileData);
        setName(profileData.name || "");
        setBio(profileData.bio || "");
        setLocation(profileData.location || "");
        setPhotoUrl(profileData.photo_url || "");
        setFaviconUrl(profileData.favicon_url || "");
        setUsername(profileData.username || "");

        const rawTheme = profileData.theme;
        const safeTheme = (rawTheme === "theme-light" || !rawTheme) ? "default" : rawTheme;
        setTheme(safeTheme as ThemeKey);

        const rawFont = profileData.font_family;
        const safeFont = (rawFont === "font-sans" || !rawFont) ? "dm-sans" : rawFont;
        setFontFamily(safeFont as FontKey);
      }

      // Load startups
      const { data: startupsData } = await supabase
        .from("startups")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (startupsData) {
        setStartups(startupsData);
        
        if (startupsData.length > 0) {
          const { data: revenueHistory } = await supabase
            .from("revenue_history")
            .select("*")
            .in("startup_id", startupsData.map(s => s.id))
            .order("month", { ascending: true });

          if (revenueHistory) {
            const formattedData = revenueHistory.map(item => ({
              month: new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
              revenue: item.revenue
            }));
            setRevenueData(formattedData);
          }
        }
      }
    } catch (error) {
      console.error("Dashboard load error:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!profile) return;

    const cleanUsername = username.toLowerCase().trim();
    if (cleanUsername !== profile.username) {
      if (RESERVED_USERNAMES.includes(cleanUsername)) {
        toast.error("This username is reserved");
        return;
      }
      try {
        usernameSchema.parse(cleanUsername);
      } catch (error: any) {
        toast.error(error.errors[0]?.message || "Invalid format");
        return;
      }

      const { data: existingUser } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", cleanUsername)
        .maybeSingle();

      if (existingUser && existingUser.id !== profile.id) {
        toast.error("Username already taken");
        return;
      }
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        username: cleanUsername,
        name: name.trim() || null,
        bio: bio.trim() || null,
        location: location.trim() || null,
        photo_url: photoUrl || null,
        favicon_url: faviconUrl || null,
        theme: theme,
        font_family: fontFamily,
      })
      .eq("id", profile.id);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated!");
      setEditMode(false);
      loadUserData();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleDeleteStartup = async (startupId: string, startupName: string) => {
    await supabase.from("revenue_history").delete().eq("startup_id", startupId);
    const { error } = await supabase.from("startups").delete().eq("id", startupId);
    if (error) toast.error("Failed to delete");
    else {
      toast.success(`${startupName} deleted`);
      loadUserData();
    }
  };

  const startEditingStartup = (startup: Startup) => {
    setEditingStartupId(startup.id);
    setStartupName(startup.name);
    setStartupDescription(startup.description || "");
    setStartupUrl(startup.url || "");
    setStartupCategory(startup.category || "");
    setStartupLogoUrl(startup.logo_url || "");
  };

  const cancelEditingStartup = () => setEditingStartupId(null);

  const handleUpdateStartup = async () => {
    if (!editingStartupId || !startupName.trim()) return;
    const { error } = await supabase
      .from("startups")
      .update({
        name: startupName.trim(),
        description: startupDescription.trim() || null,
        url: startupUrl.trim() || null,
        category: startupCategory.trim() || null,
        logo_url: startupLogoUrl || null,
      })
      .eq("id", editingStartupId);

    if (error) toast.error("Failed to update");
    else {
      toast.success("Startup updated!");
      cancelEditingStartup();
      loadUserData();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <p className="ml-2">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
              <img src="/logo.svg" className="w-36 h-auto" alt="Logo"/>
            </div>
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Button variant="outline" size="sm" onClick={() => navigate("/admin")} className="border-destructive text-destructive">
                  <Shield className="w-4 h-4 mr-2" /> Admin
                </Button>
              )}
              {profile && (
                <Button variant="outline" size="sm" onClick={() => navigate(`/${profile.username}`)}>
                  <ExternalLink className="w-4 h-4 mr-2" /> View Public Page
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Manage your public profile information</CardDescription>
              </div>
              {!editMode && <Button onClick={() => setEditMode(true)}>Edit Profile</Button>}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {editMode ? (
              <div className="space-y-4">
                <ImageUpload bucket="profiles" currentImageUrl={photoUrl} onUploadComplete={setPhotoUrl} label="Profile Photo" />
                <ImageUpload bucket="profiles" currentImageUrl={faviconUrl} onUploadComplete={setFaviconUrl} label="Page Favicon" />
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="lowercase" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-5 h-5 text-accent" />
                    <h3 className="font-semibold">Page Customization</h3>
                  </div>
                  <ThemeSelector selectedTheme={theme} selectedFont={fontFamily} onThemeChange={setTheme} onFontChange={setFontFamily} />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleUpdateProfile}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {photoUrl && <img src={photoUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover border" />}
                <div><p className="text-sm text-muted-foreground">Username</p><p className="font-medium">@{profile?.username}</p></div>
                <div><p className="text-sm text-muted-foreground">Name</p><p className="font-medium">{name || "Not set"}</p></div>
                <div><p className="text-sm text-muted-foreground">Bio</p><p className="font-medium">{bio || "Not set"}</p></div>
              </div>
            )}
          </CardContent>
        </Card>

        {revenueData.length > 0 && (
          <Card className="mb-8">
            <CardHeader><CardTitle>Total Revenue Growth</CardTitle></CardHeader>
            <CardContent><RevenueChart data={revenueData} /></CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div><CardTitle>Your Startups</CardTitle></div>
              <Button onClick={() => navigate("/new-startup")}><Plus className="w-4 h-4 mr-2" /> Add Startup</Button>
            </div>
          </CardHeader>
          <CardContent>
            {startups.length === 0 ? (
              <div className="text-center py-8"><p className="text-muted-foreground">No startups added yet</p></div>
            ) : (
              <div className="space-y-4">
                {startups.map((startup) => (
                  <Card key={startup.id}>
                    <CardContent className="pt-6">
                      {editingStartupId === startup.id ? (
                        <div className="space-y-4">
                          <Input value={startupName} onChange={(e) => setStartupName(e.target.value)} placeholder="Startup name" />
                          <div className="flex gap-2">
                            <Button onClick={handleUpdateStartup}>Save Changes</Button>
                            <Button variant="outline" onClick={cancelEditingStartup}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            {startup.logo_url && <img src={startup.logo_url} className="w-16 h-16 rounded-lg object-cover border" alt="Logo"/>}
                            <div>
                              <h3 className="font-semibold text-lg">{startup.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-1">{startup.description}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => startEditingStartup(startup)}><Pencil className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteStartup(startup.id, startup.name)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
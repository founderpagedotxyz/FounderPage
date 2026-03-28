import { createClient } from "https://esm.sh/@supabase/supabase-js@2.86.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all public profiles with usernames
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("username, updated_at")
      .not("username", "is", null);

    if (error) throw error;

    const baseUrl = "https://indiepage.lovable.app"; // Update with your domain

    // Generate sitemap XML
    const urls = [
      // Static pages
      { loc: baseUrl, priority: "1.0", changefreq: "daily" },
      { loc: `${baseUrl}/auth`, priority: "0.5", changefreq: "monthly" },
      { loc: `${baseUrl}/leaderboards`, priority: "0.8", changefreq: "daily" },
    ];

    // Add dynamic user pages
    profiles?.forEach((profile) => {
      if (profile.username) {
        urls.push({
          loc: `${baseUrl}/${profile.username}`,
          priority: "0.9",
          changefreq: "weekly",
        });
      }
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new Response(sitemap, { headers: corsHeaders });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
});

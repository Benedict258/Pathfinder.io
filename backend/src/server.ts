import { app } from "./app.js";
import { env } from "./config/env.js";
import { seedRoadmaps } from "./data/seed.js";
import { supabaseAdmin } from "./config/supabase.js";

app.listen(env.PORT, async () => {
  console.log(`Pathfinder backend running on http://localhost:${env.PORT}`);
  if (supabaseAdmin) {
    try {
      await seedRoadmaps(supabaseAdmin);
      console.log("Roadmaps seeded successfully");
    } catch (err) {
      console.error("Failed to seed roadmaps:", err);
    }
  }
});

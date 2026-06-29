export function welcomeEmail(
  userName: string,
): { subject: string; html: string } {
  const subject = "Welcome to Pathfinder.io — Find Your Tech Path";
  const html = `
    <div style="max-width:600px;margin:0 auto;font-family:system-ui,sans-serif">
      <h1 style="color:#0f172a">Welcome to Pathfinder.io, ${userName}!</h1>
      <p style="color:#475569;font-size:16px;line-height:1.6">
        You've taken the first step toward finding your direction in tech. Pathfinder.io helps you discover which digital skill path fits you best — and gives you one focused resource per concept.
      </p>
      <p style="color:#475569;font-size:16px;line-height:1.6">
        Here's how to get started:
      </p>
      <ol style="color:#475569;font-size:16px;line-height:1.8">
        <li><strong>Find your path</strong> — Visit the Onboarding page and chat with our AI to get personalized recommendations</li>
        <li><strong>Explore roadmaps</strong> — Once you have a path, dive into a focused curriculum with curated resources</li>
        <li><strong>Track progress</strong> — Mark concepts complete and build your learning streak</li>
        <li><strong>Discover opportunities</strong> — Browse scholarships, internships, and events across Africa</li>
      </ol>
      <a href="${process.env.FRONTEND_URL || "http://localhost:5178"}/onboarding" style="display:inline-block;background:#0f172a;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin-top:16px">
        Start onboarding
      </a>
      <p style="color:#94a3b8;font-size:14px;margin-top:32px">
        Pathfinder.io — Connecting ambition to direction
      </p>
    </div>
  `;
  return { subject, html };
}

export function pathRecommendedEmail(
  userName: string,
  pathTitle: string,
): { subject: string; html: string } {
  const subject = `Your tech path: ${pathTitle}`;
  const html = `
    <div style="max-width:600px;margin:0 auto;font-family:system-ui,sans-serif">
      <h1 style="color:#0f172a">Your path is ready, ${userName}</h1>
      <p style="color:#475569;font-size:16px;line-height:1.6">
        Based on your profile, Pathfinder recommends: <strong>${pathTitle}</strong>
      </p>
      <p style="color:#475569;font-size:16px;line-height:1.6">
        This path was chosen because it matches your interests, background, and career goals. Each step gives you one clear explanation and one curated resource — no overwhelm, just focused progress.
      </p>
      <a href="${process.env.FRONTEND_URL || "http://localhost:5178"}/roadmaps" style="display:inline-block;background:#0f172a;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin-top:16px">
        View your roadmap
      </a>
      <p style="color:#94a3b8;font-size:14px;margin-top:32px">
        Pathfinder.io — One concept, one resource, one step at a time.
      </p>
    </div>
  `;
  return { subject, html };
}

export function streakMilestoneEmail(
  userName: string,
  streak: number,
  totalCompleted: number,
): { subject: string; html: string } {
  const subject = `🔥 ${streak}-day streak on Pathfinder!`;
  const html = `
    <div style="max-width:600px;margin:0 auto;font-family:system-ui,sans-serif">
      <h1 style="color:#0f172a">${streak}-day streak, ${userName}!</h1>
      <p style="color:#475569;font-size:16px;line-height:1.6">
        You've been learning consistently for ${streak} days in a row and completed ${totalCompleted} concepts. That's real progress.
      </p>
      <p style="color:#475569;font-size:16px;line-height:1.6">
        Consistency compounds. Every day you show up, you're building skills that open doors in tech. Keep the momentum going.
      </p>
      <a href="${process.env.FRONTEND_URL || "http://localhost:5178"}/roadmaps" style="display:inline-block;background:#0f172a;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin-top:16px">
        Continue learning
      </a>
      <p style="color:#94a3b8;font-size:14px;margin-top:32px">
        Pathfinder.io — Progress over perfection.
      </p>
    </div>
  `;
  return { subject, html };
}

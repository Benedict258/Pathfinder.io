import { sendEmail } from "./email.service.js";
import {
  welcomeEmail,
  pathRecommendedEmail,
  streakMilestoneEmail,
} from "./templates.js";

export async function triggerWelcomeEmail(
  userId: string,
  email: string,
  fullName?: string,
) {
  try {
    const name = fullName || email.split("@")[0];
    const { subject, html } = welcomeEmail(name);
    await sendEmail({ to: email, subject, html, template: "welcome" });
  } catch (err) {
    console.warn("[email-trigger] Welcome email failed:", err);
  }
}

export async function triggerPathRecommendedEmail(
  userId: string,
  email: string,
  fullName: string | undefined,
  pathTitle: string,
) {
  try {
    const name = fullName || email.split("@")[0];
    const { subject, html } = pathRecommendedEmail(name, pathTitle);
    await sendEmail({
      to: email,
      subject,
      html,
      template: "path_recommended",
    });
  } catch (err) {
    console.warn("[email-trigger] Path email failed:", err);
  }
}

export async function triggerStreakEmail(
  userId: string,
  email: string,
  fullName: string | undefined,
  streak: number,
  totalCompleted: number,
) {
  try {
    const name = fullName || email.split("@")[0];
    const { subject, html } = streakMilestoneEmail(name, streak, totalCompleted);
    await sendEmail({
      to: email,
      subject,
      html,
      template: "streak_milestone",
    });
  } catch (err) {
    console.warn("[email-trigger] Streak email failed:", err);
  }
}

export type Opportunity = {
  id: string;
  title: string;
  description: string;
  type: "scholarship" | "internship" | "event" | "job";
  url: string;
  deadline?: string;
  location?: string;
};

export const opportunities: Opportunity[] = [
  {
    id: "andela-fellowship",
    title: "Andela Technical Leadership Program",
    description: "A 6-month career accelerator for experienced software engineers across Africa. Includes mentorship, real-world projects, and job placement support.",
    type: "scholarship",
    url: "https://andela.com/",
    location: "Remote / Africa"
  },
  {
    id: "alx-software-engineering",
    title: "ALX Software Engineering Programme",
    description: "A 12-month fully-funded programme by ALX Africa that prepares you for a global career in software engineering. No prior experience required.",
    type: "scholarship",
    url: "https://www.alxafrica.com/",
    deadline: "Rolling",
    location: "Remote / Africa"
  },
  {
    id: "hng-internship",
    title: "HNG Internship",
    description: "A fast-paced virtual internship for designers and developers. Work on real-world projects in teams, build your portfolio, and connect with hiring partners.",
    type: "internship",
    url: "https://hng.tech/",
    deadline: "Quarterly",
    location: "Remote"
  },
  {
    id: "google-africa-developer-scholarship",
    title: "Google Africa Developer Scholarship",
    description: "Grow your skills in Android, Web, or Cloud development with Google-certified courses and mentorship. Open to developers across Africa.",
    type: "scholarship",
    url: "https://developers.google.com/",
    deadline: "Annual",
    location: "Africa"
  },
  {
    id: "oscafest",
    title: "Open Source Community Africa Festival",
    description: "The largest open-source gathering in Africa. Network with developers, attend workshops, and contribute to open-source projects.",
    type: "event",
    url: "https://oscafest.org/",
    deadline: "Annual (usually Q4)",
    location: "Lagos, Nigeria"
  },
  {
    id: "flutterwave-internship",
    title: "Flutterwave Graduate Internship",
    description: "Paid internship programme at one of Africa's largest fintech companies. Rotations across engineering, product, and business teams.",
    type: "internship",
    url: "https://flutterwave.com/",
    deadline: "Rolling",
    location: "Lagos, Nigeria / Remote"
  },
  {
    id: "microsoft-learn-student-ambassador",
    title: "Microsoft Learn Student Ambassador",
    description: "Global programme for students to build leadership and technical skills while hosting events on campus. Access to Microsoft resources and mentorship.",
    type: "scholarship",
    url: "https://studentambassadors.microsoft.com/",
    deadline: "Quarterly",
    location: "Global"
  },
  {
    id: "devfest-lagos",
    title: "DevFest Lagos",
    description: "Annual tech conference by Google Developer Groups Lagos featuring talks, workshops, and networking for developers across all levels.",
    type: "event",
    url: "https://gdg.community.dev/",
    deadline: "Annual (usually Q4)",
    location: "Lagos, Nigeria"
  },
  {
    id: "interswitch-internship",
    title: "Interswitch Engineering Internship",
    description: "Work with Africa's leading integrated payments company. Interns contribute to production systems and receive mentorship from senior engineers.",
    type: "internship",
    url: "https://www.interswitchgroup.com/",
    deadline: "Annual",
    location: "Lagos, Nigeria"
  },
  {
    id: "outreachy",
    title: "Outreachy Internships",
    description: "Paid, remote internships with open-source projects. Outreachy specifically supports applicants from groups underrepresented in tech, including Africans.",
    type: "internship",
    url: "https://www.outreachy.org/",
    deadline: "Biannual (May/October)",
    location: "Remote"
  }
];

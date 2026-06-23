import type { SupabaseClient } from "@supabase/supabase-js";

type SeedNode = {
  id: string;
  title: string;
  explanation: string;
  resourceTitle: string;
  resourceUrl: string;
  goDeeper?: { title: string; url: string }[];
};

type SeedRoadmap = {
  slug: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate";
  nodes: SeedNode[];
};

const seedRoadmapsData: SeedRoadmap[] = [
  {
    slug: "frontend-development",
    title: "Frontend Development",
    description: "Build user interfaces for websites and web applications.",
    level: "beginner",
    nodes: [
      {
        id: "html-css",
        title: "HTML and CSS Foundations",
        explanation:
          "HTML gives a page structure, while CSS controls how it looks. Every frontend developer needs these basics before moving into JavaScript frameworks. Treat this as learning how browsers understand and display content.",
        resourceTitle: "MDN: Getting started with HTML",
        resourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML",
        goDeeper: [
          { title: "CSS Tricks", url: "https://css-tricks.com/" },
          { title: "Flexbox Froggy", url: "https://flexboxfroggy.com/" }
        ]
      },
      {
        id: "javascript-basics",
        title: "JavaScript Basics",
        explanation:
          "JavaScript makes web pages interactive. You will use it to respond to user actions, update the page, and work with data. Learn the fundamentals before relying heavily on React.",
        resourceTitle: "JavaScript.info: The JavaScript language",
        resourceUrl: "https://javascript.info/js",
        goDeeper: [
          { title: "Eloquent JavaScript", url: "https://eloquentjavascript.net/" },
          { title: "JS30 by Wes Bos", url: "https://javascript30.com/" }
        ]
      },
      {
        id: "react-basics",
        title: "React Basics",
        explanation:
          "React helps you build interfaces as reusable components. It is useful when a page has many changing parts. Focus first on components, props, state, and rendering lists.",
        resourceTitle: "React Docs: Learn React",
        resourceUrl: "https://react.dev/learn",
        goDeeper: [
          { title: "React TypeScript Cheatsheet", url: "https://react-typescript-cheatsheet.netlify.app/" },
          { title: "Next.js Learn", url: "https://nextjs.org/learn" }
        ]
      }
    ]
  },
  {
    slug: "data-analysis",
    title: "Data Analysis",
    description: "Use data to answer questions and support decisions.",
    level: "beginner",
    nodes: [
      {
        id: "spreadsheet-basics",
        title: "Spreadsheet Basics",
        explanation:
          "Spreadsheets are the fastest way to begin working with structured data. You can clean, organize, and summarize data without writing code. This skill is useful in business, research, and operations roles.",
        resourceTitle: "Google Sheets training",
        resourceUrl: "https://support.google.com/a/users/answer/9282959",
        goDeeper: [
          { title: "ExcelJet Shortcuts", url: "https://exceljet.net/" },
          { title: "Google Data Analytics Certificate", url: "https://www.coursera.org/professional-certificates/google-data-analytics" }
        ]
      },
      {
        id: "sql-basics",
        title: "SQL Basics",
        explanation:
          "SQL lets you ask questions of databases. Most real products store important data in relational databases, so SQL helps you retrieve and analyze that information. Start with selecting, filtering, grouping, and joining data.",
        resourceTitle: "SQLBolt",
        resourceUrl: "https://sqlbolt.com/",
        goDeeper: [
          { title: "Mode Analytics SQL Tutorial", url: "https://mode.com/sql-tutorial/" },
          { title: "PostgreSQL Exercises", url: "https://pgexercises.com/" }
        ]
      },
      {
        id: "visualization",
        title: "Data Visualization",
        explanation:
          "Data visualization turns numbers into charts people can understand quickly. A good chart clarifies a decision instead of decorating a report. Learn when to use bars, lines, tables, and simple dashboards.",
        resourceTitle: "Tableau: Data visualization beginner guide",
        resourceUrl: "https://www.tableau.com/learn/articles/data-visualization",
        goDeeper: [
          { title: "Datawrapper Academy", url: "https://academy.datawrapper.de/" },
          { title: "Flourish for data stories", url: "https://flourish.studio/" }
        ]
      }
    ]
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description: "Design useful, usable, and clear digital products.",
    level: "beginner",
    nodes: [
      {
        id: "user-research",
        title: "User Research",
        explanation:
          "User research helps you understand what people need before designing screens. It prevents you from guessing your way through product decisions. Begin with interviews, observation, and simple usability tests.",
        resourceTitle: "Nielsen Norman Group: UX research cheat sheet",
        resourceUrl: "https://www.nngroup.com/articles/ux-research-cheat-sheet/",
        goDeeper: [
          { title: "User Interviews Guide", url: "https://www.userinterviews.com/ux-research-field-guide" },
          { title: "Maze Usability Testing", url: "https://maze.co/guides/usability-testing/" }
        ]
      },
      {
        id: "wireframing",
        title: "Wireframing",
        explanation:
          "Wireframes are low-detail layouts that help you plan a screen before choosing colors or visuals. They keep attention on structure and user flow. This makes design feedback faster and less emotional.",
        resourceTitle: "Figma: What is wireframing?",
        resourceUrl: "https://www.figma.com/resource-library/what-is-wireframing/",
        goDeeper: [
          { title: "Balsamiq Wireframing", url: "https://balsamiq.com/learn/" },
          { title: "Figma prototyping guide", url: "https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma" }
        ]
      },
      {
        id: "visual-design",
        title: "Visual Design Basics",
        explanation:
          "Visual design helps users scan, understand, and trust an interface. Spacing, typography, color, and hierarchy all affect usability. Learn these basics before trying to create complex design systems.",
        resourceTitle: "Laws of UX",
        resourceUrl: "https://lawsofux.com/",
        goDeeper: [
          { title: "Refactoring UI", url: "https://www.refactoringui.com/" },
          { title: "Material Design Guidelines", url: "https://m3.material.io/" }
        ]
      }
    ]
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    description: "Protect systems, networks, and data from digital attacks.",
    level: "beginner",
    nodes: [
      {
        id: "security-fundamentals",
        title: "Security Fundamentals",
        explanation:
          "Understanding the CIA triad (Confidentiality, Integrity, Availability) is the foundation of all security work. Start here to grasp how security professionals think about protecting systems.",
        resourceTitle: "OWASP Top 10",
        resourceUrl: "https://owasp.org/www-project-top-ten/",
        goDeeper: [
          { title: "SANS Cyber Aces", url: "https://www.sans.org/cyberaces/" },
          { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" }
        ]
      },
      {
        id: "network-security-basics",
        title: "Network Security Basics",
        explanation:
          "Most attacks travel over networks. Learn how firewalls, VPNs, and network segmentation protect data in transit and at rest.",
        resourceTitle: "Cisco Networking Basics",
        resourceUrl: "https://www.netacad.com/courses/networking-basics",
        goDeeper: [
          { title: "Wireshark Tutorial", url: "https://www.wireshark.org/docs/" },
          { title: "Professor Messer Network+", url: "https://www.professormesser.com/network-plus/n10-008/" }
        ]
      },
      {
        id: "ethical-hacking-intro",
        title: "Ethical Hacking Intro",
        explanation:
          "Ethical hackers think like attackers to find weaknesses before bad actors do. Learn reconnaissance, scanning, and basic exploitation techniques in a legal sandbox.",
        resourceTitle: "TryHackMe Pre Security",
        resourceUrl: "https://tryhackme.com/path/outline/presecurity",
        goDeeper: [
          { title: "Hack The Box", url: "https://www.hackthebox.com/" },
          { title: "OWASP Juice Shop", url: "https://owasp.org/www-project-juice-shop/" }
        ]
      }
    ]
  },
  {
    slug: "ai-machine-learning",
    title: "AI / Machine Learning",
    description: "Learn artificial intelligence, machine learning, and data science fundamentals.",
    level: "beginner",
    nodes: [
      {
        id: "ai-fundamentals",
        title: "AI Fundamentals",
        explanation:
          "AI is not magic — it's pattern recognition at scale. Learn what machine learning actually does, the difference between supervised and unsupervised learning, and where AI is genuinely useful versus hype.",
        resourceTitle: "Google AI for Everyone",
        resourceUrl: "https://ai.google/education/",
        goDeeper: [
          { title: "Fast.ai Practical Deep Learning", url: "https://course.fast.ai/" },
          { title: "3Blue1Brown Neural Networks", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi" }
        ]
      },
      {
        id: "python-data-science",
        title: "Python for Data Science",
        explanation:
          "Python is the lingua franca of AI. Learn NumPy for numerical computing, Pandas for data manipulation, and Matplotlib for visualization before touching any ML frameworks.",
        resourceTitle: "Kaggle Python Course",
        resourceUrl: "https://www.kaggle.com/learn/python",
        goDeeper: [
          { title: "Python Data Science Handbook", url: "https://jakevdp.github.io/PythonDataScienceHandbook/" },
          { title: "Real Python Tutorials", url: "https://realpython.com/" }
        ]
      },
      {
        id: "building-first-model",
        title: "Building Your First Model",
        explanation:
          "Move from theory to practice by training a simple model. Use scikit-learn to build a classifier, understand train/test splits, and learn why accuracy isn't everything when evaluating models.",
        resourceTitle: "Scikit-learn Getting Started",
        resourceUrl: "https://scikit-learn.org/stable/getting_started.html",
        goDeeper: [
          { title: "Kaggle Competitions", url: "https://www.kaggle.com/competitions" },
          { title: "Made With ML", url: "https://madewithml.com/" }
        ]
      }
    ]
  },
  {
    slug: "cloud-devops",
    title: "Cloud / DevOps",
    description: "Deploy, manage, and scale applications in the cloud.",
    level: "beginner",
    nodes: [
      {
        id: "linux-command-line",
        title: "Linux & Command Line",
        explanation:
          "The cloud runs on Linux. Before touching AWS or Docker, get comfortable with the terminal — navigating files, managing processes, writing shell scripts, and understanding permissions.",
        resourceTitle: "Linux Journey",
        resourceUrl: "https://linuxjourney.com/",
        goDeeper: [
          { title: "The Missing Semester of CS", url: "https://missing.csail.mit.edu/" },
          { title: "ExplainShell", url: "https://explainshell.com/" }
        ]
      },
      {
        id: "cloud-basics-aws",
        title: "Cloud Basics (AWS)",
        explanation:
          "AWS powers a massive portion of the internet. Learn the core services: EC2 (virtual machines), S3 (storage), and IAM (permissions). Understanding these three unlocks everything else.",
        resourceTitle: "AWS Cloud Practitioner Essentials",
        resourceUrl: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/",
        goDeeper: [
          { title: "AWS Free Tier hands-on", url: "https://aws.amazon.com/free/" },
          { title: "ACloudGuru", url: "https://acloudguru.com/" }
        ]
      },
      {
        id: "containers-ci-cd",
        title: "Containers & CI/CD",
        explanation:
          "Containers package your app with all its dependencies so it runs the same everywhere. CI/CD automates testing and deployment. Together they form the backbone of modern software delivery.",
        resourceTitle: "Docker Get Started",
        resourceUrl: "https://docs.docker.com/get-started/",
        goDeeper: [
          { title: "GitHub Actions CI/CD", url: "https://docs.github.com/en/actions" },
          { title: "Kubernetes Basics", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" }
        ]
      }
    ]
  },
  {
    slug: "product-management",
    title: "Product Management",
    description: "Guide product vision, strategy, and execution from idea to launch.",
    level: "beginner",
    nodes: [
      {
        id: "product-thinking",
        title: "Product Thinking",
        explanation:
          "Great products solve real problems. Product thinking means starting with user needs, not features. Learn to identify problems worth solving before building anything.",
        resourceTitle: "SVPG: Product Vision",
        resourceUrl: "https://www.svpg.com/product-vision/",
        goDeeper: [
          { title: "Inspired by Marty Cagan", url: "https://www.svpg.com/books/" },
          { title: "Product School blog", url: "https://productschool.com/blog" }
        ]
      },
      {
        id: "user-stories",
        title: "User Stories and Requirements",
        explanation:
          "User stories translate user needs into development tasks. Writing clear, testable stories keeps engineers building the right thing and prevents scope creep.",
        resourceTitle: "Atlassian: User Stories",
        resourceUrl: "https://www.atlassian.com/agile/project-management/user-stories",
        goDeeper: [
          { title: "Scrum Guide", url: "https://scrumguides.org/" },
          { title: "Jira project management", url: "https://www.atlassian.com/software/jira/guides" }
        ]
      },
      {
        id: "prioritization",
        title: "Roadmapping and Prioritization",
        explanation:
          "A product roadmap communicates your strategy and timeline. Learn frameworks like RICE and MoSCoW to prioritize features based on impact, not opinions.",
        resourceTitle: "ProductPlan: Product Roadmaps",
        resourceUrl: "https://www.productplan.com/learn/what-is-a-product-roadmap/",
        goDeeper: [
          { title: "Lenny's Newsletter", url: "https://www.lennysnewsletter.com/" },
          { title: "Intercom on Product Management", url: "https://www.intercom.com/resources/books/product-management" }
        ]
      }
    ]
  }
];

export async function seedRoadmaps(supabase: SupabaseClient) {
  for (const roadmap of seedRoadmapsData) {
    console.log(`Seeding roadmap: ${roadmap.slug}`);

    const { data: existing, error: upsertError } = await supabase
      .from("roadmaps")
      .upsert(
        {
          slug: roadmap.slug,
          title: roadmap.title,
          description: roadmap.description,
          level: roadmap.level
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();

    if (upsertError || !existing) {
      console.error(`Failed to upsert roadmap ${roadmap.slug}:`, upsertError);
      continue;
    }

    const roadmapId = existing.id;

    const { error: deleteError } = await supabase
      .from("roadmap_nodes")
      .delete()
      .eq("roadmap_id", roadmapId);

    if (deleteError) {
      console.error(`Failed to delete nodes for ${roadmap.slug}:`, deleteError);
    }

    const nodes = roadmap.nodes.map((node, index) => ({
      roadmap_id: roadmapId,
      title: node.title,
      explanation: node.explanation,
      resource_title: node.resourceTitle,
      resource_url: node.resourceUrl,
      go_deeper: node.goDeeper || [],
      position: index + 1
    }));

    const { error: insertError } = await supabase
      .from("roadmap_nodes")
      .insert(nodes);

    if (insertError) {
      console.error(`Failed to insert nodes for ${roadmap.slug}:`, insertError);
    } else {
      console.log(`  Seeded ${nodes.length} nodes`);
    }
  }
}

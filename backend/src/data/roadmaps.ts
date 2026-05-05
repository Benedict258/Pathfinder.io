export type RoadmapNode = {
  id: string;
  title: string;
  explanation: string;
  resourceTitle: string;
  resourceUrl: string;
  goDeeper?: string[];
};

export type Roadmap = {
  slug: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate";
  nodes: RoadmapNode[];
};

export const roadmaps: Roadmap[] = [
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
        resourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML"
      },
      {
        id: "javascript-basics",
        title: "JavaScript Basics",
        explanation:
          "JavaScript makes web pages interactive. You will use it to respond to user actions, update the page, and work with data. Learn the fundamentals before relying heavily on React.",
        resourceTitle: "JavaScript.info: The JavaScript language",
        resourceUrl: "https://javascript.info/js"
      },
      {
        id: "react-basics",
        title: "React Basics",
        explanation:
          "React helps you build interfaces as reusable components. It is useful when a page has many changing parts. Focus first on components, props, state, and rendering lists.",
        resourceTitle: "React Docs: Learn React",
        resourceUrl: "https://react.dev/learn"
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
        resourceUrl: "https://support.google.com/a/users/answer/9282959"
      },
      {
        id: "sql-basics",
        title: "SQL Basics",
        explanation:
          "SQL lets you ask questions of databases. Most real products store important data in relational databases, so SQL helps you retrieve and analyze that information. Start with selecting, filtering, grouping, and joining data.",
        resourceTitle: "SQLBolt",
        resourceUrl: "https://sqlbolt.com/"
      },
      {
        id: "visualization",
        title: "Data Visualization",
        explanation:
          "Data visualization turns numbers into charts people can understand quickly. A good chart clarifies a decision instead of decorating a report. Learn when to use bars, lines, tables, and simple dashboards.",
        resourceTitle: "Tableau: Data visualization beginner guide",
        resourceUrl: "https://www.tableau.com/learn/articles/data-visualization"
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
        resourceUrl: "https://www.nngroup.com/articles/ux-research-cheat-sheet/"
      },
      {
        id: "wireframing",
        title: "Wireframing",
        explanation:
          "Wireframes are low-detail layouts that help you plan a screen before choosing colors or visuals. They keep attention on structure and user flow. This makes design feedback faster and less emotional.",
        resourceTitle: "Figma: What is wireframing?",
        resourceUrl: "https://www.figma.com/resource-library/what-is-wireframing/"
      },
      {
        id: "visual-design",
        title: "Visual Design Basics",
        explanation:
          "Visual design helps users scan, understand, and trust an interface. Spacing, typography, color, and hierarchy all affect usability. Learn these basics before trying to create complex design systems.",
        resourceTitle: "Laws of UX",
        resourceUrl: "https://lawsofux.com/"
      }
    ]
  }
];

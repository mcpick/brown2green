export interface Phase {
  num: string;
  title: string;
  desc: string;
  details: string[];
  prompt: string;
}

export interface Skill {
  name: string;
  role: string;
  desc: string;
  usage: string;
}

export interface SimpleStep {
  num: string;
  title: string;
  cmd: string;
}

export interface ComplexStep {
  num: string;
  title: string;
  skill: string;
}

export const phases: Phase[] = [
  {
    num: "01",
    title: "Assess",
    desc: "Map the architecture, identify pain points, and establish a baseline for AI readiness.",
    details: [
      "Run module-overview scans across your codebase",
      "Identify tightly-coupled components that AI struggles with",
      "Document implicit knowledge that only lives in developers' heads",
      "Establish conventions files (CLAUDE.md, AGENTS.md)",
    ],
    prompt: "@codebase-qa How does [module] work? What are its dependencies and side effects?",
  },
  {
    num: "02",
    title: "Document",
    desc: "Create the documentation layer that makes your codebase navigable by AI.",
    details: [
      "Create docs/: requirements, plans, features, manual",
      "Document existing features with architecture docs",
      "Write a project manual showing how everything connects",
      "Define coding conventions, naming patterns, file structure",
    ],
    prompt: "@documenter CCG-XXX → Generates feature doc with Mermaid diagrams",
  },
  {
    num: "03",
    title: "Guard",
    desc: "Set up hooks and guardrails that prevent AI from breaking things.",
    details: [
      "Configure pre-commit hooks for lint, type-check, build",
      "Define file access boundaries — what AI can and can't touch",
      "Set up preflight checks before any commit",
      "Create impact analysis to predict blast radius",
    ],
    prompt: "@impact-analyser [file] → Shows what will break before you touch it",
  },
  {
    num: "04",
    title: "Specialise",
    desc: "Install focused skills that give your AI the right context for each task.",
    details: [
      "Install task-specific skills: planner, implementer, reviewer",
      "Each skill scopes context to just what's needed",
      "Define slash commands for common operations",
      "Build project-specific skills tailored to your stack",
    ],
    prompt: "@feature-planner [feature] → File-by-file implementation plan",
  },
  {
    num: "05",
    title: "Workflow",
    desc: "Define repeatable workflows. Every change follows the same quality pipeline.",
    details: [
      "Simple: understand → impact → change → preflight → review → commit",
      "Complex: plan → implement → QA → review → commit → document",
      "Every workflow ends with documentation",
      "Some steps take many iterations — that's expected",
    ],
    prompt: "@committer → Proposes logical commit breakdown, executes on 'go'",
  },
  {
    num: "06",
    title: "Iterate",
    desc: "Each cycle improves AI readiness. Normalised bad code gets identified and refactored.",
    details: [
      "Run regular codebase health checks with your skills",
      "Identify 'normalised bad code' that AI struggles with",
      "Refactor incrementally — each PR makes the next easier",
      "Measure: fewer errors, faster delivery, better code quality",
    ],
    prompt: "@reviewer → Reviews diff, reports issues by severity, gives merge verdict",
  },
];

export const skills: Skill[] = [
  { name: "codebase-qa", role: "Knowledge", desc: "Answers questions about how any part of the codebase works.", usage: "@codebase-qa How does the auth flow work?" },
  { name: "impact-analyser", role: "Safety", desc: "Predicts what will break before you change anything.", usage: "@impact-analyser src/auth/login.ts" },
  { name: "feature-planner", role: "Planning", desc: "Studies existing patterns. Produces file-by-file plans.", usage: "@feature-planner Add SSO via SAML" },
  { name: "feature-implementer", role: "Building", desc: "Writes all files following conventions. Verifies build.", usage: "@feature-implementer docs/plans/CCG-123.md" },
  { name: "preflight", role: "QA", desc: "ESLint + TypeScript + production build. Your quality gate.", usage: "@preflight" },
  { name: "reviewer", role: "Review", desc: "Reviews diff. Reports blocker / should-fix / nit.", usage: "@reviewer" },
  { name: "committer", role: "Git", desc: "Proposes logical commit breakdown. Say 'go' to execute.", usage: "@committer" },
  { name: "documenter", role: "Docs", desc: "Generates architecture docs with Mermaid diagrams.", usage: "@documenter CCG-123" },
];

export const simpleSteps: SimpleStep[] = [
  { num: "1", title: "Understand", cmd: "/module-overview ModuleName" },
  { num: "2", title: "Impact check", cmd: "@impact-analyser [target]" },
  { num: "3", title: "Change", cmd: "(edit directly)" },
  { num: "4", title: "Preflight", cmd: "@preflight" },
  { num: "5", title: "Review", cmd: "@reviewer" },
  { num: "6", title: "Commit", cmd: "@committer → 'go'" },
];

export const complexSteps: ComplexStep[] = [
  { num: "1", title: "Plan", skill: "feature-planner" },
  { num: "2", title: "Implement", skill: "feature-implementer" },
  { num: "3", title: "QA", skill: "preflight" },
  { num: "4", title: "Review", skill: "reviewer" },
  { num: "5", title: "Commit", skill: "committer" },
  { num: "6", title: "Document", skill: "documenter" },
];

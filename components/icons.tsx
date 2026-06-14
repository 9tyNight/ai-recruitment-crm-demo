import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BriefcaseBusiness,
  ChartNoAxesColumnIncreasing,
  CheckSquare,
  ChevronLeft,
  CircleHelp,
  Folder,
  Inbox,
  Plus,
  Search,
  Settings,
  Tags,
  Users,
  Video,
} from "lucide-react";

export const navItems: Array<{ label: string; icon: LucideIcon; badge?: string }> = [
  { label: "Pipeline", icon: ChartNoAxesColumnIncreasing },
  { label: "Search", icon: Search },
  { label: "Inbox", icon: Inbox, badge: "6" },
  { label: "Projects", icon: Folder },
  { label: "Assessments", icon: CheckSquare },
  { label: "Interviews", icon: Video },
  { label: "Reports", icon: BriefcaseBusiness },
  { label: "Talent pool", icon: Users },
  { label: "Tags", icon: Tags },
];

export const utilityItems = [
  { label: "Settings", icon: Settings },
  { label: "Collapse", icon: ChevronLeft },
];

export const topIcons = { Bell, CircleHelp, Plus };

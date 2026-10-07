import {
  ClipboardCheck, GraduationCap, Factory, Wallet, TrendingUp, Award,
  Cpu, Code2, Cog, Briefcase, ShieldCheck, Users, Search, Handshake,
  FileCheck2, UserCheck, ClipboardList, BadgeCheck,
} from 'lucide-react'

// Everything here is drawn directly from the Swan Industry Internship
// Programme deck (Swan_Company_Profile_and_Internship_Programme.pptx),
// slides 8–14. Keep copy and facts in sync with that source.

export const DIFFERENTIATORS = [
  {
    icon: GraduationCap,
    title: 'VTU-registered internship',
    desc: 'A structured internship that follows the VTU internship framework and documentation.',
  },
  {
    icon: Factory,
    title: 'Direct industry exposure',
    desc: 'Students work inside real companies across various domains and industries.',
  },
  {
    icon: Wallet,
    title: 'Stipend from Swan',
    desc: 'Interns receive a stipend paid by Swan, so the host company carries no stipend cost.',
  },
  {
    icon: TrendingUp,
    title: 'Permanent job + salary hike',
    desc: 'Interns whose work is good move to permanent employment with a salary hike.',
    footnote: 'Employment and salary hike depend on performance, evaluation and available openings.',
  },
]

export const JOURNEY = [
  { title: 'Student registers', icon: ClipboardList },
  { title: 'Skill check & training', icon: GraduationCap },
  { title: 'Matched to an industry domain', icon: Search },
  { title: 'Paid practical internship', icon: Briefcase },
  { title: 'Evaluation by the company', icon: ClipboardCheck },
  { title: 'Permanent job with salary hike', icon: Award },
]

export const DOMAINS = [
  {
    icon: Cpu,
    title: 'Electronics & Electrical',
    desc: 'Embedded systems, IoT, PCB, testing, PLC and industrial automation, maintenance.',
  },
  {
    icon: Code2,
    title: 'Computer Science & AI',
    desc: 'Software and web development, databases, cloud, AI / ML, data analytics.',
  },
  {
    icon: Cog,
    title: 'Mechanical & Civil',
    desc: 'CAD, manufacturing, production, quality, surveying and site operations.',
  },
  {
    icon: Briefcase,
    title: 'Business & Digital',
    desc: 'Digital marketing, content, analytics, operations and client support.',
  },
]

export const COMPANY_BENEFITS = [
  { icon: Wallet, title: 'No stipend cost', desc: 'Swan pays the intern stipend. You provide the work and guidance.' },
  { icon: UserCheck, title: 'Try before you hire', desc: 'Work with an intern for the full period, then hire the best.' },
  { icon: ShieldCheck, title: 'Pre-screened interns', desc: 'Swan assesses and prepares students before they reach you.' },
  { icon: Briefcase, title: 'Real work gets done', desc: 'Interns support live tasks and projects in your teams.' },
  { icon: FileCheck2, title: 'Less hiring effort', desc: 'Swan coordinates documents, attendance and evaluation.' },
  { icon: Users, title: 'Long-term talent pipeline', desc: 'A steady link to colleges and fresh talent for future needs.' },
]

export const RESPONSIBILITIES = {
  swan: {
    label: 'Swan handles',
    items: [
      'Student registration and screening',
      'Pre-internship preparation',
      'Stipend payment',
      'Coordination and monitoring',
      'Documentation and certificates',
    ],
  },
  partner: {
    label: 'Your company provides',
    items: [
      'A real workplace and task allocation',
      'A mentor or supervisor',
      'Attendance confirmation',
      'Evaluation and feedback',
      'Hiring decision for strong performers',
    ],
  },
}

export const CREDENTIALS = [
  {
    icon: BadgeCheck,
    title: 'MSME / Udyam certified',
    desc: 'Registered under UDYAM-KR-02-0137825 — a verified, government-recognised business.',
    status: 'Verified',
  },
  {
    icon: GraduationCap,
    title: 'VTU registration',
    desc: 'Formal registration under VTU is underway, so VTU students can claim this internship toward their university requirement.',
    status: 'In progress',
  },
  {
    icon: Award,
    title: 'Certificate of internship',
    desc: 'Every intern who completes the programme receives a signed completion certificate for their academic and professional record.',
    status: 'On completion',
  },
]

export const PILOT_STEPS = [
  { n: '01', title: 'Meet', desc: 'Understand your needs', icon: Handshake },
  { n: '02', title: 'Pilot', desc: 'One intern or one small batch', icon: Users },
  { n: '03', title: 'Review', desc: 'Your feedback, then scale', icon: ClipboardCheck },
]

export const AUDIENCES = {
  student: {
    label: 'I’m a student',
    eyebrowSuffix: 'for students',
    headline: ['Industry work that counts toward your degree', { text: 'and your career.', className: 'text-gradient' }],
    sub: 'Register once, train with us, then step into a real company in your field — paid, VTU-aligned, and built to end in a job offer if your work earns it.',
    stat: { value: '6', suffix: '', label: 'steps from registration to a permanent role' },
    cta: 'Register your interest',
    brief: 'Internship enquiry — Student\nI would like to register for the Swan Industry Internship Programme.',
  },
  company: {
    label: 'I’m a company',
    eyebrowSuffix: 'for companies',
    headline: ['A pre-screened talent pipeline,', { text: 'zero stipend cost.', className: 'text-gradient' }],
    sub: 'Host a Swan-prepared intern on real work in your team. We cover the stipend, the paperwork and the coordination — you decide who you keep.',
    stat: { value: '0', suffix: '', label: 'stipend cost to your company, ever' },
    cta: 'Partner with Swan',
    brief: 'Internship enquiry — Hiring partner\nWe would like to host Swan Industry Internship Programme interns at our company.',
  },
}

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const, focusable: false };

export function CloudIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6.3 8.4 4.8 4.8 0 0 0 7 18Z"/><path d="M12 11v8m-3-3 3 3 3-3"/></svg>;
}
export function ShieldIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M12 3 4.8 6v5.2c0 4.6 3 7.8 7.2 9.8 4.2-2 7.2-5.2 7.2-9.8V6L12 3Z"/><path d="m9 12 2 2 4-4"/></svg>;
}
export function PeopleIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="9" cy="8" r="3"/><path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19M16 5.5a3 3 0 0 1 0 5.8M16.5 14a4 4 0 0 1 4 4v1"/></svg>;
}
export function FacilityIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 21V8l8-4 8 4v13M8 21v-4h8v4M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></svg>;
}
export function CheckIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16.5 9"/></svg>;
}
export function ArrowIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M5 12h14m-5-5 5 5-5 5"/></svg>;
}
export function TargetIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".7" fill="currentColor" stroke="none"/></svg>;
}
export function PartnerIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="m8.5 14.5-3-3a2.1 2.1 0 0 1 3-3l2 2m5 3 3-3a2.1 2.1 0 0 0-3-3l-2 2"/><path d="m9.5 9.5 5 5a2.1 2.1 0 0 1-3 3l-5-5"/></svg>;
}
export function SupportIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><path d="M4 13a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2Zm16 0a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2ZM17 18c-1 2-3 3-5 3"/></svg>;
}
export function CleanIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M9 4h6l1 5H8l1-5Z"/><path d="M8 9c0 3-3 5-3 10h14c0-5-3-7-3-10M9 14h.01M13 12h.01M16 16h.01"/></svg>;
}
export function WindowIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M4 12h16M17.5 6.5l-2 2M9 15l-2 2"/></svg>;
}
export function VisionIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/></svg>;
}
export function CompassIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></svg>;
}

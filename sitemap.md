# Admin/Control panel sitemap (dchdesign-en.insided.com)

- Home — dashboard widgets, summary stat cards, tabbed content lists, empty states
- Users — Users Overview, Segments
- Content — Moderation (Overview, Pending, Reported, Spam, Trash Can), Content Types (Articles, Drafts, Ideas, Events, Product updates)
- Email — Email Campaigns, System Emails
- Analytics — New Dashboards, Dashboards (Content, Moderation, User, Q&A, Audience, Engagement, Self-service, Product Feedback, Search Analytics), Export (Post Fields Analysis, Export)
- Platform — Knowledge Base, Community, Ideation, Groups, Events, Product Updates, Custom Pages
- Gamification — Ranks, Badges, Point system
- Customization — Header, Footer, Sidebar, Phrases, Third-party Scripts
- Integrations — Apps, API, SSO (End Users, Control Users), Embeddable Widget (Setup, Customization, Content Configuration, Installation), Developer Studio (Sources, Connectors, Secrets and Variables)
- AI — AI Settings, Moderation AI Agent, AI Answers for Search, AI Translations, AI Answers Agent
- Settings — Platform (Event Types, Event Settings, Ideation Status, Product Areas, Languages, Platform Visibility, Open betas), User (User Roles, User Profile Fields, Registration Rules, Attachment Permissions, Public Tags, Content & Replies, Moderation Labels, Post Fields), Moderation (Automation Rules, Pre-moderation Rules, Moderation Notifications, Spam Prevention, ...)

## Pages actually visited & extracted (live HTML/CSS, not guessed)
Home, Users Overview, User Roles/Edit Custom Role, Content Overview/Articles (list + editor),
AI Settings, Platform▸Community (category tree), Automation Rules, Moderate Topic (Article +
Idea), Customization▸Header, Customization▸Footer, Customization▸Phrases, Gamification▸Badges
(list + Add Badge form), Settings▸Product Areas, Settings▸Languages, Settings▸Public Tags,
Platform▸Groups, Platform▸Custom Pages, Platform▸Events (list + Create Event).

## Round 2 — also visited
Settings▸Registration Rules, Attachment Permissions, User Profile Fields (+ Add Profile Field
form), Moderation Labels, Post Fields (empty state), Pre-moderation Rules, Spam Prevention, Open
betas. Email▸Email Campaigns (empty/setup state). Integrations▸Apps. Gamification▸Ranks.

## Round 3 — also visited
Email▸System Emails (+ Edit template), Customization▸Third-party Scripts, Gamification▸Point
system, Settings▸Content & Replies, Platform▸Ideation, Integrations▸Embeddable Widget▸
Installation.

## Round 4 (final) — also visited
Integrations▸API, Integrations▸SSO▸End Users, Platform▸Knowledge Base, Settings▸Event Types,
Ideation Status, Platform Visibility, Moderation Notifications.

## Sweep complete — remaining gaps are narrow, not "whole sections unknown"
Not individually opened: Integrations▸SSO▸Control Users, Embeddable Widget▸Setup/Customization/
Content Configuration, Developer Studio▸Sources/Connectors/Secrets and Variables,
Customization▸Sidebar (only glanced early on). Every one of these is a settings/config page in
a family we've now seen many examples of (SSO▸End Users covers the SSO pattern; Embeddable
Widget▸Installation covers the widget-config pattern) — low risk of a genuinely new component,
but not verified line-by-line. Analytics skipped deliberately (out of design scope per user).

## Component-rich candidate pages (for inventory pass)
- Users Overview → data table, search, filters, pagination, avatars, badges
- Content Moderation Overview → tabs, cards, empty states
- User Roles → permission matrix, checkboxes/toggles
- Registration Rules / Automation Rules → rule builder forms, dropdowns
- Header/Footer/Sidebar customization → form controls, color pickers, toggles
- AI Settings → toggles, radio groups, sliders

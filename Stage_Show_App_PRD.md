# Product Requirements Document (PRD)

## Interactive Stage Show Mobile Application

------------------------------------------------------------------------

## 1. Product Overview

### Product Name (Working Title)

Stage Show Interactive App

### Purpose

To create a branded interactive mobile application that accompanies a
live stage show, enabling audience participation, collecting audience
data, generating feedback, and promoting future events.

### Business Objective

-   Capture audience contact information for future marketing.
-   Increase engagement during live events.
-   Generate post-show bookings.
-   Provide measurable event analytics.
-   Support ticket sales for future shows.

------------------------------------------------------------------------

## 2. Target Audience

-   Event attendees of live stage shows.
-   Location: United Kingdom (initial launch).
-   Mixed age groups (likely 30+ primary demographic).
-   Business Type: B2C (Business to Customer).

------------------------------------------------------------------------

## 3. Platforms

-   iOS (iPhone)
-   Android phones
-   UK App Store & Google Play launch

------------------------------------------------------------------------

## 4. Core Features (Must Have)

### 4.1 User Interaction During Show

-   Real-time choice-making / voting system.
-   Multiple-choice questions.
-   Results calculated automatically.
-   Admin control over question activation.

### 4.2 Audience Data Collection

-   Collect:
    -   Name
    -   Email
    -   Optional phone number
-   GDPR-compliant consent checkbox.
-   Secure data storage.

### 4.3 End-of-Show Feedback

-   Feedback form at end of event.
-   Rating system (e.g., 1--5 stars).
-   Optional written feedback.
-   Option to book another show immediately.

### 4.4 Reporting Dashboard (Admin Panel)

Admin must see: - All answers per question. - Percentage breakdown by
choice. - Vote count per question. - Exportable reports (CSV/PDF
preferred). - Audience contact database.

### 4.5 Branding & UI

-   Dark theme.
-   Red & black color palette.
-   Use existing logo.
-   Fully branded UI.

### 4.6 Admin Portal (Web-Based)

-   Create/edit/delete questions.
-   Control when questions go live.
-   View analytics.
-   Manage content.
-   Manage show listings.
-   Manage ticket links.

------------------------------------------------------------------------

## 5. Secondary Features (Should Have)

### 5.1 Promotion of Other Shows

-   Show listing page.
-   Book now button.
-   External or integrated ticket purchase.

### 5.2 In-App Ticket Purchase (Optional Phase 2)

-   Payment integration.
-   Secure checkout.
-   Confirmation email.

### 5.3 Push Notifications

-   Announce new shows.
-   Send reminders before events.
-   Marketing campaigns.

### 5.4 Offline Mode

-   Question screens work offline.
-   Sync data when internet reconnects.

------------------------------------------------------------------------

## 6. Functional Requirements

### 6.1 User Flow

1.  User downloads app.
2.  Opens app at live show.
3.  Registers / submits contact info.
4.  Participates in live questions.
5.  Views results.
6.  Completes feedback form.
7.  Books next show (optional).

### 6.2 Authentication

Option A (Recommended): - Light authentication (email required). - No
complex login/password.

Option B: - Guest participation, email required at end.

------------------------------------------------------------------------

## 7. Content Management

-   Dynamic content.
-   Controlled via web admin portal.
-   Admin can:
    -   Add questions.
    -   Schedule questions.
    -   Update promotional content.
    -   Manage events.

Content frequency: - Ongoing updates per show.

------------------------------------------------------------------------

## 8. Technical Requirements

### Architecture

-   Cross-platform framework recommended (Flutter or React Native).
-   Backend with secure database.
-   REST API for mobile communication.
-   Web-based admin panel.

### Security

-   HTTPS encrypted data transfer.
-   GDPR compliance.
-   Secure storage of user data.
-   Admin authentication required.

------------------------------------------------------------------------

## 9. Reporting Requirements

Admin must access: - Total users per show. - Total votes per question. -
Percentage results. - Feedback summaries. - Export functionality. -
Contact list export.

------------------------------------------------------------------------

## 10. Non-Functional Requirements

-   Fast response time during live voting.
-   Must handle high concurrent users.
-   Reliable during live events.
-   Scalable backend.
-   Clean, simple UX.

------------------------------------------------------------------------

## 11. Monetization Strategy

### Phase 1:

-   Free app download.

### Phase 2:

-   Ticket purchasing integration.
-   Potential premium event upgrades.

------------------------------------------------------------------------

## 12. Publishing Requirements

-   Launch simultaneously on:
    -   Apple App Store
    -   Google Play Store
-   Region restricted to UK (initially).

------------------------------------------------------------------------

## 13. Maintenance

-   Monthly maintenance (cost dependent).
-   Ongoing support expected.
-   Estimated 5--10 hours per month (initial estimate).

------------------------------------------------------------------------

# Project Phases

## Phase 1 -- MVP (Minimum Viable Product)

-   User registration
-   Live voting
-   Feedback form
-   Basic admin dashboard
-   Reporting
-   Branding
-   UK launch

## Phase 2 -- Enhanced Version

-   In-app ticket purchasing
-   Advanced analytics
-   Push notifications
-   Offline sync improvements
-   Marketing automation

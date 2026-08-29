# NoShowCalc — Market Validation

Research date: August 2026

## Decision

**BUILD a narrow V1.**

NoShowCalc should be the next portfolio micro-SaaS because it combines a current healthcare operations problem with a very small, transparent browser-only MVP.

## Problem signal

Medical practices continue to report appointment no-shows as an operational and patient-access problem. MGMA reported in August 2026 that 32% of medical groups had higher no-show rates year-to-date compared with 2025. In a December 2025 MGMA poll, reducing no-shows was the leading patient-access priority among respondents.

## Product thesis

Practice managers often know their no-show percentage, but a percentage alone does not make the operational impact tangible. NoShowCalc converts practice-entered assumptions into an estimated annual and monthly revenue opportunity, then shows what a realistic improvement in the no-show rate could mean.

The calculator is intentionally not a scheduling system, reminder platform, EHR, or predictive model.

## V1 user

Small outpatient medical or dental practice owner, manager, administrator, or operations lead.

## V1 inputs

- Scheduled appointments per week
- Average net revenue per completed appointment
- Current no-show rate
- Late-cancellation rate
- Percentage of cancelled/no-show slots that are refilled
- Target no-show rate
- Optional monthly reminder/intervention cost

## V1 outputs

- Estimated annual scheduled appointments
- Estimated annual missed appointments
- Estimated annual gross revenue opportunity affected by missed appointments
- Estimated recovered-slot value
- Estimated annual opportunity if target no-show rate is reached
- Estimated monthly opportunity
- Break-even comparison against optional reminder/intervention spend

## Formula principles

Use only transparent arithmetic based on user-entered assumptions. Do not imply that every missed appointment equals guaranteed lost profit. Label dollar outputs as **estimated revenue opportunity**, not savings, profit, reimbursement, or guaranteed revenue.

## Safety / privacy boundaries

- No patient-level data
- No PHI
- No diagnosis or treatment information
- No medical advice
- No payer-contract advice
- No compliance certification claims
- Clearly state that results are estimates based on the user's assumptions

## Competitor / alternative context

No-show reduction is already addressed by scheduling, reminder, patient-engagement, and EHR products. That is not the V1 competition thesis. The wedge is a simple independent calculator that helps a practice quantify the size of its problem before buying or changing a reminder workflow.

## Ideas not selected first

### HIPAA Quick-Check

Real problem, but a generic assessment is crowded and higher-risk. HHS already offers an official Security Risk Assessment tool for small and medium healthcare practices. Multiple commercial vendors now provide HIPAA assessments, scoring, remediation plans, and compliance workflows. A portfolio product should not imply that a simple quiz determines HIPAA compliance.

### BreachCost Calculator

Healthcare breach cost is compelling, and IBM reported healthcare as the highest-cost industry for breaches in its 2025 report. However, a direct HIPAA breach-cost calculator competitor exists in 2026. A generic clone has weak differentiation.

### VendorRisk / BAA Tracker

The workflow is real, but several HIPAA/compliance suites already include vendor and BAA tracking. A useful version would also benefit from persistence, authentication, reminders, and document tracking. Save this as a later product after a sharper underserved workflow is identified.

## Validation targets after launch

Before expanding V1:

1. Get 20–50 relevant visitors.
2. Collect at least 5 useful responses from practice owners/managers/healthcare operations people.
3. Ask whether the calculator changes how they think about no-shows and what input/output is missing.
4. Do not add accounts, a database, AI, or EHR integration unless feedback repeatedly asks for it.

## Portfolio role

NoShowCalc becomes the second live SaaS proof point and reinforces the portfolio positioning: **Healthcare IT · Cybersecurity · SaaS Builder**.

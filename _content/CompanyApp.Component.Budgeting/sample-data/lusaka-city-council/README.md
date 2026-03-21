# Lusaka City Council - Budgeting Component Sample Data

## Overview
This directory contains comprehensive sample data for the Budgeting Component Mock services. All data is specific to Lusaka City Council operations with realistic Zambian context including local wards, departments, and fiscal management scenarios.

## Mock Services and JSON File Mappings

### 1. MockRevenueManagementService
**File:** `revenue-management.json` (30 entries)
- **Purpose:** Revenue collection and management across different sources
- **Key Fields:** revenueCode, revenueSource, ward, estimatedAmount, actualAmount, collectionRate
- **Revenue Sources:** Property Rates, Market Fees, Business Licenses, Parking Fees, Building Permits, Water Charges, etc.
- **Wards Covered:** All major Lusaka wards including Kabulonga, Kamwala, Chelston, Civic Centre, etc.

### 2. MockMidYearReviewService
**File:** `mid-year-review.json` (30 entries)
- **Purpose:** Mid-year budget review and performance assessment
- **Key Fields:** reviewCode, department, originalBudget, actualExpenditure, utilisationRate, variance
- **Departments:** Finance, Public Health, Engineering, Education, Water & Sanitation, etc.
- **Review Periods:** H1, H2 (Half-year reviews)

### 3. MockBudgetDashboardService
**File:** `budget-dashboard.json` (30 entries)
- **Purpose:** Real-time budget monitoring dashboard data
- **Key Fields:** dashboardId, totalBudget, totalExpenditure, totalRevenue, budgetUtilisation
- **Metrics:** Budget utilization rates, revenue collection rates, surplus/deficit tracking
- **Status Indicators:** On Track, Attention Required, Critical, Good

### 4. MockDepartmentBudgetService
**File:** `department-budget.json` (30 entries)
- **Purpose:** Departmental budget allocations and tracking
- **Key Fields:** budgetCode, department, ward, allocatedBudget, expenditure, utilizationRate
- **Categories:** Personnel, Operations, Capital, Programs
- **Approval Status:** Approved, Pending, Under Review

### 5. MockConsolidationService
**File:** `consolidation.json` (30 entries)
- **Purpose:** Consolidated financial reporting across departments
- **Key Fields:** consolidationId, consolidatedBudget, consolidatedExpenditure, consolidatedRevenue
- **Types:** Monthly, Quarterly, Annual, Mid-Year
- **Process Stages:** Completed, In Progress, Pending Review, Approved

### 6. MockWorkflowCollaborationService
**File:** `workflow-collaboration.json` (30 entries)
- **Purpose:** Budget workflow collaboration and approvals
- **Key Fields:** workflowId, workflowName, initiatedBy, assignedTo, workflowStage
- **Workflow Types:** Budget Approval, Department Review, Variance Analysis, Fund Reallocation
- **Collaboration Features:** Comments tracking, attachments, collaborator count

### 7. MockIntegrationService
**File:** `integration.json` (30 entries)
- **Purpose:** System integration with external platforms
- **Key Fields:** integrationId, systemName, integrationType, recordsProcessed, status
- **Systems:** IFMIS, Bank of Zambia, ZRA Tax System, Payroll System, Asset Management
- **Integration Types:** API, Database Sync, File Transfer, Web Service

### 8. MockBudgetGuidelineService
**File:** `budget-guideline.json` (30 entries)
- **Purpose:** Budget policies and guidelines management
- **Key Fields:** guidelineCode, guidelineTitle, minimumThreshold, maximumThreshold, percentageLimit
- **Categories:** Expenditure, Revenue, Capital, Operations
- **Approval Levels:** Town Clerk, Finance Committee, Full Council, Department Head

### 9. MockStrategicGoalService
**File:** `strategic-goal.json` (30 entries)
- **Purpose:** Strategic goals and objectives tracking
- **Key Fields:** goalCode, goalTitle, allocatedBudget, completionPercentage, responsibleDepartment
- **Goal Types:** Infrastructure Development, Service Delivery, Revenue Enhancement, Environmental Sustainability
- **KPI Tracking:** Key Performance Indicators and achievement rates

### 10. MockMultiYearPlanningService
**File:** `multi-year-planning.json` (30 entries)
- **Purpose:** Multi-year budget planning (3-5 year periods)
- **Key Fields:** planCode, planName, planningPeriod, totalBudget, year1-4 allocations
- **Planning Cycles:** 2025-2028, 2026-2029, etc.
- **Plan Types:** Infrastructure Modernization, Service Excellence, Digital City, Green Lusaka

### 11. MockBudgetReviewService
**File:** `budget-review.json` (30 entries)
- **Purpose:** Budget review and adjustment processes
- **Key Fields:** reviewCode, reviewType, originalBudget, revisedBudget, budgetChange
- **Review Types:** Quarterly Review, Mid-Year Review, Annual Review, Special Review
- **Change Reasons:** Revenue shortfall, Emergency funds needed, Project completion, Reallocation

### 12. MockPerformanceMonitoringService
**File:** `performance-monitoring.json` (30 entries)
- **Purpose:** Budget performance monitoring and KPI tracking
- **Key Fields:** monitoringCode, kpiName, targetValue, actualValue, achievementRate
- **KPIs:** Budget Utilization, Revenue Collection, Project Completion, Service Delivery, Cost Efficiency
- **Ratings:** Excellent, Good, Satisfactory, Needs Improvement

### 13. MockPublicConsultationService
**File:** `public-consultation.json` (30 entries)
- **Purpose:** Public participation in budget planning
- **Key Fields:** consultationCode, consultationTitle, ward, participantsActual, feedbackReceived
- **Consultation Types:** Public Hearing, Online Survey, Ward Meeting, Stakeholder Forum
- **Feedback Tracking:** Supporting, opposing, and neutral comments

### 14. MockBudgetApprovalService
**File:** `budget-approval.json` (30 entries)
- **Purpose:** Budget approval workflow management
- **Key Fields:** approvalCode, budgetType, requestedAmount, approvedAmount, approvalStatus
- **Budget Types:** Department Budget, Capital Budget, Supplementary Budget, Project Budget
- **Approval Levels:** Department Head, Finance Committee, Full Council, Town Clerk

### 15. MockBudgetExecutionService
**File:** `budget-execution.json` (30 entries)
- **Purpose:** Budget execution and implementation tracking
- **Key Fields:** executionCode, budgetAllocation, executedAmount, executionRate, numberOfProjects
- **Execution Periods:** Q1, Q2, Q3, Q4
- **Status Tracking:** On Schedule, Delayed, Ahead of Schedule, Critical

## Data Characteristics

### Currency
- All financial amounts in ZMW (Zambian Kwacha)

### Date Format
- ISO 8601 format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS

### Property Naming
- camelCase convention for all JSON properties

### Wards Covered
- Kabulonga, Kamwala, Chelston, Civic Centre, Rhodes Park, Woodlands
- Longacres, Chilenje, Matero, Kabwata, Libala, Garden
- Olympia, Meanwood, Kanyama, Roma, Soweto, Chawama
- Kalundu, Cairo Road, Northmead, Makeni, Kalingalinga
- Mandevu, Avondale, Kabanana, Mtendere, Chainda, Emmasdale, City Market

### Departments
- Finance Department, Public Health, Engineering Services
- Education, Water & Sanitation, Waste Management
- Planning, Social Services, Transport, Parks & Recreation
- Housing, Economic Development, ICT, Legal Services, Human Resources

## Usage Notes

1. **Sample Data Only:** This data is for development and testing purposes
2. **Realistic Context:** All entries reflect actual Lusaka City Council operational scenarios
3. **Diverse Coverage:** Data covers all fiscal quarters and multiple years where applicable
4. **Randomized but Realistic:** Values are randomized but within realistic ranges for each metric
5. **Complete Records:** All 30 entries per file provide comprehensive test coverage

## File Location
```
/src/Components/CompanyApp.Component.Budgeting/wwwroot/sample-data/lusaka-city-council/
```

## Integration
These JSON files are designed to be consumed by their respective Mock services to provide realistic data for:
- Development and testing
- UI component demos
- Integration testing
- Performance testing
- User training scenarios

## Last Updated
2025-01-19

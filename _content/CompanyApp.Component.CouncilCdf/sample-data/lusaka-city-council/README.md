# Lusaka City Council - CouncilCdf Component Sample Data

## Overview
This directory contains comprehensive sample data for the CouncilCdf Component Mock services. All data is specific to Lusaka City Council's Constituency Development Fund operations with realistic Zambian context.

## Mock Services and JSON File Mappings

### 1. MockContractService
**File:** `contract.json` (30 entries)
- **Purpose:** CDF contract management and tracking
- **Key Fields:** contractNumber, projectName, contractorName, contractValue, completionPercentage
- **Project Types:** School Block Construction, Health Post Rehabilitation, Community Road, Market Stalls, Water Borehole, Youth Center
- **Contractors:** Zambia Builders Ltd, Capital Contractors, Excel Construction, Summit Engineering, Premier Works Ltd
- **Contract Status:** Active, Completed, Delayed, Suspended
- **Wards:** All major Lusaka wards

### 2. MockDisbursementService
**File:** `disbursement.json` (30 entries)
- **Purpose:** CDF fund disbursement tracking
- **Key Fields:** disbursementCode, ward, disbursementType, allocatedAmount, disbursedAmount
- **Disbursement Types:** Project Payment, Operational Funds, Emergency Allocation, Capital Works
- **Beneficiaries:** Ward Development Committee, Community School, Health Post, Market Committee
- **Payment Methods:** Bank Transfer, Cheque, Mobile Money
- **Banks:** Zanaco, Stanbic Bank, First National Bank, Indo-Zambia Bank

### 3. MockProjectImplementationService
**File:** `project-implementation.json` (30 entries)
- **Purpose:** CDF project implementation monitoring
- **Key Fields:** projectCode, projectName, projectBudget, physicalProgress, financialProgress
- **Project Types:** Infrastructure, Education, Health, Social, Economic
- **Progress Tracking:** Physical vs Financial progress comparison
- **Challenges:** Material shortage, Weather delays, Funding delays
- **Beneficiary Impact:** Population served, jobs created

### 4. MockConstituencyService
**File:** `constituency.json` (30 entries)
- **Purpose:** Constituency-level CDF management
- **Key Fields:** constituencyCode, constituencyName, memberOfParliament, totalAllocation
- **Constituencies:** Lusaka Central, Kabwata, Kanyama, Mandevu, Matero, Chawama
- **MPs:** Hon. John Banda, Hon. Mary Phiri, Hon. Patrick Mwale, Hon. Grace Mbewe
- **Committee Info:** CDF Committee members, chairperson, priority sectors
- **Performance Metrics:** Utilization rate, completed vs ongoing projects

### 5. MockProcurementService
**File:** `procurement.json` (30 entries)
- **Purpose:** CDF procurement process management
- **Key Fields:** procurementCode, procurementType, description, estimatedValue, winningBidder
- **Procurement Types:** Open Tender, Request for Quotation, Direct Procurement, Framework Contract
- **Items:** Construction Materials, School Furniture, Medical Equipment, IT Equipment, Sports Equipment
- **Methods:** Competitive Bidding, Shopping, Direct
- **Status:** Awarded, Evaluation, Delivered, Pending

### 6. MockAuditService
**File:** `audit.json` (30 entries)
- **Purpose:** CDF audit and compliance tracking
- **Key Fields:** auditCode, auditType, findings, auditScore, auditRating
- **Audit Types:** Financial Audit, Project Audit, Procurement Audit, Compliance Audit
- **Auditors:** Office of Auditor General, Internal Audit, External Auditor
- **Findings:** Major and minor findings classification
- **Ratings:** Excellent, Good, Satisfactory, Needs Improvement
- **Follow-up:** Recommendations and implementation tracking

### 7. MockBudgetService
**File:** `budget.json` (30 entries)
- **Purpose:** Ward-level CDF budget management
- **Key Fields:** budgetCode, ward, allocatedBudget, expenditure, budgetUtilization
- **Budget Categories:** Infrastructure, Education, Health, Social Development, Economic Empowerment
- **Activity Tracking:** Number of activities, completed vs pending
- **Approval Process:** CDF Committee approval workflow
- **Fiscal Year:** 2025 allocations

### 8. MockProposalService
**File:** `proposal.json` (30 entries)
- **Purpose:** Community project proposal management
- **Key Fields:** proposalCode, proposalTitle, estimatedCost, approvedAmount, status
- **Proposal Types:** Infrastructure, Education, Health, Economic, Social
- **Proposed By:** Ward Development Committee, Youth Group, Women's Club, Community Leader
- **Status:** Approved, Pending Review, Rejected, Revision Required
- **Review Process:** Technical Committee review, CDF Committee approval
- **Beneficiary Impact:** Estimated beneficiaries per project

### 9. MockContractorPortalService
**File:** `contractor-portal.json` (30 entries)
- **Purpose:** Contractor registration and management portal
- **Key Fields:** contractorId, contractorName, activeContracts, performanceRating, complianceStatus
- **Contractors:** Zambia Builders Ltd, Capital Contractors, Excel Construction, Summit Engineering, Premier Works Ltd, Quality Builders, Apex Contractors
- **Registration Info:** NCC Registration, PACRA Registration, Tax Clearance, Insurance Certificate
- **Performance Metrics:** Completed projects, total contract value, outstanding payments
- **Compliance:** Tax clearance validity, insurance status

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

### Constituencies
- Lusaka Central, Kabwata, Kanyama, Mandevu, Matero, Chawama
- Each constituency comprises 8-15 wards

## CDF Project Categories

### Infrastructure
- Roads, bridges, drainage systems, community halls

### Education
- Classroom blocks, school renovations, learning materials

### Health
- Health posts, clinic equipment, medical supplies

### Social Development
- Youth centers, sports facilities, community programs

### Economic Empowerment
- Market stalls, cooperative support, skills training

## Usage Notes

1. **Sample Data Only:** This data is for development and testing purposes
2. **Realistic Context:** All entries reflect actual CDF operational scenarios in Lusaka
3. **Community Focus:** Data emphasizes community participation and grassroots development
4. **Transparency:** Includes audit trails, public participation, and accountability measures
5. **Complete Records:** All 30 entries per file provide comprehensive test coverage

## Zambian CDF Context

### Legal Framework
- Constituency Development Fund Act
- Public Finance Management Act
- Public Procurement Act

### Governance Structure
- CDF Committee (Constituency level)
- Ward Development Committees
- Community participation mechanisms

### Accountability
- Quarterly reports
- Annual audits
- Public consultations
- Parliamentary oversight

## File Location
```
/src/Components/CompanyApp.Component.CouncilCdf/wwwroot/sample-data/lusaka-city-council/
```

## Integration
These JSON files are designed to be consumed by their respective Mock services to provide realistic data for:
- Development and testing
- UI component demos
- Integration testing
- CDF management training
- Transparency and accountability demonstrations

## Last Updated
2025-01-19

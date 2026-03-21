# Lusaka City Council - Procurement & Tenders Sample Data

This directory contains sample JSON data files for the Lusaka City Council's Procurement and Tenders component. All data is realistic and contextually appropriate for Zambian public procurement operations.

## Overview

This collection includes **26 JSON files**, each containing **30 sample data entries** for different aspects of the procurement lifecycle.

## Data Context

- **Location**: Lusaka City Council, Zambia
- **Wards**: Kanyama, Chilenje, Mtendere, Rhodes Park, Mandevu, Chaisa, Chawama, Libala, Ng'ombe, Garden
- **Banks**: Zanaco, FNB, Stanbic, Indo-Zambia Bank, Standard Chartered
- **Currency**: ZMW (Zambian Kwacha)
- **Date Format**: ISO 8601 (e.g., "2025-01-15T10:30:00Z")
- **Compliance**: Zambia Public Procurement Authority (ZPPA) guidelines

## Files Description

### Procurement Planning (4 files)

**requisition.json** / **requisition-data.json**
- Purchase requisitions
- Departmental requests
- Budget codes
- Approval workflow
- Priority levels

**budget.json**
- Budget allocations by department
- Committed and spent amounts
- Available balances
- Fiscal year tracking

**procurement.json**
- Tender planning
- Procurement methods
- Estimated values
- Evaluation status

### Supplier Management (2 files)

**supplier.json**
- Supplier registry
- Registration numbers and TPIN
- Categories (Goods, Services, Works)
- Bank account details
- Status (Active, Suspended, Blacklisted)

**contract.json**
- Active contracts
- Contract values and periods
- Performance ratings
- Departmental assignments

### Tendering Process (3 files)

**rfx.json**
- Request for Quotation (RFQ)
- Request for Proposal (RFP)
- Invitation to Tender (ITT)
- Closing dates and responses

**bid-opening.json**
- Tender opening records
- Number of bids received
- Bid values (lowest/highest)
- Evaluation committee
- Award decisions

**contract-performance.json**
- Supplier performance evaluation
- Quality, timeliness, cost efficiency scores
- Overall ratings
- Recommendations

### Purchase Orders & Invoicing (3 files)

**purchase-order.json**
- PO generation and tracking
- Supplier assignments
- Delivery schedules
- Payment terms
- Approval status

**invoice.json**
- Supplier invoices
- PO references
- Payment tracking
- Due dates
- Payment status

**goods-receipt.json**
- Goods received notes (GRN)
- Inspection results
- Condition assessments
- Acceptance/rejection

### Approval & Workflow (2 files)

**approval.json** / **approval-routing.json**
- Multi-level approvals
- Workflow routing
- Approval hierarchy
- Comments and feedback
- Queue management

### Catalog & Shopping (2 files)

**catalog.json**
- Item catalog
- Pricing information
- Stock availability
- Supplier assignments
- Product categories

**shopping-cart.json**
- User shopping carts
- Cart items and values
- Checkout status
- Department tracking

### Contract Management (2 files)

**contract-renewal.json**
- Contract renewal requests
- Original vs. renewal terms
- Value comparisons
- Justifications
- Approval tracking

**spend-analytics.json**
- Spending analysis by category
- Top suppliers
- Transaction volumes
- Savings achieved
- Compliance rates

### Compliance & Audit (1 file)

**audit-compliance.json**
- Internal and external audits
- Compliance scoring
- Findings and recommendations
- Audit types and periods
- Resolution tracking

### System Features (5 files)

**user.json**
- System users
- Roles and permissions
- Department assignments
- Login tracking

**notification.json** / **email-notification.json**
- System notifications
- Email delivery tracking
- Read receipts
- Priority levels

**api-integration.json**
- Third-party integrations
- ZPPA, banking, tax systems
- Sync status
- Performance metrics

**advanced-search.json**
- Search history
- Query performance
- Result tracking
- Saved searches

**reporting-bi.json**
- Report generation
- Business intelligence
- Data visualization
- Export formats

### Supporting Data (1 file)

**department-data.json**
- Department registry
- Budget allocations
- Staff counts
- Contact information

## Procurement Methods Supported

- Open Tendering
- Restricted Tendering
- Request for Quotations
- Direct Procurement (emergency/sole source)
- Framework Agreements

## Data Structure

All JSON files follow these conventions:
- camelCase property names
- ISO 8601 date format
- ZMW currency amounts (decimal with 2 places)
- Zambian TPIN format (10 digits)
- Multi-level approval workflows
- ZPPA compliance tracking

## Usage

These files serve as mock data for:
- Procurement planning and execution
- Tender management
- Supplier relationship management
- Contract administration
- Budget monitoring
- Compliance reporting
- Performance analytics

## Key Features

The system supports:
- **E-Procurement**: Online requisitions, approvals, and ordering
- **Tender Management**: Full tender lifecycle from RFx to award
- **Supplier Portal**: Supplier registration and bid submission
- **Contract Management**: Contract tracking and performance monitoring
- **Budget Integration**: Real-time budget checking and commitment
- **Audit Trail**: Complete transaction history and compliance tracking
- **Analytics**: Spend analysis and performance dashboards

## Generated

All files were automatically generated with realistic, varied data specific to Lusaka City Council procurement operations and ZPPA compliance requirements.

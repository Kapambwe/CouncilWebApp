# Lusaka City Council - Council Activity Sample Data

This directory contains sample JSON data files for the Lusaka City Council's Council Activity component. All data is realistic and contextually appropriate for Zambian local government operations.

## Overview

This collection includes **80 JSON files**, each containing **30 sample data entries** for different council services and operations.

## Data Context

- **Location**: Lusaka City Council, Zambia
- **Wards**: Kanyama, Chilenje, Mtendere, Rhodes Park, Mandevu, Chaisa, Chawama, Libala, Ng'ombe, Garden
- **Markets**: Soweto Market, Kanyama Market, Chilenje Market, Kamwala Market, City Market
- **Banks**: Zanaco, FNB, Stanbic, Indo-Zambia Bank, Standard Chartered
- **Currency**: ZMW (Zambian Kwacha)
- **Date Format**: ISO 8601 (e.g., "2025-01-15T10:30:00Z")

## File Categories

### Market Management (6 files)
- `market-maintenance.json` - Market facility maintenance records
- `market-registry.json` - Registered markets and trading centers
- `vendor-registry.json` - Vendor registration and licensing
- `market-sanitation.json` - Market sanitation inspections
- `market-fee-collection.json` - Market fee collection records
- `stand-shop-allocation.json` - Market stand/shop allocations

### Asset & Vehicle Management (10 files)
- `asset-condition.json` - Asset condition assessments
- `asset-registry.json` - Council asset register
- `asset-utilization.json` - Asset utilization statistics
- `movable-asset.json` - Movable assets inventory
- `heavy-vehicle-registry.json` - Heavy vehicle registrations
- `vehicle-work-order.json` - Vehicle maintenance work orders
- `vehicle-performance.json` - Vehicle performance metrics
- `fuel-record.json` - Fuel consumption records
- `insurance-record.json` - Asset insurance records
- `maintenance-record.json` - Maintenance history

### Contractor & Works Management (4 files)
- `contractor.json` - Registered contractors
- `contractor-engineer.json` - Contractor engineering staff
- `work-order.json` - Works contracts and orders
- `work-verification.json` - Work completion verification
- `vetting.json` - Contractor vetting records

### Land & Property Management (11 files)
- `land-parcel.json` - Land parcel registry
- `land-application.json` - Land allocation applications
- `land-plan.json` - Land subdivision and development plans
- `land-parcel-landuse.json` - Land use classifications
- `offer-letter.json` - Land offer letters
- `conversion-request.json` - Land use conversion requests
- `chiefdom.json` - Chiefdom registry
- `customary-land.json` - Customary land holdings
- `dispute.json` - Land dispute cases
- `property-tenancy.json` - Property tenancy records
- `property-valuation.json` - Property valuations
- `property-registry.json` - Property register
- `property-ownership.json` - Property ownership records

### Compliance & Enforcement (6 files)
- `zoning-violation.json` - Zoning violation cases
- `inspection.json` - Building and business inspections
- `encroachment-registry.json` - Land encroachment cases
- `legal-action.json` - Legal proceedings
- `land-use-compliance.json` - Land use compliance monitoring
- `zoning-management.json` - Zoning regulations

### Waste Management (11 files)
- `illegal-dumping.json` - Illegal dumping reports
- `disposal-site.json` - Waste disposal sites
- `waste-collection-log.json` - Waste collection logs
- `waste-contractor.json` - Waste management contractors
- `recycling-center.json` - Recycling centers
- `waste-vehicle.json` - Waste collection vehicles
- `waste-billing.json` - Waste collection billing
- `waste-collection-route.json` - Collection routes
- `waste-bin.json` - Waste bin locations
- `waste-zone.json` - Waste collection zones

### Infrastructure & Development (4 files)
- `gis.json` - GIS spatial data
- `rural-infrastructure.json` - Rural infrastructure inventory
- `development-application.json` - Development applications
- `application-management.json` - Application tracking

### Bus Stations & Transport (5 files)
- `bus-station-registry.json` - Bus station registry
- `bus-bay-allocation.json` - Bus bay allocations
- `bus-station-revenue.json` - Bus station revenue
- `bus-station-compliance.json` - Station compliance checks
- `utility-connection.json` - Utility connections

### Financial & Administrative (8 files)
- `budget-expenditure.json` - Budget and expenditure
- `payment.json` - Payment transactions
- `fuel-transaction.json` - Fuel transactions
- `receipt-book-tracking.json` - Receipt book tracking
- `council-approval.json` - Council approvals
- `daily-job-log.json` - Daily operations log
- `analytics.json` - Operational analytics

### Workflow & Campaigns (5 files)
- `campaign.json` - Public campaigns
- `workflow.json` - Workflow definitions
- `workflow-campaign-integration.json` - Campaign workflows
- `commissioner-forwarding.json` - Document forwarding
- `scheduling.json` - Activity scheduling

### Miscellaneous (10 files)
- `document.json` - Document management
- `public-notice.json` - Public notices
- `citizen-portal.json` - Citizen portal users
- `sustainability.json` - Sustainability initiatives
- `predictive-maintenance.json` - Predictive maintenance
- `mobile.json` - Mobile app users
- `inventory.json` - Inventory management
- `notification.json` - System notifications

## Data Structure

All JSON files follow these conventions:
- camelCase property names
- ISO 8601 date format
- ZMW currency amounts (decimal with 2 places)
- Zambian phone numbers (+260 prefix)
- Zambian NRC format (######/##/#)
- Lusaka-specific location data

## Usage

These files serve as mock data for:
- Development and testing
- UI component demonstrations
- User training
- System demonstrations
- Data migration testing

## Generated

All files were automatically generated with realistic, varied data specific to Lusaka City Council operations.

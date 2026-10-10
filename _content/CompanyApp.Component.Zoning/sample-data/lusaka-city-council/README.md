# Lusaka City Council - Zoning Component Sample Data

## Overview
This directory contains comprehensive sample data for the Zoning Component Mock services. All data is specific to Lusaka City Council's urban planning and zoning operations with realistic Zambian context.

## Mock Services and JSON File Mappings

### 1. MockWorkflowAutomationService
**File:** `workflow-automation.json` (30 entries)
- **Purpose:** Automated workflow management for zoning applications
- **Key Fields:** workflowId, workflowName, applicantName, currentStage, assignedTo
- **Workflow Types:** Zoning Application, Rezoning Request, Land Use Change, Development Permit
- **Stages:** Application Review, Site Inspection, Technical Review, Approval, Rejected
- **Assigned Roles:** Planning Officer, Zoning Officer, Technical Committee, Director
- **Automation Features:** Rule-based routing, trigger execution, automated notifications

### 2. MockZoningService
**File:** `zoning.json` (30 entries)
- **Purpose:** Zoning classification and regulation management
- **Key Fields:** zoningCode, zoningCategory, areaSize, landUse, maximumCoverage
- **Zoning Categories:** Residential Low/Medium/High Density, Commercial, Industrial, Mixed Use, Institutional, Open Space, Agricultural
- **Regulations:** Maximum coverage, height restrictions, setback requirements, parking minimums
- **Plot Numbers:** Standard Lusaka format (XXXX/M)

### 3. MockGISService
**File:** `gis.json` (30 entries)
- **Purpose:** Geographic Information System data management
- **Key Fields:** gisId, layerName, layerType, coordinates, spatialReference
- **Layer Types:** Polygon, Point, Line
- **Layers:** Zoning Boundaries, Land Parcels, Infrastructure, Utilities, Buildings
- **Data Sources:** Survey Data, Satellite Imagery, Field Collection, Cadastral Records
- **Formats:** Shapefile, GeoJSON, KML, GeoDatabase
- **Spatial Reference:** WGS 84

### 4. MockDepartmentModuleService
**File:** `department-module.json` (30 entries)
- **Purpose:** Department-specific zoning modules
- **Key Fields:** moduleId, moduleName, department, userCount, successRate
- **Modules:** Land Use Planning, Development Control, Subdivision Approval, Building Plan Approval
- **Departments:** Planning, Engineering, Health, Environment, Transport, Water
- **Metrics:** Daily/monthly transactions, processing times, success rates, case tracking

### 5. MockInfrastructurePlanningService
**File:** `infrastructure-planning.json` (30 entries)
- **Purpose:** Infrastructure development planning
- **Key Fields:** planId, projectName, infrastructureType, estimatedBudget, beneficiaryPopulation
- **Infrastructure Types:** Roads, Water, Sewer, Drainage, Electricity, Telecommunications
- **Planning Phases:** Concept, Design, Approval, Implementation, Completed
- **Impact Metrics:** Coverage area, beneficiary population, environmental impact

### 6. MockSatelliteImageryService
**File:** `satellite-imagery.json` (30 entries)
- **Purpose:** Satellite imagery management and analysis
- **Key Fields:** imageryId, satelliteName, resolution, captureDate, analysisType
- **Satellites:** Sentinel-2, Landsat-8, WorldView, SPOT, PlanetScope
- **Resolutions:** 0.5m to 30m
- **Analysis Types:** Land Use Classification, Change Detection, Urban Growth, Vegetation Index
- **Formats:** GeoTIFF, JPEG2000, PNG

### 7. MockRoleBasedAccessService
**File:** `role-based-access.json` (30 entries)
- **Purpose:** User access control and permissions
- **Key Fields:** userId, username, role, accessLevel, permissions
- **Roles:** Planning Officer, Zoning Officer, GIS Analyst, Director, Administrator, Surveyor, Enforcement Officer, Public User
- **Access Levels:** Read Only, Read/Write, Full Access, Admin
- **Security:** Login tracking, failed attempt monitoring, account status

### 8. MockSpatialAnalysisService
**File:** `spatial-analysis.json` (30 entries)
- **Purpose:** Spatial analysis and modeling
- **Key Fields:** analysisId, analysisName, analysisType, inputLayers, resultAccuracy
- **Analysis Types:** Overlay, Buffer, Network, Interpolation, Density
- **Analysis Categories:** Land Use Pattern, Urban Growth, Density Study, Accessibility, Proximity
- **Performance:** Processing time tracking, accuracy metrics

### 9. MockPublicParticipationService
**File:** `public-participation.json` (30 entries)
- **Purpose:** Public consultation and participation
- **Key Fields:** participationId, projectName, participationType, actualParticipants, commentsReceived
- **Participation Types:** Public Hearing, Online Consultation, Workshop, Survey, Open House
- **Feedback Tracking:** Supporting, opposing, and neutral comments
- **Incorporation:** Feedback incorporation tracking

### 10. MockRezoningApplicationService
**File:** `rezoning-application.json` (30 entries)
- **Purpose:** Rezoning application processing
- **Key Fields:** applicationId, currentZoning, proposedZoning, applicationFee, status
- **Current/Proposed Zoning:** All zoning categories
- **Process Steps:** Application, Public Hearing, Technical Review, Committee Recommendation, Decision
- **Public Input:** Comment tracking, hearing schedules

### 11. MockEconomicZoningService
**File:** `economic-zoning.json` (30 entries)
- **Purpose:** Economic zone management and tracking
- **Key Fields:** zoneId, zoneName, numberOfBusinesses, employmentGenerated, annualRevenue
- **Zone Types:** Industrial Park, Commercial District, Business Hub, Technology Park, Manufacturing Zone
- **Economic Metrics:** Employment, revenue, occupancy rate, growth rate
- **Incentives:** Tax breaks, reduced fees, infrastructure support

### 12. MockZoningAreaService
**File:** `zoning-area.json` (30 entries)
- **Purpose:** Zoning area classification and planning
- **Key Fields:** areaId, areaName, totalArea, residentialArea, commercialArea
- **Land Use Breakdown:** Residential, Commercial, Industrial, Open Space, Institutional
- **Population Metrics:** Total population, density per hectare
- **Master Plan:** Plan references, review dates

### 13. MockZoningSummaryService
**File:** `zoning-summary.json` (30 entries)
- **Purpose:** Zoning activity summary and reporting
- **Key Fields:** summaryId, reportPeriod, totalApplications, approvedApplications, revenueCollected
- **Reporting Periods:** Q1, Q2, Q3, Q4, Annual
- **Metrics:** Application volumes, approval rates, processing times, compliance rates
- **Financial:** Revenue collection tracking

### 14. MockSurveyDataService
**File:** `survey-data.json` (30 entries)
- **Purpose:** Land survey data management
- **Key Fields:** surveyId, surveyType, surveyorName, coordinates, accuracy
- **Survey Types:** Topographic, Cadastral, Engineering, Boundary, Control
- **Surveyor Info:** Licensed surveyor details, license numbers
- **Technical Data:** Elevation, boundary markers, datum, projection system
- **Formats:** DWG, DXF, Shapefile, GeoJSON

### 15. MockSurveyDataExportService
**File:** `survey-data-export.json` (30 entries)
- **Purpose:** Survey and spatial data export
- **Key Fields:** exportId, exportType, dataType, format, recordCount
- **Export Types:** Full Dataset, Filtered Data, Ward Specific, Project Based
- **Data Types:** Survey Data, GIS Layers, Zoning Maps, Cadastral Data
- **Formats:** CSV, Excel, Shapefile, GeoJSON, KML, PDF
- **Access Control:** Public, Restricted, Confidential

## Data Characteristics

### Currency
- All financial amounts in ZMW (Zambian Kwacha)

### Date Format
- ISO 8601 format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS

### Property Naming
- camelCase convention for all JSON properties

### Coordinates
- Decimal degrees format: -15.XXXX, 28.XXXX (Lusaka region)
- Spatial Reference: WGS 84
- Projection: UTM Zone 35S

## Zoning Categories

### Residential Zoning
- **Low Density:** Large plots, low coverage, single-family homes
- **Medium Density:** Medium plots, townhouses, duplexes
- **High Density:** Apartments, multi-story buildings

### Commercial Zoning
- Retail, offices, services, entertainment
- Mixed-use allowed in some zones

### Industrial Zoning
- Light industry, manufacturing, warehousing
- Heavy industry (designated areas)

### Institutional Zoning
- Schools, hospitals, government buildings, religious facilities

### Open Space
- Parks, recreation areas, green belts

## Wards Covered
- Kabulonga, Kamwala, Chelston, Civic Centre, Rhodes Park, Woodlands
- Longacres, Chilenje, Matero, Kabwata, Libala, Garden
- Olympia, Meanwood, Kanyama, Roma, Soweto, Chawama
- Kalundu, Cairo Road, Northmead, Makeni, Kalingalinga
- Mandevu, Avondale, Kabanana, Mtendere, Chainda, Emmasdale

## Building Regulations

### Setbacks
- Front: 3-10 meters (zone dependent)
- Side: 2-5 meters
- Rear: 3-8 meters

### Coverage
- Residential: 40-60%
- Commercial: 60-80%
- Industrial: 60-75%

### Height Restrictions
- Residential: 8-15 meters
- Commercial: 15-45 meters
- Specific height limits per zone

## Usage Notes

1. **Sample Data Only:** This data is for development and testing purposes
2. **Realistic Context:** All entries reflect actual Lusaka zoning scenarios
3. **Technical Accuracy:** GIS coordinates, spatial references are realistic
4. **Regulatory Compliance:** Aligns with Zambian planning laws
5. **Complete Coverage:** All 30 entries per file provide comprehensive test data

## Legal Framework

### Planning Legislation
- Town and Country Planning Act (Cap 283)
- Urban and Regional Planning Act
- Local Government Act
- Public Health Act (planning provisions)

### Standards
- Zambian Building Codes
- Environmental Management Act
- Roads and Road Traffic Act

## File Location
```
/src/Components/CompanyApp.Component.Zoning/wwwroot/sample-data/lusaka-city-council/
```

## Integration
These JSON files are designed to be consumed by their respective Mock services to provide realistic data for:
- Development and testing
- UI component demos
- GIS integration testing
- Planning process demonstrations
- Public participation systems
- Spatial analysis training

## Last Updated
2025-01-19

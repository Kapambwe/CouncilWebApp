# Adding Municipalities / Councils to CouncilWebApp

## Overview

CouncilWebApp uses a **multi-tenant architecture** where each council or municipality is a separate tenant.  
Sample data for each tenant lives under `wwwroot/sample-data/{country}/{tenant-folder-name}/`.

---

## Directory Structure

```
wwwroot/
  sample-data/
    zambia/
      lusaka-city-council/
        authentication.json          ← 30 demo users (roles × 3 cycles)
        banking-reconciliation.json
        beneficiary.json
        campaign-management.json
        decision-engine.json
        financial-decision.json
        grant-utilization.json
        imprest-retirement.json
        lease-agreement.json
        market-facility.json
        procurement-decision.json
        property-exemption.json
        receipt-book.json
        risk-assessment.json
        rules-engine.json
        statutory-obligation.json
        task-management.json
        ward-development.json
        workflow.json
        zra-tax-compliance.json
      kitwe-city-council/
        ...
    south-africa/
      city-of-johannesburg/
        ...
```

---

## Supported Countries and Municipalities

### Zambia — Top 20 Biggest Councils

| # | Folder Name | Display Name | Code | Province |
|---|------------|-------------|------|----------|
| 1 | `lusaka-city-council` | Lusaka City Council | LCC | Lusaka |
| 2 | `kitwe-city-council` | Kitwe City Council | KCC | Copperbelt |
| 3 | `ndola-city-council` | Ndola City Council | NCC | Copperbelt |
| 4 | `kabwe-municipal-council` | Kabwe Municipal Council | KMC | Central |
| 5 | `chingola-municipal-council` | Chingola Municipal Council | CGMC | Copperbelt |
| 6 | `mufulira-municipal-council` | Mufulira Municipal Council | MFMC | Copperbelt |
| 7 | `livingstone-city-council` | Livingstone City Council | LVCC | Southern |
| 8 | `luanshya-municipal-council` | Luanshya Municipal Council | LSMC | Copperbelt |
| 9 | `chipata-municipal-council` | Chipata Municipal Council | CPMC | Eastern |
| 10 | `kasama-municipal-council` | Kasama Municipal Council | KSMC | Northern |
| 11 | `mazabuka-municipal-council` | Mazabuka Municipal Council | MZMC | Southern |
| 12 | `mongu-municipal-council` | Mongu Municipal Council | MGMC | Western |
| 13 | `choma-municipal-council` | Choma Municipal Council | CMC | Southern |
| 14 | `solwezi-municipal-council` | Solwezi Municipal Council | SWMC | North-Western |
| 15 | `mansa-municipal-council` | Mansa Municipal Council | MSMC | Luapula |
| 16 | `kafue-municipal-council` | Kafue Municipal Council | KFMC | Lusaka |
| 17 | `kalulushi-municipal-council` | Kalulushi Municipal Council | KLMC | Copperbelt |
| 18 | `petauke-municipal-council` | Petauke Municipal Council | PTMC | Eastern |
| 19 | `mpika-municipal-council` | Mpika Municipal Council | MPMC | Muchinga |
| 20 | `kapiri-mposhi-municipal-council` | Kapiri Mposhi Municipal Council | KPMC | Central |

### South Africa — Top 20 Biggest Municipalities

| # | Folder Name | Display Name | Code | Province |
|---|------------|-------------|------|----------|
| 1 | `city-of-johannesburg` | City of Johannesburg | COJ | Gauteng |
| 2 | `city-of-cape-town` | City of Cape Town | CCT | Western Cape |
| 3 | `ethekwini-municipality` | eThekwini Municipality | ETH | KwaZulu-Natal |
| 4 | `city-of-tshwane` | City of Tshwane | COT | Gauteng |
| 5 | `nelson-mandela-bay-municipality` | Nelson Mandela Bay Municipality | NMB | Eastern Cape |
| 6 | `mangaung-metropolitan-municipality` | Mangaung Metropolitan Municipality | MMM | Free State |
| 7 | `ekurhuleni-metropolitan-municipality` | Ekurhuleni Metropolitan Municipality | EKU | Gauteng |
| 8 | `buffalo-city-metropolitan-municipality` | Buffalo City Metropolitan Municipality | BCM | Eastern Cape |
| 9 | `msunduzi-local-municipality` | Msunduzi Local Municipality | MSU | KwaZulu-Natal |
| 10 | `polokwane-local-municipality` | Polokwane Local Municipality | POL | Limpopo |
| 11 | `rustenburg-local-municipality` | Rustenburg Local Municipality | RLM | North West |
| 12 | `emalahleni-local-municipality` | Emalahleni Local Municipality | EML | Mpumalanga |
| 13 | `george-local-municipality` | George Local Municipality | GLM | Western Cape |
| 14 | `drakenstein-local-municipality` | Drakenstein Local Municipality | DLM | Western Cape |
| 15 | `stellenbosch-local-municipality` | Stellenbosch Local Municipality | SLM | Western Cape |
| 16 | `mogale-city-local-municipality` | Mogale City Local Municipality | MCLM | Gauteng |
| 17 | `matlosana-local-municipality` | Matlosana Local Municipality | MLM | North West |
| 18 | `sol-plaatje-local-municipality` | Sol Plaatje Local Municipality | SPL | Northern Cape |
| 19 | `mbombela-local-municipality` | Mbombela Local Municipality | MBM | Mpumalanga |
| 20 | `steve-tshwete-local-municipality` | Steve Tshwete Local Municipality | STL | Mpumalanga |

---

## Test Login Credentials

Visit `/test-login` to use the interactive test login page.

Select a **Country → Council → User** from the dropdowns, or use Quick Login buttons.

**Roles available per council:**

| Role | Access Level | Sample Username |
|------|-------------|-----------------|
| `TownClerk` | Full admin | `townclerk1@lusaka.council.zm` |
| `DirectorOfFinance` | Finance full | `directoroffinance2@lusaka.council.zm` |
| `BudgetOfficer` | Budget management | `budgetofficer3@lusaka.council.zm` |
| `ProcurementOfficer` | Procurement | `procurementofficer4@lusaka.council.zm` |
| `AssetManager` | Asset management | `assetmanager5@lusaka.council.zm` |
| `PropertyManager` | Property management | `propertymanager6@lusaka.council.zm` |
| `LandUseOfficer` | Land use & planning | `landuseofficer7@lusaka.council.zm` |
| `PermitsOfficer` | Permits & licensing | `permitsofficer8@lusaka.council.zm` |
| `Councillor` | Elected member | `councillor9@lusaka.council.zm` |
| `Auditor` | Read-only audit | `auditor10@lusaka.council.zm` |

**Password:** any value is accepted in demo/mock mode.

---

## How to Add a New Municipality

### Step 1 — Create the sample-data directory

```
wwwroot/sample-data/{country}/{folder-name}/
```

Example: `wwwroot/sample-data/zambia/nakonde-municipal-council/`

**Naming convention:** lowercase, words separated by hyphens, suffix by entity type:
- City: `{city-name}-city-council`
- Municipal: `{town-name}-municipal-council`
- Metropolitan: `{name}-metropolitan-municipality`
- Local: `{name}-local-municipality`

### Step 2 — Create `authentication.json`

Copy the pattern from an existing council and update these fields:
- `tenantId` → must exactly match the folder name
- `councilName` → human-readable name
- `username` → `{role}{number}@{city}.council.{countryCode}`
- `employeeId` → `EMP-{ABBREV}-{0001-0030}`

**Country codes:** `zm` (Zambia), `za` (South Africa), `ke` (Kenya), etc.

```json
[
  {
    "username": "townclerk1@nakonde.council.zm",
    "role": "TownClerk",
    "tenantId": "nakonde-municipal-council",
    "councilName": "Nakonde Municipal Council",
    "department": "Administration",
    "employeeId": "EMP-NKMC-0001",
    "isActive": true
  }
]
```

Generate 30 users (3 cycles × 10 roles) with sequential employee numbers.

### Step 3 — Copy and adapt the other 19 JSON files

Copy from an existing council of the same country (e.g. Lusaka for Zambia) and do a  
global search-and-replace:

| Old value | New value |
|-----------|-----------|
| `Lusaka City Council` | `Nakonde Municipal Council` |
| `lusaka-city-council` | `nakonde-municipal-council` |
| `-LCC-` | `-NKMC-` |
| `EMP-LCC-` | `EMP-NKMC-` |
| `Lusaka` (city in addresses) | `Nakonde` |

For **South Africa** councils, also replace:
- `+260` → `+27` (phone prefix)
- `Zanaco Bank` → `ABSA Bank`
- `ZRA` → `SARS`
- `.council.zm` → `.municipality.za`
- `TPIN` → `TIN`
- `NHIMA` → `UIF`

### Step 4 — Register the council in `Models/Council.cs`

Add an entry to `SampleCouncils.GetSampleCouncils()`:

```csharp
new Council
{
    TenantId = Guid.Parse("10000000-0000-0000-0000-000000000021"),  // next available ID
    Name = "Nakonde Municipal Council",
    Code = "NKMC",
    Country = "Zambia",
    Province = "Northern",
    District = "Nakonde",
    Type = CouncilType.Municipal,
    IsActive = true
},
```

**TenantId ranges:**
- `10000000-0000-0000-0000-0000000000xx` → Zambia
- `20000000-0000-0000-0000-0000000000xx` → South Africa
- `30000000-0000-0000-0000-0000000000xx` → Nigeria
- `40000000-0000-0000-0000-0000000000xx` → Other countries

### Step 5 — Register the council in `Pages/TestLogin.razor`

Add the display name to the relevant country list in `councilsByCountry`:

```csharp
["Zambia"] = new() {
    "Lusaka City Council",
    // ... existing entries ...
    "Nakonde Municipal Council"   // ← add here
},
```

### Step 6 — Build and verify

```bash
dotnet build src/WebApps/CouncilWebApp/CouncilWebApp.csproj --configuration Release
```

Then navigate to `/test-login`, select the country and new council, and confirm login works.

---

## Sample Data Files Reference

| File | Description | Key fields with council name |
|------|-------------|------------------------------|
| `authentication.json` | Demo users (30 per council) | `tenantId`, `councilName`, `username`, `employeeId` |
| `banking-reconciliation.json` | Bank reconciliation records | `reconciledBy`, `approvedBy` |
| `beneficiary.json` | Social programme beneficiaries | `address`, `ward`, `notes` |
| `campaign-management.json` | Public campaigns/initiatives | `description`, `notes` |
| `decision-engine.json` | AI decision rules | `applicableArea`, `notes` |
| `financial-decision.json` | Budget/financial approvals | `description`, `notes` |
| `grant-utilization.json` | Grant spending records | `grantName`, `notes` |
| `imprest-retirement.json` | Petty cash retirements | `submittedBy`, `notes` |
| `lease-agreement.json` | Property lease contracts | `lessor`, `notes` |
| `market-facility.json` | Market stall management | `location`, `notes` |
| `procurement-decision.json` | Tender/procurement records | `description`, `notes` |
| `property-exemption.json` | Rate exemption records | `reason`, `notes` |
| `receipt-book.json` | Revenue receipt records | `receivedBy`, `notes` |
| `risk-assessment.json` | Risk register entries | `description`, `notes` |
| `rules-engine.json` | Business rules | `applicableArea`, `notes` |
| `statutory-obligation.json` | Regulatory payments (NHIMA, NAPSA, etc.) | `notes` |
| `task-management.json` | Council task tracker | `description`, `notes` |
| `ward-development.json` | Ward project tracker | `wardName`, `notes` |
| `workflow.json` | Approval workflow instances | `description` |
| `zra-tax-compliance.json` | Tax compliance records (ZRA/SARS) | `paymentReference`, `notes` |

---

## Data Loading Architecture

When a user logs in through the **Login** or **Test Login** page, the application stores three  
key claims on the authentication principal:

| Claim | Example value | Used by |
|-------|---------------|---------|
| `CouncilName` | `"Lusaka City Council"` | `CouncilDataLoader` — converts to folder name |
| `Country` | `"Zambia"` | `CouncilDataLoader` — converts to country folder |
| `TenantId` | `"10000000-0000-0000-0000-000000000001"` | Permission checks, API requests |

**`CouncilDataLoader.LoadDataAsync<T>(fileName)`** resolves the file path as follows:

```
sample-data/{country-folder}/{council-folder}/{fileName}.json
```

where:
- `{country-folder}` = `country.ToLower().Replace(" ", "-")` — e.g. `"South Africa"` → `"south-africa"`
- `{council-folder}` = `councilName.ToLower().Replace(" ", "-")` — e.g. `"Lusaka City Council"` → `"lusaka-city-council"`

If no `Country` claim is present (legacy sessions), it falls back to the flat path:

```
sample-data/{council-folder}/{fileName}.json
```

This is implemented in `Services/CouncilDataLoader.cs` and the claims are set in  
`Services/MockAuthenticationStateProvider.cs`.

---

## Automated Generation

A Python helper script is available at `/tmp/generate_councils.py` (see repository history)  
which can bulk-generate all JSON files for a list of councils using the Lusaka template.

The script:
1. Creates the folder structure
2. Generates `authentication.json` with proper `tenantId` / `councilName`
3. Copies and adapts the other 19 files (text substitution)
4. Applies country-specific adaptations (phone prefix, bank names, tax authority)

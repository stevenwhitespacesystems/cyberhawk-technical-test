# Project Planning

## Initial Thoughts and Considerations

The project initially asked for the following entities: Turbines, Components and Inspections. I didn't feel this was adequate for considering the project's future scope. Additionally, as there were bonus points for using the map, I wanted to include latitudes and longitudes on some entities.

I decided upon the following model entities:
- Sites
- Equipment
- Component
- Inspections
- InspectedComponents

Sites represent the Wind Turbine Farms (or could represent any location that has a group of "equipment" to be inspected in future). Breaking this out means we could inspect multiple wind farms.

Equipment represents the equipment being inspected. This is essentially the wind turbine in this example, but calling it equipment means we can add a type to it and inspect different equipment that would be suitable for drone inspections.

Component is fundamentally what was requested—it's a part of the Wind Turbine (Equipment) that can be inspected.

Inspection represents multiple Inspected Components. The reasoning behind having an Inspection table that groups inspected components is that you might want to inspect only some components of equipment. This allows for that flexibility. Upon reflection before submitting, I would likely not have made Inspections to Equipment a one-to-one relationship, but rather allowed an Inspection to have multiple pieces of equipment, which in turn would have multiple inspected component records. This approach allows for easier reporting and grouping; for example, if senior management want to see all equipment that doesn't reach an average grade threshold, they can and then can schedule an inspection.

InspectedComponent represents the entity to capture the grade given to a component that is being inspected.

I wanted to ensure that I utilised Mapbox to represent some Wind Turbine farms, so I've set up some sites and equipment already with latitudes and longitudes. The interactive map can display these sites and equipment with a small Equipment popup box.
## Entity Design Evolution

### Initial Requirements
The initial project requirements called for three basic entities:
- Turbines
- Components
- Inspections

### Enhanced Entity Model
To improve scalability and future-proofing, the model was expanded to include:

#### Sites
- Represents Wind Farms or any location with inspectable equipment
- Enables multi-site management
- Contains geographical coordinates for mapping

#### Equipment
- Represents individual wind turbines (or other inspectable equipment)
- Includes type classification for future equipment types
- Contains geographical coordinates for precise location

#### Components
- Represents individual parts of equipment
- Linked to both Site and Equipment for hierarchical tracking

#### Inspections
- Groups related component inspections
- Tracks scheduling and completion dates
- Maintains average grade calculations

#### InspectedComponents
- Records individual component inspection results
- Tracks inspector assignments
- Maintains individual grade assessments

## Geographical Integration

### Interactive Mapping
- Implemented Mapbox GL for visualization
- Sites displayed with custom markers
- Equipment locations shown with detailed popups

### Data Structure
- GeoJSON implementation for mapping data
- Custom DTOs for geographical data handling

## Data Seeding
The project includes comprehensive seed data for testing:
- Multiple wind farm sites across the UK
- Equipment with accurate geographical coordinates
- Sample inspection data with realistic grades
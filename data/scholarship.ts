import type { CountyMap } from '@/types';

// Indiana Choice Scholarship Calculator Data
// HEA 1001-2025 schedules income-limit removal beginning June 29, 2026
// Awards are approximately 90% of the school district's per-pupil public funding amount

// Funding tiers (approximate 2026-27 values)
export const FUNDING_TIERS = {
  high: 8200,       // High-funding suburban districts
  'mid-high': 7800, // Urban districts
  mid: 7400,        // Mid-size/suburban districts
  rural: 6800,      // Rural counties (estimate)
} as const;

// Scholarship = 90% of per-pupil funding
export const SCHOLARSHIP_PCT = 0.9;

// Statewide award range for context display
export const AWARD_RANGE = { min: 6100, max: 7400 };

// All 92 Indiana counties with school corporations
// Per-pupil funding is estimated based on district size and reported ADM funding
export const INDIANA_COUNTIES: CountyMap = {
  Adams: {
    name: 'Adams',
    corporations: [
      { name: 'South Adams Schools', tier: 'rural', perPupil: 6800 },
      { name: 'North Adams Community Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Allen: {
    name: 'Allen',
    corporations: [
      { name: 'Fort Wayne Community Schools', tier: 'mid-high', perPupil: 7800 },
      { name: 'East Allen County Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Northwest Allen County Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Southwest Allen County Schools', tier: 'mid', perPupil: 7400 },
    ],
  },
  Bartholomew: {
    name: 'Bartholomew',
    corporations: [
      { name: 'Bartholomew Consolidated School Corp (Columbus)', tier: 'mid', perPupil: 7400 },
    ],
  },
  Benton: {
    name: 'Benton',
    corporations: [
      { name: 'Benton Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Blackford: {
    name: 'Blackford',
    corporations: [
      { name: 'Blackford County Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Boone: {
    name: 'Boone',
    corporations: [
      { name: 'Western Boone County Community Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Zionsville Community Schools', tier: 'high', perPupil: 8200 },
    ],
  },
  Brown: {
    name: 'Brown',
    corporations: [
      { name: 'Brown County School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Carroll: {
    name: 'Carroll',
    corporations: [
      { name: 'Carroll Consolidated School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Delphi Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Cass: {
    name: 'Cass',
    corporations: [
      { name: 'Logansport Community School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Pioneer Regional School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Clark: {
    name: 'Clark',
    corporations: [
      { name: 'Clarksville Community School Corp', tier: 'mid', perPupil: 7400 },
      { name: 'Greater Clark County Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Silver Creek School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Clay: {
    name: 'Clay',
    corporations: [
      { name: 'Clay Community Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Clinton: {
    name: 'Clinton',
    corporations: [
      { name: 'Clinton Prairie School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Frankfort Community Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Crawford: {
    name: 'Crawford',
    corporations: [
      { name: 'Crawford County Consolidated School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Daviess: {
    name: 'Daviess',
    corporations: [
      { name: 'Daviess County Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Dearborn: {
    name: 'Dearborn',
    corporations: [
      { name: 'Lawrenceburg Community School Corp', tier: 'mid', perPupil: 7400 },
      { name: 'South Dearborn Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Decatur: {
    name: 'Decatur',
    corporations: [
      { name: 'Decatur County Community Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  DeKalb: {
    name: 'DeKalb',
    corporations: [
      { name: 'DeKalb County Central United School District', tier: 'rural', perPupil: 6800 },
      { name: 'DeKalb County Eastern Community Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Delaware: {
    name: 'Delaware',
    corporations: [
      { name: 'Muncie Community Schools', tier: 'mid-high', perPupil: 7800 },
      { name: 'Delaware Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Dubois: {
    name: 'Dubois',
    corporations: [
      { name: 'Dubois County Schools', tier: 'rural', perPupil: 6800 },
      { name: 'Northeast Dubois County School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Elkhart: {
    name: 'Elkhart',
    corporations: [
      { name: 'Elkhart Community Schools', tier: 'mid-high', perPupil: 7800 },
      { name: 'Goshen Community Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Baugo Community Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Fayette: {
    name: 'Fayette',
    corporations: [
      { name: 'Fayette County School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Floyd: {
    name: 'Floyd',
    corporations: [
      { name: 'New Albany-Floyd County Consolidated Schools', tier: 'mid', perPupil: 7400 },
    ],
  },
  Fountain: {
    name: 'Fountain',
    corporations: [
      { name: 'Fountain County Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Franklin: {
    name: 'Franklin',
    corporations: [
      { name: 'Franklin County Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Fulton: {
    name: 'Fulton',
    corporations: [
      { name: 'Rochester Community School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Caston School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Gibson: {
    name: 'Gibson',
    corporations: [
      { name: 'Gibson County Schools', tier: 'rural', perPupil: 6800 },
      { name: 'South Gibson School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Grant: {
    name: 'Grant',
    corporations: [
      { name: 'Marion Community Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Eastbrook Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Greene: {
    name: 'Greene',
    corporations: [
      { name: 'Linton-Stockton School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Shakamak Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Hamilton: {
    name: 'Hamilton',
    corporations: [
      { name: 'Carmel Clay Schools', tier: 'high', perPupil: 8200 },
      { name: 'Hamilton Southeastern Schools', tier: 'high', perPupil: 8200 },
      { name: 'Westfield-Washington Schools', tier: 'high', perPupil: 8200 },
      { name: 'Noblesville Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Hamilton Heights School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Hancock: {
    name: 'Hancock',
    corporations: [
      { name: 'Greenfield-Central Community Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Mt Vernon Community School Corp (Hancock)', tier: 'mid', perPupil: 7400 },
    ],
  },
  Harrison: {
    name: 'Harrison',
    corporations: [
      { name: 'Corydon Consolidated School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'North Harrison Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Hendricks: {
    name: 'Hendricks',
    corporations: [
      { name: 'Avon Community School Corp', tier: 'high', perPupil: 8200 },
      { name: 'Brownsburg Community School Corp', tier: 'high', perPupil: 8200 },
      { name: 'Plainfield Community School Corp', tier: 'high', perPupil: 8200 },
      { name: 'Danville Community School Corp', tier: 'mid', perPupil: 7400 },
    ],
  },
  Henry: {
    name: 'Henry',
    corporations: [
      { name: 'New Castle Community School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'South Henry School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Howard: {
    name: 'Howard',
    corporations: [
      { name: 'Kokomo-Center Township Consolidated School Corp', tier: 'mid', perPupil: 7400 },
      { name: 'Northwestern School Corp (Howard)', tier: 'rural', perPupil: 6800 },
    ],
  },
  Huntington: {
    name: 'Huntington',
    corporations: [
      { name: 'Huntington County Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Jackson: {
    name: 'Jackson',
    corporations: [
      { name: 'Seymour Community Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Brownstown Central Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Jasper: {
    name: 'Jasper',
    corporations: [
      { name: 'Kankakee Valley School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Rensselaer Central School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Jay: {
    name: 'Jay',
    corporations: [
      { name: 'Jay School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Jefferson: {
    name: 'Jefferson',
    corporations: [
      { name: 'Madison Consolidated Schools', tier: 'mid', perPupil: 7400 },
    ],
  },
  Jennings: {
    name: 'Jennings',
    corporations: [
      { name: 'Jennings County Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Johnson: {
    name: 'Johnson',
    corporations: [
      { name: 'Center Grove Community School Corp', tier: 'high', perPupil: 8200 },
      { name: 'Clark-Pleasant Community School Corp', tier: 'mid', perPupil: 7400 },
      { name: 'Franklin Community School Corp', tier: 'mid', perPupil: 7400 },
    ],
  },
  Knox: {
    name: 'Knox',
    corporations: [
      { name: 'South Knox School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Vincennes Community School Corp', tier: 'mid', perPupil: 7400 },
    ],
  },
  Kosciusko: {
    name: 'Kosciusko',
    corporations: [
      { name: 'Warsaw Community Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Wawasee Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  LaGrange: {
    name: 'LaGrange',
    corporations: [
      { name: 'Lakeland School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Prairie Heights Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Lake: {
    name: 'Lake',
    corporations: [
      { name: 'Hammond School City', tier: 'mid-high', perPupil: 7800 },
      { name: 'Gary Community School Corp', tier: 'mid-high', perPupil: 7800 },
      { name: 'Lake Central School Corp', tier: 'mid', perPupil: 7400 },
      { name: 'Merrillville Community School Corp', tier: 'mid', perPupil: 7400 },
    ],
  },
  LaPorte: {
    name: 'LaPorte',
    corporations: [
      { name: 'LaPorte Community School Corp', tier: 'mid', perPupil: 7400 },
      { name: 'Michigan City Area Schools', tier: 'mid', perPupil: 7400 },
    ],
  },
  Lawrence: {
    name: 'Lawrence',
    corporations: [
      { name: 'Mitchell Community Schools', tier: 'rural', perPupil: 6800 },
      { name: 'North Lawrence Community Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Madison: {
    name: 'Madison',
    corporations: [
      { name: 'Anderson Community School Corp', tier: 'mid-high', perPupil: 7800 },
      { name: 'Pendleton Heights Community School Corp', tier: 'mid', perPupil: 7400 },
    ],
  },
  Marion: {
    name: 'Marion',
    corporations: [
      { name: 'Indianapolis Public Schools (IPS)', tier: 'mid-high', perPupil: 7800 },
      { name: 'Lawrence Township Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Washington Township Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Perry Township Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Wayne Township Schools (MSD)', tier: 'mid', perPupil: 7400 },
      { name: 'Pike Township Schools (MSD)', tier: 'mid', perPupil: 7400 },
      { name: 'Warren Township Schools (MSD)', tier: 'mid', perPupil: 7400 },
      { name: 'Franklin Township Community School Corp', tier: 'mid', perPupil: 7400 },
    ],
  },
  Marshall: {
    name: 'Marshall',
    corporations: [
      { name: 'Plymouth Community School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Triton School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Martin: {
    name: 'Martin',
    corporations: [
      { name: 'Loogootee Community School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Shoals Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Miami: {
    name: 'Miami',
    corporations: [
      { name: 'Northwestern School Corp (Miami)', tier: 'rural', perPupil: 6800 },
      { name: 'Peru Community Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Monroe: {
    name: 'Monroe',
    corporations: [
      { name: 'Monroe County Community School Corp (Bloomington)', tier: 'mid', perPupil: 7400 },
    ],
  },
  Montgomery: {
    name: 'Montgomery',
    corporations: [
      { name: 'Crawfordsville Community School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'North Montgomery Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Morgan: {
    name: 'Morgan',
    corporations: [
      { name: 'Martinsville Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Mooresville Consolidated School Corp', tier: 'mid', perPupil: 7400 },
    ],
  },
  Newton: {
    name: 'Newton',
    corporations: [
      { name: 'South Newton School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'North Newton School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Noble: {
    name: 'Noble',
    corporations: [
      { name: 'East Noble School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'West Noble School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Ohio: {
    name: 'Ohio',
    corporations: [
      { name: 'Ohio County Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Orange: {
    name: 'Orange',
    corporations: [
      { name: 'Orleans Community Schools', tier: 'rural', perPupil: 6800 },
      { name: 'Paoli Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Owen: {
    name: 'Owen',
    corporations: [
      { name: 'Spencer-Owen Community Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Parke: {
    name: 'Parke',
    corporations: [
      { name: 'Turkey Run Community School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Rockville Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Perry: {
    name: 'Perry',
    corporations: [
      { name: 'Tell City-Troy Township School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Pike: {
    name: 'Pike',
    corporations: [
      { name: 'Pike County School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Porter: {
    name: 'Porter',
    corporations: [
      { name: 'Portage Township Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Valparaiso Community Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Duneland School Corp', tier: 'mid', perPupil: 7400 },
    ],
  },
  Posey: {
    name: 'Posey',
    corporations: [
      { name: 'Mount Vernon Community School Corp (Posey)', tier: 'rural', perPupil: 6800 },
      { name: 'North Posey County Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Pulaski: {
    name: 'Pulaski',
    corporations: [
      { name: 'Winamac Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Putnam: {
    name: 'Putnam',
    corporations: [
      { name: 'Greencastle Community School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'South Putnam Community Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Randolph: {
    name: 'Randolph',
    corporations: [
      { name: 'Monroe Central School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Randolph Eastern School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Ripley: {
    name: 'Ripley',
    corporations: [
      { name: 'South Ripley Community School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Batesville Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Rush: {
    name: 'Rush',
    corporations: [
      { name: 'Rush County Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  'St. Joseph': {
    name: 'St. Joseph',
    corporations: [
      { name: 'South Bend Community School Corp', tier: 'mid-high', perPupil: 7800 },
      { name: 'Penn-Harris-Madison School Corp', tier: 'mid', perPupil: 7400 },
      { name: 'Mishawaka School City', tier: 'mid', perPupil: 7400 },
    ],
  },
  Scott: {
    name: 'Scott',
    corporations: [
      { name: 'Scott County School District 1', tier: 'rural', perPupil: 6800 },
      { name: 'Scott County School District 2', tier: 'rural', perPupil: 6800 },
    ],
  },
  Shelby: {
    name: 'Shelby',
    corporations: [
      { name: 'Shelbyville Central Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Southwestern Consolidated School Corp (Shelby)', tier: 'rural', perPupil: 6800 },
    ],
  },
  Spencer: {
    name: 'Spencer',
    corporations: [
      { name: 'North Spencer County School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'South Spencer County School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Starke: {
    name: 'Starke',
    corporations: [
      { name: 'Knox Community School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Oregon-Davis School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Steuben: {
    name: 'Steuben',
    corporations: [
      { name: 'Angola Community School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Fremont Community Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Sullivan: {
    name: 'Sullivan',
    corporations: [
      { name: 'Northeast School Corp (Sullivan)', tier: 'rural', perPupil: 6800 },
      { name: 'Sullivan County Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Switzerland: {
    name: 'Switzerland',
    corporations: [
      { name: 'Switzerland County School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Tippecanoe: {
    name: 'Tippecanoe',
    corporations: [
      { name: 'Lafayette School Corp', tier: 'mid-high', perPupil: 7800 },
      { name: 'Tippecanoe School Corp', tier: 'mid', perPupil: 7400 },
      { name: 'West Lafayette Community School Corp', tier: 'mid', perPupil: 7400 },
    ],
  },
  Tipton: {
    name: 'Tipton',
    corporations: [
      { name: 'Tipton Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Union: {
    name: 'Union',
    corporations: [
      { name: 'Union County-College Corner Joint School District', tier: 'rural', perPupil: 6800 },
    ],
  },
  Vanderburgh: {
    name: 'Vanderburgh',
    corporations: [
      { name: 'Evansville Vanderburgh School Corp', tier: 'mid-high', perPupil: 7800 },
    ],
  },
  Vermillion: {
    name: 'Vermillion',
    corporations: [
      { name: 'South Vermillion Community School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'North Vermillion Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Vigo: {
    name: 'Vigo',
    corporations: [
      { name: 'Vigo County School Corp (Terre Haute)', tier: 'mid-high', perPupil: 7800 },
    ],
  },
  Wabash: {
    name: 'Wabash',
    corporations: [
      { name: 'Wabash City Schools', tier: 'rural', perPupil: 6800 },
      { name: 'MSD Wabash County Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Warren: {
    name: 'Warren',
    corporations: [
      { name: 'Benton Central Jr-Sr High School', tier: 'rural', perPupil: 6800 },
    ],
  },
  Warrick: {
    name: 'Warrick',
    corporations: [
      { name: 'Warrick County School Corp', tier: 'mid', perPupil: 7400 },
    ],
  },
  Washington: {
    name: 'Washington',
    corporations: [
      { name: 'Salem Community Schools', tier: 'rural', perPupil: 6800 },
      { name: 'West Washington School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Wayne: {
    name: 'Wayne',
    corporations: [
      { name: 'Richmond Community Schools', tier: 'mid', perPupil: 7400 },
      { name: 'Centerville-Abington Community Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  Wells: {
    name: 'Wells',
    corporations: [
      { name: 'Bluffton-Harrison Metropolitan School District', tier: 'rural', perPupil: 6800 },
      { name: 'Southern Wells Community Schools', tier: 'rural', perPupil: 6800 },
    ],
  },
  White: {
    name: 'White',
    corporations: [
      { name: 'Frontier School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Twin Lakes School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
  Whitley: {
    name: 'Whitley',
    corporations: [
      { name: 'Columbia City Joint Unified School Corp', tier: 'rural', perPupil: 6800 },
      { name: 'Whitko Community School Corp', tier: 'rural', perPupil: 6800 },
    ],
  },
};

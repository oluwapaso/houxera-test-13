import { ComponentBlock } from "@/components/registry";
import { MenuProps, OptionsType } from "@/components/types";

export const Menus: MenuProps[] = [
    {
        title: "Search",
        submenu: true,
        slug: "/endpoints/search",
        submenuItems: [{
            title: "Add New Lead",
            link: "/endpoints/search/property-search"
        }]
    },
    {
        title: "Replication",
        submenu: true,
        slug: "/endpoints/replication",
        submenuItems: [
            {
                title: "Data Replication",
                link: "/endpoints/replication/property-replication"
            },
            {
                title: "Fetch ",
                link: "/endpoints/replication/update-contact-info"
            }]
    },  
    {
        title: "Account",
        submenu: true,
        slug: "/endpoints/account",
        submenuItems: [{
            title: "Get Account Info",
            link: "/endpoints/account/get-account-info"
        }]
    },
]

export const YesOrNo: OptionsType[] = [
  { name: 'Yes', code: 'Yes' },
  { name: 'No', code: 'No' }
] 

export const PropertyTypes: OptionsType[] = [
  { name: 'Residential', code: 'Residential' },
  { name: 'Multi-Unit', code: 'Multi-Unit' },
  { name: 'Property-Unit', code: 'Property-Unit' },
  { name: 'Commercial', code: 'Commercial' } ,
  { name: 'Land', code: 'Land' } ,
  { name: 'Rental', code: 'Rental' } ,
  { name: 'Farm/Ranch', code: 'Farm/Ranch' }
]

export const NonResidentialProperty: any[] = ['Office Space','Shop/Retail Space', 'Warehouse','Hotel','Residential Plot',
  'Commercial Plot', 'Agricultural Land','Mixed-Use Plot','Farmland','Plantation', 'Poultry/Fish Farm','All Commercial',
  'All Land', 'All Farm/Ranch'] 


export const PropertySubTypes: OptionsType[] = [
  { group:"Residential", name: 'Detached Duplex', code: 'Detached Duplex', descriptions: 'Standalone, multi-level homes, often luxurious, with private compounds.' }, 
  { group:"Residential", name: 'Semi-Detached Duplex', code: 'Semi-Detached Duplex', descriptions: "Two attached homes sharing a common wall, common in estates." }, 
  { group:"Residential", name: 'Terrace House/Duplex', code: 'Terrace House/Duplex', descriptions: "Row houses with shared walls, typically in urban estates." }, 
  { group:"Residential", name: 'Flat', code: 'Flat', descriptions: "Individual units in multi-unit buildings, including standard, luxury, or furnished flats for short-term rentals." }, 
  { group:"Residential", name: 'Apartment', code: 'Apartment', descriptions: "Individual units in multi-unit buildings, including standard, luxury, or furnished flats for short-term rentals." }, 
  { group:"Residential", name: 'Bungalow', code: 'Bungalow', descriptions: "Single-story homes, often detached, with or without a boys' quarters(BQ)" }, 
  { group:"Residential", name: 'Maisonette', code: 'Maisonette', descriptions: "Multi-level apartments of houses within a larger building, often with private entrances." }, 
  { group:"Residential", name: "Boys' Quarters (BQ)", code: "Boys' Quarters (BQ)", descriptions: "Smaller attached or detached units for staff or guests, often listed as an add-on to main properties." },  
  
  { group:"Multi-Unit", name: 'Duplex', code: 'Duplex', descriptions: "Gated communities with multiple residential units (duplexes, terraces, or flats)" }, 
  { group:"Multi-Unit", name: 'Triplex', code: 'Triplex', descriptions: "Gated communities with multiple residential units (duplexes, terraces, or flats)" }, 
  { group:"Multi-Unit", name: 'Quadplex', code: 'Quadplex', descriptions: "Gated communities with multiple residential units (duplexes, terraces, or flats)" }, 
  { group:"Multi-Unit", name: 'Block of Flats', code: 'Block of Flats', descriptions: "Multi-unit residential buildings with several apartmets, typically for investment or rental." }, 
  { group:"Multi-Unit", name: 'Apartment Building', code: 'Apartment Building', descriptions: "Units in multi-story buildings, ranging from standard to fully furnished luxury apartments." },
  { group:"Multi-Unit", name: 'Tenement Building', code: 'Tenement Building', descriptions: "Older, multi-unit buildings, often in urban areas, used for low- to middle- income rentals." }, 
  { group:"Multi-Unit", name: 'Estate Housing', code: 'Estate Housing', descriptions: "Gated communities with multiple residential units (duplexes, terraces, or flats)" }, 

  { group:"Property-Unit",  name: 'Detached Duplex', code: 'Detached Duplex', descriptions: 'Standalone, multi-level homes, often luxurious, with private compounds.' },
  { group:"Property-Unit", name: 'Semi-Detached Duplex', code: 'Semi-Detached Duplex', descriptions: "Two attached homes sharing a common wall, common in estates." }, 
  { group:"Property-Unit", name: 'Terrace House/Duplex', code: 'Terrace House/Duplex', descriptions: "Row houses with shared walls, typically in urban estates." }, 
  { group:"Property-Unit", name: 'Flat', code: 'Flat', descriptions: "Individual units in multi-unit buildings, including standard, luxury, or furnished flats for short-term rentals." }, 
  { group:"Property-Unit", name: 'Apartment', code: 'Apartment', descriptions: "Individual units in multi-unit buildings, including standard, luxury, or furnished flats for short-term rentals." }, 
  { group:"Property-Unit", name: 'Bungalow', code: 'Bungalow', descriptions: "Single-story homes, often detached, with or without a boys' quarters(BQ)" }, 
  { group:"Property-Unit", name: 'Maisonette', code: 'Maisonette', descriptions: "Multi-level apartments of houses within a larger building, often with private entrances." }, 
  { group:"Property-Unit", name: "Boys' Quarters (BQ)", code: "Boys' Quarters (BQ)", descriptions: "Smaller attached or detached units for staff or guests, often listed as an add-on to main properties." },  
  { group:"Property-Unit", name: 'Office Space', code: 'Office Space', descriptions: "Spaces in commercial buildings for professional use, often measured in square meters (e.g 82 sqm office in jabbi)." }, 
  { group:"Property-Unit", name: 'Shop/Retail Space', code: 'Shop/Retail Space', descriptions: "Units in shopping centers or standalone shops for retail businesses." }, 
  { group:"Property-Unit", name: 'Warehouse', code: 'Warehouse', descriptions: "Large spaces for storage or individual use, common in industrial areas." }, 
  { group:"Property-Unit", name: 'Hotel', code: 'Hotel', descriptions: "Properties designed for hospitality, includig boutique hotels or large complexes." }, 
  { group:"Property-Unit", name: 'Mixed-Use Building', code: 'Mixed-Use Building', descriptions: "Properties combining commercial(e.g., shops) and residential spaces." }, 

  { group:"Commercial", name: 'Office Space', code: 'Office Space', descriptions: "Spaces in commercial buildings for professional use, often measured in square meters (e.g 82 sqm office in jabbi)." }, 
  { group:"Commercial", name: 'Shop/Retail Space', code: 'Shop/Retail Space', descriptions: "Units in shopping centers or standalone shops for retail businesses." }, 
  { group:"Commercial", name: 'Warehouse', code: 'Warehouse', descriptions: "Large spaces for storage or individual use, common in industrial areas." }, 
  { group:"Commercial", name: 'Hotel', code: 'Hotel', descriptions: "Properties designed for hospitality, includig boutique hotels or large complexes." }, 
  { group:"Commercial", name: 'Mixed-Use Building', code: 'Mixed-Use Building', descriptions: "Properties combining commercial(e.g., shops) and residential spaces." }, 

  { group:"Land", name: 'Residential Plot', code: 'Residential Plot', descriptions: "Land zoned for single-family or multi-family homes, often in estates or developing areas." }, 
  { group:"Land", name: 'Commercial Plot', code: 'Commercial Plot', descriptions: "Land for offices buildings, shops, or other business purposes." },  
  { group:"Land", name: 'Agricultural Land', code: 'Agricultural Land', descriptions: "Plots for farming or agribusiness, common in rural or peri-urban areas." }, 
  { group:"Land", name: 'Mixed-Use Plot', code: 'Mixed-Use Plot', descriptions: "Land zoned for combined residential and commercial development." }, 

  { group:"Rental", name: 'Detached Duplex', code: 'Detached Duplex', descriptions: "High-end rental homes, often with amenities like ACs, inverters, or central generators." }, 
  { group:"Rental", name: 'Semi-Detached Duplex', code: 'Semi-Detached Duplex', descriptions: "High-end rental homes, often with amenities like ACs, inverters, or central generators." },
  { group:"Rental", name: 'Terrace House/Duplex', code: 'Terrace House/Duplex', descriptions: "High-end rental homes, often with amenities like ACs, inverters, or central generators." },
  { group:"Rental", name: 'Flat', code: 'Flat', descriptions: "Units in multi-story buildings, ranging from standard to fully furnished luxury flats." }, 
  { group:"Rental", name: 'Apartment', code: 'Apartment', descriptions: "Units in multi-story buildings, ranging from standard to fully furnished luxury apartments." },
  { group:"Rental", name: 'Bungalow', code: 'Bungalow', descriptions: "Single-story rental homes, often detached, with or without a boys' quarters(BQ)" }, 
  { group:"Rental", name: 'Maisonette', code: 'Maisonette', descriptions: "Multi-level rental apartments of houses within a larger building, often with private entrances." }, 
  { group:"Rental", name: "Boys' Quarters", code: "Boys' Quarters", descriptions: "Smaller attached or detached units for rent, often listed as an add-on to main properties."},  
  { group:"Rental", name: 'Office Space', code: 'Office Space', descriptions: "Spaces in commercial buildings for professional use available for lease, often measured in square meters (e.g 82 sqm office in jabbi)." }, 
  { group:"Rental", name: 'Shop/Retail Space', code: 'Shop/Retail Space', descriptions: "Units in shopping centers or standalone shops for retail businesses available for lease." }, 
  { group:"Rental", name: 'Warehouse', code: 'Warehouse', descriptions: "Large spaces for storage or individual use, common in industrial areas available for lease." }, 
  { group:"Rental", name: 'Hotel', code: 'Hotel', descriptions: "Properties designed for hospitality, includig boutique hotels or large complexes available for lease." }, 
  { group:"Rental", name: 'Mixed-Use Building', code: 'Mixed-Use Building', descriptions: "Properties combining commercial(e.g., shops) and residential spaces available for lease." }, 
  { group:"Rental", name: 'Short-Let Apartment', code: 'Short-Let Apartment', descriptions: "Furnished apartments for short-term rentals, popular for tourists or business travelers." }, 

  { group:"Farm/Ranch", name: 'Farmland', code: 'Farmland', descriptions: "Large parcels for crop cultivation or livestock, often in rural areas." }, 
  { group:"Farm/Ranch", name: 'Plantation', code: 'Plantation', descriptions: "Land used for specific crops like cocoa, palm, or rubber, sometimes including infrastructures." }, 
  { group:"Farm/Ranch", name: 'Poultry/Fish Farm', code: 'Poultry/Fish Farm', descriptions: "Specialized land with facilities for poulry or aquaculture." }, 
] 

export const PriceFilters: OptionsType[] = [
  { name: '₦50k', code: '50000' },
  { name: '₦75k', code: '75000' },
  { name: '₦100k', code: '100000' },
  { name: '₦125k', code: '125000' },
  { name: '₦150k', code: '150000' },
  { name: '₦200k', code: '200000' },
  { name: '₦250k', code: '250000' },
  { name: '₦300k', code: '300000' },
  { name: '₦350k', code: '350000' },
  { name: '₦400k', code: '400000' },
  { name: '₦500k', code: '500000' },
  { name: '₦750k', code: '750000' },
  { name: '₦1M', code: '1000000' },
  { name: '₦1.5M', code: '1500000' },
  { name: '₦2M', code: '2000000' },
  { name: '₦3M', code: '3000000' },
  { name: '₦4M', code: '4000000' },
  { name: '₦5M', code: '5000000' },
  { name: '₦6M', code: '6000000' },
  { name: '₦7M', code: '7000000' },
  { name: '₦8M', code: '8000000' },
  { name: '₦9M', code: '9000000' },
  { name: '₦10M', code: '10000000' },
  { name: '₦20M', code: '20000000' },
  { name: '₦25M', code: '25000000' },
  { name: '₦30M', code: '30000000' },
  { name: '₦35M', code: '35000000' },
  { name: '₦40M', code: '40000000' },
  { name: '₦45M', code: '45000000' },
  { name: '₦50M', code: '50000000' },
  { name: '₦75M', code: '75000000' },
  { name: '₦100M', code: '100000000' },
  { name: '₦150M', code: '150000000' },
  { name: '₦200M', code: '200000000' },
  { name: '₦500M', code: '500000000' },
  { name: '₦1B', code: '1000000000' },
  { name: '₦1.5B', code: '1500000000' },
  { name: '₦2B', code: '2000000000' },
  { name: '₦2.5B', code: '2500000000' },
  { name: '₦3B', code: '3000000000' },
  { name: '₦3.5B', code: '3500000000' },
  { name: '₦4B', code: '4000000000' },
  { name: '₦4.5B', code: '4500000000' },
  { name: '₦5B', code: '5000000000' },
  { name: '₦10B', code: '10000000000' },
  { name: '₦20B', code: '20000000000' },
  { name: '₦30B', code: '30000000000' },
  { name: '₦40B', code: '40000000000' },
  { name: '₦50B', code: '50000000000' }
] 

export const BedsBathsFilters: OptionsType[] = [
  { name: 'Any', code: 'Any' },
  { name: '1', code: '1' }, 
  { name: '2', code: '2' }, 
  { name: '3', code: '3' }, 
  { name: '4', code: '4' },  
  { name: '5+', code: '5+' }
] 

export const StatusFilters: OptionsType[] = [
  { name: 'Active', code: 'Active' },
  { name: 'Sold', code: 'Sold' }, 
  { name: 'Rented', code: 'Rented' }, 
  { name: 'Leased', code: 'Leased' }
] 

export const InsightStatusFilters: OptionsType[] = [
  { name: 'Listed', code: 'Listed' },
  { name: 'Sold', code: 'Sold' }, 
  { name: 'Rented', code: 'Rented' }, 
  { name: 'Leased', code: 'Leased' }
] 

export const SalesCatFilters: OptionsType[] = [
  { name: 'For Sale', code: 'For Sale' },
  { name: 'For Rent', code: 'For Rent' }, 
  { name: 'For Lease', code: 'For Lease' }, 
  { name: 'Short-Let', code: 'Short-Let' }
] 

export const AmenitiesFilters: OptionsType[] = [
  { name: 'Pool', code: 'Pool' }, 
  { name: 'Basement', code: 'Basement' }, 
  { name: 'Wheelchair Ramp', code: 'Wheelchair Ramp' }, 
  { name: 'Waterfront', code: 'Waterfront' }, 
  { name: 'Gym', code: 'Gym' }, 
  { name: 'POP Ceilings', code: 'POP Ceilings' }
]  

export const ParkingFilters: string[] = [ 
  'Garage', 'Parking Space', 'Carports'
]

export const ViewFilters: string[] = [
  'Mountain', 'Water', 'City', 'Forest'// , 'None'
]

export const MediaFilters: string[] = [
  'Photos', 'Virtual Tour', 'Floor Plans'
]

export const SecurityFilters: string[] = [
  'Gated', 'Guarded Community'
]

export const TourTimeFilters: OptionsType[] = [
  // { name: '-- pick a time --', code: '' },
  { name: '7:00 AM', code: '7:00 AM' },
  { name: '7:30 AM', code: '7:30 AM' },
  { name: '8:00 AM', code: '8:00 AM' },
  { name: '8:30 AM', code: '8:30 AM' },
  { name: '9:00 AM', code: '9:00 AM' },
  { name: '9:30 AM', code: '9:30 AM' },
  { name: '10:00 AM', code: '10:00 AM' },
  { name: '10:30 AM', code: '10:30 AM' },
  { name: '11:00 AM', code: '11:00 AM' },
  { name: '11:30 AM', code: '11:30 AM' },
  { name: '12:00 PM', code: '12:00 PM' },
  { name: '12:30 PM', code: '12:30 PM' },
  { name: '1:00 PM', code: '1:00 PM' },
  { name: '1:30 PM', code: '1:30 PM' },
  { name: '2:00 PM', code: '2:00 PM' },
  { name: '2:30 PM', code: '2:30 PM' },
  { name: '3:00 PM', code: '3:00 PM' },
  { name: '3:30 PM', code: '3:30 PM' },
  { name: '4:00 PM', code: '4:00 PM' },
  { name: '4:30 PM', code: '4:30 PM' },
  { name: '5:00 PM', code: '5:00 PM' },
  { name: '5:30 PM', code: '5:30 PM' },
  { name: '6:00 PM', code: '6:00 PM' },
  { name: '6:30 PM', code: '6:30 PM' },
]


export const LivingAreaFilters = [
    { name: '10 sqm', code: '10' },
    { name: '15 sqm', code: '15' },
    { name: '20 sqm', code: '20' },
    { name: '25 sqm', code: '25' },
    { name: '30 sqm', code: '30' },
    { name: '40 sqm', code: '40' },
    { name: '50 sqm', code: '50' },
    { name: '75 sqm', code: '75' },
    { name: '100 sqm', code: '100' },
    { name: '150 sqm', code: '150' },
    { name: '200 sqm', code: '200' },
    { name: '300 sqm', code: '300' },
    { name: '400 sqm', code: '400' },
    { name: '500 sqm', code: '500' },
    { name: '600 sqm', code: '600' },
    { name: '700 sqm', code: '700' },
    { name: '800 sqm', code: '800' },
    { name: '900 sqm', code: '900' },
    { name: '1000 sqm', code: '1000' },
    { name: '1100 sqm', code: '1100' },
    { name: '1200 sqm', code: '1200' },
    { name: '1300 sqm', code: '1300' },
    { name: '1400 sqm', code: '1400' },
    { name: '1500 sqm', code: '1500' },
    { name: '2000 sqm', code: '2000' },
    { name: '2500 sqm', code: '2500' },
    { name: '3000 sqm', code: '3000' },
];


export interface Place {
    geometry: {
        location: {
            lat: () => number;
            lng: () => number;
        };
    };
    name: string;
    [key: string]: any; // Add any additional properties if needed
}

export const map_center = {
    lat: 42.3360525,
    lng: -71.0169759,
};

export const places_categories = [
    { label: 'Parking lots', type: 'parking', icon: '/map-icon-parking.svg' },
    { label: 'Supermarkets', type: 'supermarket', icon: '/map-icon-supermarket.svg' },
    { label: 'Cafes', type: 'cafe', icon: '/map-icon-cafe.svg' },
    { label: 'Restaurant', type: 'restaurant', icon: '/map-icon-restaurant.svg' },
    { label: 'Schools/Universities', type: 'school', icon: '/map-icon-school.svg' },
    { label: 'Bars', type: 'bar', icon: '/map-icon-bar.svg' },
    { label: 'Gyms', type: 'gym', icon: '/map-icon-gym.svg' },
    { label: 'Mall', type: 'shopping_mall', icon: '/map-icon-shop.svg' },
    { label: 'Hair care', type: 'hair_care', icon: '/map-icon-barber.svg' },
    { label: 'Park', type: 'park', icon: '/map-icon-park.svg' },
    { label: 'Attraction', type: 'tourist_attraction', icon: '/map-icon-tourist-attraction.svg' },
    { label: 'Hospitals', type: 'hospital', icon: '/map-icon-hospital.svg' },
];

export const grayMapStyle =  [
  {
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "landscape",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "stylers": [
      {
        "color": "#d3dfee"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#d3dfee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d3dfee"
      }
    ]
  }
]


export type MockPageData = {
  title?: string;
  components: ComponentBlock[];
};

// In-memory storage for testing (persists during development)
let mockDatabase: Record<string, MockPageData> = {
  Home: {
    title: "Home",
    components: [
      {
        type: "NavVar1",
        props: { transparent: false }
      }, 
      // {
      //   type: "PropFeatures1",
      //   props: {
      //     title: "Our Amazing Features",
      //     features: [
      //       { name: "Fast Performance", desc: "Lightning quick loading" },
      //       { name: "Modern Design", desc: "Beautiful UI components" }
      //     ]
      //   }
      // },
      {
        type: "PropCardVar1",
        props: {
          // title: "Luxury Villa",
          // price: "450000",
          // location: "Lagos, Nigeria",
          // pro_info: {}
        }
      },
      {
        type: "FooterVar1",
        props: { 
          // year: 2026 
        }
      }
    ]
  },

  About: {
    title: "About Us",
    components: [
      {
        type: "NavVar1",
        props: { transparent: true }
      },
      // {
      //   type: "PropFeatures1",
      //   props: {
      //     title: "Why Choose Us",
      //     features: []
      //   }
      // }
    ]
  }
};

// Mock getPageFromDB
export async function getPageFromDB(pageId: string): Promise<MockPageData | null> { 
  return mockDatabase[pageId] || null;
}

// Mock savePageToDB
export async function savePageToDB(pageId: string, data: { components: ComponentBlock[] }): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300)); // simulate save delay

  if (!mockDatabase[pageId]) {
    mockDatabase[pageId] = { components: [] };
  }

  mockDatabase[pageId] = {
    ...mockDatabase[pageId],
    components: data.components
  };

  console.log(`✅ Saved page "${pageId}" with ${data.components.length} components`);
}

// Helper to reset mock data (useful during development)
export function resetMockData() {
  mockDatabase = {
    Home: { title: "Home", components: [] },
    About: { title: "About Us", components: [] }
  };
}
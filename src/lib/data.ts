export const mockUser = {
  userId: 'user-123',
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  year: '3rd Year',
  department: 'Computer Science',
  vehicleDetails: {
    model: 'Maruti Swift',
    plateNumber: 'TS08AB1234',
  },
  carpoolPreference: true,
};

export const mockUsers = [
  { userId: 'user-1', name: 'Priya Sharma', email: 'priya.s@example.com', year: '2nd Year', department: 'BBA', carpoolPreference: true },
  { userId: 'user-2', name: 'Rohan Verma', email: 'rohan.v@example.com', year: '4th Year', department: 'B.Tech CSE', carpoolPreference: false },
  { userId: 'user-3', name: 'Anjali Mehta', email: 'anjali.m@example.com', year: '1st Year', department: 'Design', carpoolPreference: true },
];


export const mockVehicles = [
  { vehicleId: 'veh-1', driverId: 'user-1', driverName: 'Priya Sharma', model: 'Honda City', availableSeats: 3, currentLocation: 'Campus', willingnessToShare: true },
  { vehicleId: 'veh-2', driverId: 'user-4', driverName: 'Sameer Khan', model: 'Hyundai Creta', availableSeats: 2, currentLocation: 'Campus', willingnessToShare: true },
];

export const mockCommutes = [
    {
        commuteId: 'bus-1',
        type: 'College Bus',
        routeDetails: 'Campus to Secunderabad Station',
        costEstimate: 150,
        departureTime: '04:00 PM, Fri',
        availableSeats: 25,
        filter: 'cheapest',
        icon: 'Bus'
    },
    {
        commuteId: 'bus-2',
        type: 'RCT Bus',
        routeDetails: 'Campus to Miyapur',
        costEstimate: 200,
        departureTime: '04:30 PM, Fri',
        availableSeats: 40,
        filter: 'cheapest',
        icon: 'BusFront'
    },
    {
        commuteId: 'car-1',
        type: 'Book Vehicle',
        departureTime: 'As per booking',
        filter: 'fastest',
        icon: 'Car'
    },
    {
        commuteId: 'rental-1',
        type: 'Rental Car',
        routeDetails: 'Campus to Airport',
        costEstimate: 1500,
        departureTime: 'As per booking',
        availableSeats: 4,
        filter: 'fastest',
        icon: 'CarTaxiFront'
    },
    {
        commuteId: 'carpool-1',
        type: 'Carpool',
        
        filter: 'eco-friendly',
        icon: 'Users'
    },
];

export const mockCarpools = [
    { 
        requestId: 'cp-1', 
        driverId: 'user-1',
        driverName: 'Priya Sharma',
        vehicle: 'Honda City',
        destination: 'Jubilee Hills', 
        departureTime: '05:30 PM, Fri', 
        availableSeats: 2,
        requests: [{ userId: 'user-3', name: 'Anjali Mehta', status: 'pending'}] 
    },
    { 
        requestId: 'cp-2', 
        driverId: 'user-4',
        driverName: 'Sameer Khan',
        vehicle: 'Hyundai Creta',
        destination: 'Kondapur', 
        departureTime: '06:00 PM, Fri', 
        availableSeats: 1,
        requests: [{ userId: 'user-5', name: 'Vikram Singh', status: 'approved'}] 
    },
];

export const mockCityDestinations = [
    {
        destinationId: 'dest-1',
        name: 'Charminar',
        locationCoordinates: '17.3616, 78.4747',
        travelOptions: 'Bus, Cab, Auto',
        estimatedCost: '300-500 from city center',
        popularAttractions: ['Laad Bazaar', 'Mecca Masjid', 'Chowmahalla Palace'],
        image: 'destination-1'
    },
    {
        destinationId: 'dest-2',
        name: 'Golconda Fort',
        locationCoordinates: '17.3833, 78.4011',
        travelOptions: 'Bus, Cab',
        estimatedCost: '400-600 from city center',
        popularAttractions: ['Light & Sound Show', 'Qutb Shahi Tombs'],
        image: 'destination-2'
    }
];

export const mockAnalytics = {
    ridesPerStudent: [
        { name: 'Jan', rides: 45 },
        { name: 'Feb', rides: 60 },
        { name: 'Mar', rides: 75 },
        { name: 'Apr', rides: 55 },
    ],
    popularDestinations: [
        { name: 'Hitech City', value: 400, fill: "var(--color-chart-1)" },
        { name: 'Secunderabad', value: 300, fill: "var(--color-chart-2)" },
        { name: 'Gachibowli', value: 250, fill: "var(--color-chart-3)" },
        { name: 'Jubilee Hills', value: 200, fill: "var(--color-chart-4)" },
    ],
    commutePatterns: [
        { type: 'College Bus', count: 120 },
        { type: 'Carpool', count: 90 },
        { type: 'RCT Bus', count: 70 },
        { type: 'Personal', count: 40 },
    ]
};

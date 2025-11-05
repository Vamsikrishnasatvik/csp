// types/openrouteservice-js.d.ts
declare module "openrouteservice-js" {
  interface DirectionsOptions {
    api_key: string;
    host?: string;
  }
  interface CalculateOptions {
    coordinates: number[][];
    profile: string;
    format?: string;
    geometry_format?: string;
    [key: string]: any;
  }

  class Directions {
    constructor(options: DirectionsOptions);
    calculate(options: CalculateOptions): Promise<any>;
  }

  const Openrouteservice: {
    Directions: typeof Directions;
    // (Optional) other service classes like Geocode, Isochrones, etc., if you use them
  };

  export default Openrouteservice;
}

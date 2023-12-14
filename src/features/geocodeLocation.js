import axios from "axios";
export const geocodeLocation = async (location, setLocation,dispatch) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
      );
      
      const [result] = await response.data
      if (result) {
        dispatch(setLocation({
          address: result.display_name,
          lat: parseFloat(result.lat),
          lon: parseFloat(result.lon),
        }));
      } else {
        console.error('Location not found');
      }
    } catch (error) {
      console.error('Error geocoding location:', error);
    }
  };
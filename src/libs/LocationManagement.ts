import axios from "axios";
import { LatLng } from "leaflet";

type NominatimResponse = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon: string;
};

async function GetCoordinatesFromAddress(address: string): Promise<LatLng> {
  const response = await axios
    .get(
      "https://nominatim.openstreetmap.org/search?q=" + address + "&format=json"
    )
    .then((response) => response.data);
  return GetCoordinatesFromResponse(response[0]);
}

async function GetAddressFromCoordinates(
  latitude: number,
  longitude: number
): Promise<string[]> {
  const response = await axios
    .get(
      `https://nominatim.openstreetmap.org/reverse.php?lat=${latitude}&lon=${longitude}&zoom=13&format=jsonv2`
    )
    .then((response) => response.data);

  const address = response.display_name.split(", ");
  return address;
}

function GetCoordinatesFromResponse(response: NominatimResponse): LatLng {
  if (response != null && response.place_id != null) {
    return new LatLng(parseFloat(response.lat), parseFloat(response.lon));
  } else {
    throw new Error("No coordinates found for this address");
  }
}

export default { GetCoordinatesFromAddress, GetAddressFromCoordinates };

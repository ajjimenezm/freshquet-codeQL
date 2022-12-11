function OpenGoogleMaps(lat: number, lng: number) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  window.open(url, '_blank');
}

function OpenGoogleMapsAddress(address: string) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
  window.open(url, '_blank');
}

export default {
  OpenGoogleMaps,
  OpenGoogleMapsAddress,
};

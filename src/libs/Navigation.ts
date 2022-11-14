function OpenGoogleMaps(lat: number, lng: number) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
}

export default {
    OpenGoogleMaps,
};

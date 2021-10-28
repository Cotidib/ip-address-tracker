import L from 'leaflet';
import icon from './images/icon-location.svg'

const pinIcon = new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 70),
    className: 'leaflet-div-icon'
});

export { pinIcon };
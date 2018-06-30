import "ol/ol.css";
import "./css/ol-layerswitcher.css";
import "./css/ol-popup.css";
import "./css/styles.css";
import Map from "ol/map";
import View from "ol/View";
import TileLayer from "ol/layer/tile";
import Osm from "ol/source/OSM";
// import Proj from "ol/proj";
// import BaseObject from "ol/Object";
// import Coordinate from "ol/coordinate";
import { toStringHDMS } from "ol/coordinate.js";
import {addProjection, addCoordinateTransforms, transform, get} from "ol/proj.js";
import { LayerSwitcher } from "./LayerSwitcher";
import { SachsenWMSDop } from "./Layer";
import { Popup } from "./Popup";

const osmLayer = new TileLayer({ source: new Osm(), visible: true });
osmLayer.set("title", "Openstreetmap");
osmLayer.set("type", "base");

const map = new Map({
    layers: [osmLayer, new SachsenWMSDop()],
    target: "map",
    view: new View({
        center: transform([13.2856, 51.2986], "EPSG:4326", "EPSG:3857"),
        projection: get("EPSG:3857"),
        zoom: 12,
    })
});

let switcher = new LayerSwitcher({ tipLabel: "Layeranzeige" });
map.addControl(switcher);

let popup = new Popup();
map.addOverlay(popup);
map.on("singleclick", (evt: any) => {
    const prettyCoord = toStringHDMS(transform(evt.coordinate, "EPSG:3857", "EPSG:4326"), 2);
    popup.show(evt.coordinate, "<div><h3>Koordinaten</h3><p>" + prettyCoord + "</p></div>");
});

console.log("Titel " + osmLayer.get("title"));

import TileLayer from "ol/layer/tile";
import TileWMS from "ol/source/TileWMS";

class SachsenWMSDop extends TileLayer {
    constructor() {
        const src = new TileWMS({
            params: {
                LAYERS: "sn_dop_020",
                SRID: "3857",
            },
            url: "https://geodienste.sachsen.de/wms_geosn_dop-rgb/guest"
        });

        super({ source: src, visible: false });
        this.set("title", "SachenDop");
        this.set("type", "base");
    }
}

export { SachsenWMSDop };

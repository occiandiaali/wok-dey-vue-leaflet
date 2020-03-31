new Vue({
  el: "#app",
  data: {
    map: null,
    tileLayer: null,
    layers: [
        {
            id: 0,
            name: 'Mechanics',
            active: false,
            features: [
                {
                    id: 0,
                    name: 'Shakiru Agbede',
                    type: 'marker',
                    coords: [6.6870, 3.4257],
                  },
                  {
                    id: 1,
                    name: 'Pappy Luwe',
                    type: 'marker',
                    coords: [6.6680, 3.4357],
                  },
                  {
                    id: 2,
                    name: 'Ogini Osagie',
                    type: 'marker',
                    coords: [6.6930, 3.4027],
                  },
                  {
                    id: 3,
                    name: 'Charles Njoku',
                    type: 'marker',
                    coords: [6.6770, 3.4457],
                  },
                  {
                    id: 4,
                    name: 'Sugarfire',
                    type: 'marker',
                    coords: [6.6530, 3.4257],
                  },
            ],
        },
        {
            id: 1,
            name: 'Plumbers',
            active: false,
            features: [
                {
                    id: 0,
                    name: 'Bogart\'s Smokehouse',
                    type: 'marker',
                    coords: [6.7080, 3.4357],
                  },
                  {
                    id: 1,
                    name: 'Pappy\'s Smokehouse',
                    type: 'marker',
                    coords: [6.7010, 3.4257],
                  },
                  {
                    id: 2,
                    name: 'Broadway Oyster Bar',
                    type: 'marker',
                    coords: [6.7180, 3.4257],
                  },
                  {
                    id: 3,
                    name: 'Charlie Gitto\'s On the Hill',
                    type: 'marker',
                    coords: [6.6900, 3.4137],
                  },
                  {
                    id: 4,
                    name: 'Sugarfire',
                    type: 'marker',
                    coords: [6.7067, 3.4337],
                  },
            ],
        },
        {
            id: 2,
            name: 'Generator technician',
            active: false,
            features: [
                {
                    id: 0,
                    name: 'Bogart\'s Smokehouse',
                    type: 'marker',
                    coords: [6.6570, 3.4257],
                  },
                  {
                    id: 1,
                    name: 'Pappy\'s Smokehouse',
                    type: 'marker',
                    coords: [6.6810, 3.4257],
                  },
                  {
                    id: 2,
                    name: 'Broadway Oyster Bar',
                    type: 'marker',
                    coords: [6.6970, 3.4087],
                  },
                  {
                    id: 3,
                    name: 'Charlie Gitto\'s On the Hill',
                    type: 'marker',
                    coords: [6.6820, 3.4557],
                  },
                  {
                    id: 4,
                    name: 'Sugarfire',
                    type: 'marker',
                    coords: [6.6430, 3.4157],
                  },
            ],
        },
    ],
  },
  mounted() {
    this.initMap();
    this.initLayers();
  },
  methods: {
    initMap() {
      this.map = L.map("map").setView([6.6980, 3.4157], 14);
      this.tileLayer = L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
        }
      );
      this.tileLayer.addTo(this.map);
      const myMarker = L.marker([6.6980, 3.4157]).addTo(this.map);
      myMarker.bindPopup("<b>You are here!</b><br>More info..").openPopup();
    },
    initLayers() {
        this.layers.forEach(layer => {
            const markerFeatures = layer.features
              .filter(feature => feature.type === 'marker');

              markerFeatures.forEach((feature) => {
                feature.leafletObject = L.marker(feature.coords)
                  .bindPopup(feature.name);
              });
        });
        
    },
    layerChanged(layerId, active) {
        const layer = this.layers.find(layer => layer.id === layerId);
        layer.features.forEach((feature) => {
            if (active) {
                feature.leafletObject.addTo(this.map);
            } else {
                feature.leafletObject.removeFrom(this.map);
            }
        });
    }
  }
});

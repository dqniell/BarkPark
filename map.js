mapkit.init({
    authorizationCallback: function(done) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/services/jwt");
        xhr.addEventListener("load", function() {
            done(this.responseText);
        });
        xhr.send();
    }
});

// Landmarks data
var sanFranciscoLandmarks = [
    { coordinate: new mapkit.Coordinate(37.7951315, -122.402986), title: "Transamerica Pyramid", phone: "+1-415-983-5420", url: "http://www.transamericapyramidcenter.com/" },
    { coordinate: new mapkit.Coordinate(37.7954201, -122.39352), title: "Ferry Building", phone: "+1 (415) 983-8030", url: "http://www.ferrybuildingmarketplace.com" },
    { coordinate: new mapkit.Coordinate(37.8083396, -122.415727), title: "Fisherman's Wharf", phone: "+1 (415) 673-3530", url: "http://visitfishermanswharf.com" },
    { coordinate: new mapkit.Coordinate(37.8023553, -122.405742), title: "Coit Tower", phone: "+1 (415) 249-0995", url: "http://sfrecpark.org/destination/telegraph-hill-pioneer-park/coit-tower/" },
    { coordinate: new mapkit.Coordinate(37.7552305, -122.452624), title: "Sutro Tower", phone: "+1 (415) 681-8850", url: "http://www.sutrotower.com" },
    { coordinate: new mapkit.Coordinate(37.779267, -122.419269), title: "City Hall", phone: "+1 (415) 701-2311", url: "http://sfgsa.org/index.aspx?page=1085" },
    { coordinate: new mapkit.Coordinate(37.8184493, -122.478409), title: "Golden Gate Bridge", phone: "+1 (415) 921-5858", url: "http://www.goldengatebridge.org" },
    { coordinate: new mapkit.Coordinate(37.7785538, -122.514035), title: "Cliff House", phone: "+1 (415) 386-3330", url: "http://www.cliffhouse.com/" }
];

// Landmark annotation callout delegate
var CALLOUT_OFFSET = new DOMPoint(-148, -78);
var landmarkAnnotationCallout = {
    calloutElementForAnnotation: function(annotation) {
        return calloutForLandmarkAnnotation(annotation);
    },

    calloutAnchorOffsetForAnnotation: function(annotation, element) {
        return CALLOUT_OFFSET;
    },

    calloutAppearanceAnimationForAnnotation: function(annotation) {
        return ".4s cubic-bezier(0.4, 0, 0, 1.5) 0s 1 normal scale-and-fadein";
    }
};

// Landmarks annotations
var annotations = sanFranciscoLandmarks.map(function(landmark) {
    var annotation = new mapkit.MarkerAnnotation(landmark.coordinate, {
        callout: landmarkAnnotationCallout,
        color: "#c969e0"
    });
    annotation.landmark = landmark;
    return annotation;
});

var map = new mapkit.Map("map");
map.showItems(annotations);

// Landmark annotation custom callout
function calloutForLandmarkAnnotation(annotation) {
    var div = document.createElement("div");
    div.className = "landmark";

    var title = div.appendChild(document.createElement("h1"));
    title.textContent = annotation.landmark.title;

    var section = div.appendChild(document.createElement("section"));

    var phone = section.appendChild(document.createElement("p"));
    phone.className = "phone";
    phone.textContent = annotation.landmark.phone;

    var link = section.appendChild(document.createElement("p"));
    link.className = "homepage";
    var a = link.appendChild(document.createElement("a"));
    a.href = annotation.landmark.url;
    a.textContent = "website";

    return div;
}
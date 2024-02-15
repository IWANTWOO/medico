// Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
        import { getAuth } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js'
        import { getFirestore,collection,getDocs } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js'
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
          apiKey: "AIzaSyDV-B53gxbk9EpwZKRnEGzBS2qP6SZ4R2U",
          authDomain: "medico-7e38a.firebaseapp.com",
          databaseURL: "https://medico-7e38a-default-rtdb.firebaseio.com",
          projectId: "medico-7e38a",
          storageBucket: "medico-7e38a.appspot.com",
          messagingSenderId: "405615750743",
          appId: "1:405615750743:web:fe4a52ed55ff60b15dfd12",
          measurementId: "G-RNGG1K4267"
        };
        if($(window).width() > 480){
            module.mobileView()
        }else{
            module.windowView()
        }
        // mobile functions
        $('#m-show-list-btn').on('click',()=>{
            $('#m-main-page').hide()
            $('#top-bar').show()
            $('#map').show()
            module.map.invalidateSize()
        })
        $('#store-locator-btn').on('click',()=>{
            $('#m-main-page').show()
            $('#top-bar').hide()
            if(!$('#map').is(":hidden"))$('#map').hide()
            if(!$('#list-container').is(":hidden"))$('#list-container').hide()
        })
        $('#list-btn').on('click',()=>{
            $('#list-container').show()
            $('#map').hide()
            // map.invalidateSize()
        })
        $('#map-btn').on('click',()=>{
            $('#list-container').hide()
            $('#map').show()
            module.map.invalidateSize()
        })
        // end of mobile functions
        $('#show-list-btn').on('click',()=>{
            $('#list-container').show()
            $('#map').show()
            $('#hide-list-btn').show()
            $('#show-list-btn').hide()
            module.map.invalidateSize()
        })
        $('#hide-list-btn').on('click',()=>{
            $('#hide-list-btn').hide()
            $('#list-container').hide()
            $('#map').hide()
            if($('#marker-detail-container').css('display')=='block')$('#marker-detail-container').hide()
            $('#show-list-btn').show()
            module.map.invalidateSize()
        })
        $('#return-to-map-btn').on('click',()=>{
            module.map.flyTo([-41.85139239616424,173.20393013380811], 6)
        })
        $('#close-detail-container').on('click',()=>{
            if ($(window).width() > 480) $('#map').css('height','100%')
            else $('#map').css('height','83.5vh')
            $('#marker-detail-container').hide() 
            module.map.invalidateSize()
        })
        // Initialize Firebase
        const app = initializeApp(firebaseConfig)
        const analytics = getAnalytics(app)
        const db= getFirestore()
        const colRef=collection(db,'stores3')
        module.map = L.map('map',{ zoomControl: false }).setView([-41.85139239616424,173.20393013380811], 6)
        let osm_layer=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            })
        osm_layer.addTo(module.map)
        let sattelite_layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {id: 'mapbox.streets', attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'})
        module.switchBase=function switchBase(baseKey){
            switch (baseKey) {
                case 'osm':
                    module.map.removeLayer(sattelite_layer)
                    module.map.addLayer(osm_layer)
                    $('#satellite_base').removeAttr('disabled')
                    $('#osm_base').attr('disabled','disabled')
                    break;
                default:
                    module.map.removeLayer(osm_layer)
                    module.map.addLayer(sattelite_layer)
                    $('#satellite_base').attr('disabled','disabled')
                    $('#osm_base').removeAttr('disabled')
                    break;
            }
        }
        getDocs(colRef)
        .then((snapshot)=>{
            let data={
                "type": "FeatureCollection",
                "features": []
            },
            count=0
            snapshot.docs.forEach((doc)=>{
                count+=1
                let point={
                    "type": "Feature",
                    "properties": {...doc.data(),id:doc.id},
                    "geometry": {
                        "coordinates": [
                        parseFloat(doc.data().longitude),
                        parseFloat(doc.data().latitude)
                        ],
                        "type": "Point"
                    }
                }
                point.properties['label']=count
                data.features.push(point)
            })
            let medicoLayer=L.geoJSON(null,{
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {icon: 
                        L.divIcon({
                            className:'marker-results',
                            html:feature.properties.label,
                            // iconUrl: 'pill.png',
                            iconSize:     [20, 20], // size of the icon
                        })
                    })
                }
            })
            ,searchLayer=''
            ,dataOnScreen=[],pointsOnScreen=[],currentLocation=[]
            medicoLayer.addData(data).addTo(module.map)
            module.map.on('moveend', (e)=>{
                dataOnScreen=[]
                pointsOnScreen=[]
                let bounds = module.map.getBounds()
                $('#list-content').empty()
                data.features.forEach(element => {
                    let point=[parseFloat(element.properties.latitude),parseFloat(element.properties.longitude)]
                    if(turf.booleanPointInPolygon(turf.point(point),turf.bboxPolygon([parseFloat(bounds._southWest.lat),parseFloat(bounds._southWest.lng),parseFloat(bounds._northEast.lat),parseFloat(bounds._northEast.lng)]))){
                        if(searchContent!=null) element.distance=turf.distance(searchContent.geometry.coordinates,element.geometry.coordinates)
                        else element.distance=turf.distance([module.map.getCenter().lat,module.map.getCenter().lng],element.geometry.coordinates)
                        pointsOnScreen.push(element)
                    }
                });
                pointsOnScreen.sort((a,b)=>(parseFloat(a.distance)-parseFloat(b.distance))).forEach(function (element, i) {
                    element.properties.label=i+1
                    let listContent=`
                            <div class="col-12 mt-1">
                                <button style="width:100%;border:none;background-color:transparent" onclick='module.zoomToItem(`+JSON.stringify(element)+`)'>
                                    <div class="card card-list" style="background-color:transparent">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-2">
                                                    <div class="label-round"><small class="text-body-secondary" style="text-align:center;">`+element.properties.label+`</small></div>
                                                </div>
                                                <div class="col-10 p-0" style="text-align:left;">
                                                    <small class="text-body-secondary d-block"><b>`+element.properties.brandName+`</b></small>
                                                    <small class="text-body-secondary d-block">`+element.properties.address+`</small>
                                                </div>
                                                <!-- <div class="col-6 mt-2">
                                                    <a type="button" target="_blank" href="https://maps.google.com/?q=`+element.properties.latitude+`,`+element.properties.longitude+`" class="btn btn-dark list-btn">Get Directions</a>
                                                </div>
                                                <div class="col-6 mt-2">
                                                    <a type="button" target="_blank" href="`+element.properties.url+`" class="btn btn-dark list-btn">Website</a>
                                                </div>-->
                                            </div>  
                                            <hr>     
                                        </div>
                                    </div>
                                </button>
                            </div>
                        `
                        dataOnScreen.push(listContent)
                })
                let newData={
                    "type": "FeatureCollection",
                    "features": pointsOnScreen
                }
                medicoLayer.clearLayers()
                medicoLayer.addData(newData)
                if(dataOnScreen.length>0)$('#list-content').append(dataOnScreen).hide().fadeIn(1000)
                else{
                    let noStore=`
                    <div class="col-12 mt-1">
                        <div class="card card-list text-center" style="width:100%;border:none;background-color:transparent">
                            <div class="card-body">
                                <h6 class="display-6" color="#888989">There are no stores in your area :(</h6>
                            </div>
                        </div>
                    </div>
                    `
                    $('#list-content').append(noStore).fadeIn(1000)
                }          
            })
            $('#pac-input').on('input',(e)=>{
                if(searchLayer!='') module.map.removeLayer(searchLayer)
                if($('#pac-input').val().length>0) $('.bi-arrow-right').hide();
                else $('.bi-arrow-right').show()
            })
            let searchContent=null
            $('#locate-btn').on('click',()=>{
                if ($(window).width() > 480) {
                    $('#show-list-btn').click()
                }else{
                    $('#m-show-list-btn').click()
                }
                const { display_name } = searchContent.properties;
                const [lng, lat] = searchContent.geometry.coordinates;
                searchLayer = L.marker([lat, lng], {
                    title: display_name,
                });
                searchLayer.addTo(module.map).bindPopup(display_name);
                module.map.flyTo([lat, lng], 12);
            })
            new Autocomplete("pac-input", {
                selectFirst: true,
                // The number of characters entered should start searching
                howManyCharacters: 3,
                // onSearch
                onSearch: ({ currentValue }) => {
                const api = `https://nominatim.openstreetmap.org/search?format=geojson&limit=5&country=New%20Zealand&street=${encodeURI(
                    currentValue
                )}`;
                const autoClear = $(".auto-clear");
                autoClear.on("click", () => {
                    $('#pac-input').value = "";
                    $('.bi-arrow-right').show()
                    if(searchLayer!='') module.map.removeLayer(searchLayer)
                    autoClear.classList.add("hidden");
                })
                return new Promise((resolve) => {
                    fetch(api)
                    .then((response) => response.json())
                    .then((data) => {
                        resolve(data.features);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                });
                },
                onResults: ({ currentValue, matches, template }) => {
                const regex = new RegExp(currentValue, "gi");
                return matches === 0
                    ? template
                    : matches
                        .map((element) => {
                        return `
                        <li class="loupe">
                        <p>
                            ${element.properties.display_name.replace(
                            regex,
                            (str) => `<b>${str}</b>`
                            )}
                        </p>
                        </li> `;
                        })
                        .join("");
                },
                onSubmit: ({ object }) => {
                    searchContent=null
                    if(searchLayer!='') module.map.removeLayer(searchLayer)
                    searchContent=object
                },
                onSelectedItem: ({ index, element, object }) => {
                    console.log("onSelectedItem:", index, element);
                },
                noResults: ({ currentValue, template }) =>
                template(`<li>No results found: "${currentValue}"</li>`),
            });
      
        })
 <script type="module">
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
            $('#main-view').empty()
            $('#main-view').append(`
                <div class="col-md-4">
                <div id="searchContainer" class="row">
                    <div class="col-12 mb-4">
                        <img src="logo.png" width="25%" class="mb-4" alt="">
                    </div>
                    <div class="col-12 mt-2 mb-4 window-view">
                        <button id="show-list-btn" type="button" style="width:80%;height:42px;border-radius:25px;" class="btn btn-outline-dark">See nearby stores</button>
                        <button id="hide-list-btn" type="button" style="width:80%;height:42px;border-radius:25px;" class="btn btn-outline-dark">Hide stores</button>
                    </div>
                    <div class="col-12 mt-4">
                        <p class="h6">or Search By</p>
                    </div>
                    <div class="col-12">
                        <div id='search-container' class="auto-search-wrapper input-group" style="border-bottom:1px solid black">
                            <input
                                id="pac-input"
                                class="controls"
                                style="width:90%;border:none;"
                                type="text"
                                autocomplete="off"
                                placeholder="City or Postcode"
                            />
                            <i class="bi bi-arrow-right"></i>
                        </div>
                    </div>
                    <div class="col-12 mt-4">
                        <button id="locate-btn" type="button" style="width:35%;height:42px;border-radius:25px;" class="btn btn-dark">Locate</button>
                    </div>
                </div>
            </div>
            <div class="col-md-3 p-0">
                <div id="list-container" >
                    <h3 class="mx-3 mt-2 text-center">Stores</h3>
                    <hr>
                    <div id="list-content" class="list-row row mt-2 text-left">
                    </div>
                </div>
            </div>
            <div class="col-md-5 p-0">
                <div id="map">
                    <div id="return-to-map-btn-container">
                        <button id="return-to-map-btn" type="button" class="btn btn-outline-dark p-0" style="width:100%;height:32px;border-radius:25px;">Return to Map</button>
                    </div>
                    <div id="basemap-container">
                        <div class="row">
                            <div class="col-6 col-basemap">
                                <button id="satellite_base" onClick="module.switchBase('satellite')" type="button" class="btn btn-light basemap-toggle">Satellite</button>
                            </div>
                            <div class="col-6 col-basemap">
                                <button id="osm_base" disabled type="button" onClick="module.switchBase('osm')" class="btn btn-light basemap-toggle">Map</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="marker-detail-container" style="background-color: #DFF9F1;height:35vh">
                    <button id="close-detail-container" type="button" class="btn-close mb-4" aria-label="Close"></button>
                    <div class="container">
                        <div class="row">
                            <div class="col-12 mb-4">
                                <p class="h6" id="marker-title"></p>
                                <small class="text-body-secondary" id="marker-address"></small>
                            </div>
                            <div class="col-12 mt-2 mb-4">
                                <p class="h6"><b>Phone: </b><span id="marker-phone"></span></p>
                                <p class="h6" id="marker-website"></p>
                            </div>
                            <div class="col-12">
                                <button target="_blank" id="marker-direction" type="button" class="btn btn-dark">Get Direction <i class="bi bi-arrow-up-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `)
        }else{
            $('#main-view').empty()
            $('#main-view').append(`
                <div id="m-main-page" class="col-sm-12">
                <div id="searchContainer" class="row">
                    <div class="col-12 mb-4">
                        <img src="logo.png" width="25%" class="mb-4" alt="">
                    </div>
                    <div class="col-12 mt-2 mb-4">
                        <button id="m-show-list-btn" type="button" style="width:80%;height:42px;border-radius:25px;" class="btn btn-outline-dark">See nearby stores</button>
                    </div>
                    <div class="col-12 mt-4">
                        <p class="h6">or Search By</p>
                    </div>
                    <div class="col-12">
                        <div id='search-container' class="auto-search-wrapper input-group" style="border-bottom:1px solid black">
                            <input
                                id="pac-input"
                                class="controls"
                                style="width:90%;border:none;"
                                type="text"
                                autocomplete="off"
                                placeholder="City or Postcode"
                            />
                            <i class="bi bi-arrow-right"></i>
                        </div>
                    </div>
                    <div class="col-12 mt-4">
                        <button id="locate-btn" type="button" style="width:35%;height:42px;border-radius:25px;" class="btn btn-dark">Locate</button>
                    </div>
                </div>
            </div> 
            <div id="top-bar" class="col-sm-12 p-0" style="background-color: #cbf7ed65;">
                <div class="row">
                    <div class="col-sm-12 container mt-4 p-4">
                        <button id="store-locator-btn" type="button" class="btn" style="border:none;background-color: transparent;"><i class="bi bi-arrow-left"></i> Store Locator</button>
                    </div>
                    <div class="col-sm-12 mt-2 p-0 btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" class="btn-check" name="btnradio" id="list-btn" autocomplete="off">
                        <label class="btn" for="list-btn">List</label>
                        <input type="radio" class="btn-check" name="btnradio" id="map-btn" autocomplete="off" checked>
                        <label class="btn" for="map-btn">Map</label>
                    </div>
                </div>
            </div>
            <div id="list-container" class="col-sm-12">
                <h3 class="mx-3 mt-2 text-center">Stores</h3>
                <hr>
                <div id="list-content" class="list-row row mt-2 text-left">
                </div>
            </div>
            <div class="col-sm-12 p-0">
                <div id="map"></div>
                <div id="marker-detail-container" class="container" style="background-color: #DFF9F1;height:35vh">
                    <button id="close-detail-container" type="button" class="btn-close mb-4" aria-label="Close"></button>
                    <div class="container">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <p class="h6" id="marker-title"></p>
                                <small class="text-body-secondary" id="marker-address"></small>
                            </div>
                            <div class="col-12 mt-1">
                                <p class="h6"><b>Phone: </b><span id="marker-phone"></span></p>
                                <p class="h6" id="marker-website"></p>
                            </div>
                            <div class="col-12 p-0 mb-1">
                                <button target="_blank" id="marker-direction" type="button" class="btn btn-dark" style="width:96%;margin-left:2%;border-radius:50px;">
                                    <div class="row">
                                        <div class="col-8" style="text-align:left">Get Direction</div> 
                                        <div class="col-4" style="text-align:right"><i class="bi bi-arrow-up-right"></i></div>
                                    </div></button>
                            </div>
                            <div class="col-12 p-0">
                                <button target="_blank" id="m-marker-website" type="button" class="btn btn-outline-dark" style="width:96%;margin-left:2%;border-radius:50px"><div class="row">
                                    <div class="col-8" style="text-align:left">Website</div> 
                                    <div class="col-4" style="text-align:right"><i class="bi bi-arrow-up-right"></i></div>
                                </div></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `)
        }
        // mobile functions
        $('#m-show-list-btn').on('click',()=>{
            $('#m-main-page').hide()
            $('#top-bar').show()
            $('#map').show()
            map.invalidateSize()
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
            map.invalidateSize()
        })
        // end of mobile functions
        $('#show-list-btn').on('click',()=>{
            $('#list-container').show()
            $('#map').show()
            $('#hide-list-btn').show()
            $('#show-list-btn').hide()
            map.invalidateSize()
        })
        $('#hide-list-btn').on('click',()=>{
            $('#hide-list-btn').hide()
            $('#list-container').hide()
            $('#map').hide()
            if($('#marker-detail-container').css('display')=='block')$('#marker-detail-container').hide()
            $('#show-list-btn').show()
            map.invalidateSize()
        })
        $('#return-to-map-btn').on('click',()=>{
            map.flyTo([-41.85139239616424,173.20393013380811], 6)
        })
        $('#close-detail-container').on('click',()=>{
            if ($(window).width() > 480) $('#map').css('height','100%')
            else $('#map').css('height','83.5vh')
            $('#marker-detail-container').hide()
            
            map.invalidateSize()
        })
        // Initialize Firebase
        const app = initializeApp(firebaseConfig)
        const analytics = getAnalytics(app)
        const db= getFirestore()
        const colRef=collection(db,'stores3')
        let map = L.map('map',{ zoomControl: false }).setView([-41.85139239616424,173.20393013380811], 6),
            osm_layer=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            })
        osm_layer.addTo(map)
        let sattelite_layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {id: 'mapbox.streets', attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'})
        module.switchBase=function switchBase(baseKey){
            switch (baseKey) {
                case 'osm':
                    map.removeLayer(sattelite_layer)
                    map.addLayer(osm_layer)
                    $('#satellite_base').removeAttr('disabled')
                    $('#osm_base').attr('disabled','disabled')
                    break;
                default:
                    map.removeLayer(osm_layer)
                    map.addLayer(sattelite_layer)
                    $('#satellite_base').attr('disabled','disabled')
                    $('#osm_base').removeAttr('disabled')
                    break;
            }
        }
        module.zoomToItem=(element)=>{
            if ($(window).width() > 480) {
                $('#map').css('height','65vh')
                map.invalidateSize()
            }else{
                $('#map').css('height','47vh')
                $('#map-btn').click()
                $('#m-marker-website').off('click')
                $('#m-marker-website').on('click',()=>{
                    let link=element.properties.url
                    window.open(link, "_blank")
                })
            }
            map.flyTo([parseFloat(element.properties.latitude),parseFloat(element.properties.longitude)],15)
            $('#marker-title').html(element.properties.brandName)
            $('#marker-address').html(element.properties.address)
            $('#marker-phone').html()
            $('#marker-website').html(element.properties.url)
            $('#marker-direction').off('click')
            $('#marker-direction').on('click',()=>{
                let link='https://www.google.com/maps/place/'+element.properties.latitude+','+element.properties.longitude+'/@'+element.properties.latitude+','+element.properties.longitude+',15z'
                window.open(link, "_blank")
            })
            $('#marker-detail-container').show()
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
            medicoLayer.addData(data).addTo(map)
            map.on('moveend', (e)=>{
                dataOnScreen=[]
                pointsOnScreen=[]
                let bounds = map.getBounds()
                $('#list-content').empty()
                data.features.forEach(element => {
                    let point=[parseFloat(element.properties.latitude),parseFloat(element.properties.longitude)]
                    if(turf.booleanPointInPolygon(turf.point(point),turf.bboxPolygon([parseFloat(bounds._southWest.lat),parseFloat(bounds._southWest.lng),parseFloat(bounds._northEast.lat),parseFloat(bounds._northEast.lng)]))){
                        if(searchContent!=null) element.distance=turf.distance(searchContent.geometry.coordinates,element.geometry.coordinates)
                        else element.distance=turf.distance([map.getCenter().lat,map.getCenter().lng],element.geometry.coordinates)
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
                if(searchLayer!='') map.removeLayer(searchLayer)
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
                searchLayer.addTo(map).bindPopup(display_name);
                map.flyTo([lat, lng], 12);
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
                    if(searchLayer!='') map.removeLayer(searchLayer)
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
                    if(searchLayer!='') map.removeLayer(searchLayer)
                    searchContent=object
                },
                onSelectedItem: ({ index, element, object }) => {
                    console.log("onSelectedItem:", index, element);
                },
                noResults: ({ currentValue, template }) =>
                template(`<li>No results found: "${currentValue}"</li>`),
            });
      
        })
        </script>
module.mobileView=()=>{
    $('#main-view').empty()
            $('#main-view').append(`
                <div class="col-md-4">
                <div id="searchContainer" class="row">
                    <div class="col-12 mb-4">
                        <img src="https://uploads-ssl.webflow.com/632fce2e91252d5486f764e3/641c0e27cda87048a4f5b342_Top%20Bar.svg" width="25%" class="mb-4" alt="">
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
}
module.windowView=()=>{
    $('#main-view').empty()
    $('#main-view').append(`
        <div id="m-main-page" class="col-sm-12">
        <div id="searchContainer" class="row">
            <div class="col-12 mb-4">
                <img src="https://uploads-ssl.webflow.com/632fce2e91252d5486f764e3/641c0e27cda87048a4f5b342_Top%20Bar.svg" width="25%" class="mb-4" alt="">
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
module.zoomToItem=(element)=>{
    if ($(window).width() > 480) {
        $('#map').css('height','65vh')
        module.map.invalidateSize()
    }else{
        $('#map').css('height','47vh')
        $('#map-btn').click()
        $('#m-marker-website').off('click')
        $('#m-marker-website').on('click',()=>{
            let link=element.properties.url
            window.open(link, "_blank")
        })
    }
    module.map.flyTo([parseFloat(element.properties.latitude),parseFloat(element.properties.longitude)],15)
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

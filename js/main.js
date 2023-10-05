function MainModule(listingsID = "#listings") {
  const me = {};

  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing) {

    let amenities = JSON.parse(listing.amenities);
    let listEntries = "";
    
    for (const ammenity of amenities){
      listEntries += '<li> ' + ammenity + '</li>\n'
    }

    return `<div class="col-4">
  <div class=" listing card">
    <img
      src=${listing.picture_url}
      class="card-img-top"
      alt="AirBNB Listing"
    />
    <div class="card-body">
      <h2 class="card-title">${listing.name}</h2>
      <div>${listing.price}</div>
      <p class="card-text">
        ${listing.description}
      </p>
      <h3>Ammenities</h3>
      <ul>
        ${listEntries}
      </ul>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
  </div>
  `;
  }

  function redraw(listings) {
    listingsElement.innerHTML = "";
    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();


    me.redraw(listings.slice(0, 50));
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();


main.loadData();
const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="/inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="/inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the Detail view HTML
* ************************************ */
Util.buildVehicleDetailPage = async function(vehicle){
  let detail = `
    <section class="vehicle-detail">
      <div class="vehicle-image-info">
        <div class="vehicle-images">
          <p class="vehicle-des">
            ${vehicle.inv_description}
          </p>
          <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" width="500" height="330" loading="lazy">
        </div>

        <div class="thumb">
          <img src="${vehicle.inv_thumbnail}" alt="${vehicle.inv_make} ${vehicle.inv_model}" width="85" height="85" loading="lazy">
          <img src="${vehicle.inv_thumbnail}" alt="${vehicle.inv_make} ${vehicle.inv_model}" width="85" height="85" loading="lazy">
          <img src="${vehicle.inv_thumbnail}" alt="${vehicle.inv_make} ${vehicle.inv_model}" width="85" height="85" loading="lazy">
        </div>
      </div>
      
      <div class="vehicle-info">
        <h2>
          ${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}
        </h2>

        <div class="vehicle-header">
          <div class="mileage-box">
            <p class="miles"> MILEAGE</p>
            <p> ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)} </p>
          </div>

          <h2> NO-Haggle Price </h2>
          
          <div class="vehicle-pay">
            <h2> $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</h2>
            <p class="small-text"> Does not include $299 Order Delivery Fee.</p>
            <p class="medium-text red-text"> ESTIMATE PAYMENTS </p>
          </div>

        </div>

        <div class="vehicle-info-table">
          <div class="vehicle-feat">
            <p><strong>Mileage:</strong> 
              ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)} miles
            </p>

            <p><strong>MPG:</strong> 
              29/37 (City/Hwy)
            </p>

            <p><strong>Color:</strong> 
              ${vehicle.inv_color}
            </p>

            <p><strong>Fuel Type:</strong> 
              Gasoline
            </p>

            <p><strong>Make:</strong> 
              ${vehicle.inv_make}
            </p>

            <p><strong>Model:</strong> 
              ${vehicle.inv_model}
            </p>

            <p><strong>Year:</strong> 
              ${vehicle.inv_year}
            </p>

            <p class="red-text">
              <em>+MPG</em>
            </p>

            <p>
              The principal prior use of this vehicle was as a Rental Vehicle
            </p>

          </div>

          <div class="info-button">
            <button>START MY PURCHASE</button>
            <button>CONTACT US</button>
            <button>🚗SCHEDULE TEST DRIVE</button>
            <button>APPLY FOR FINANCING</button>

            <p><strong>Call Us<br></strong> 
             <span class="red-text">08178753044</span>
            </p>

            <p>
              <strong>Visit Us</strong> 
            </p>
          </div>
        </div>

      </div>
    </section>
    `
  return detail
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util
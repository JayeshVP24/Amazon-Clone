import React from "react"
import "./Home.css"
import Product from "./Product"

function Home() {
  return (
    <div>
      <div className="home">
        <div className="home__container">
          <img
            className="home__image"
            src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
            alt="Amazon Prime"
          />

          <div className="home__row">
            {/* Product */}
            <Product
              id={1}
              title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses"
              price={155}
              image="https://m.media-amazon.com/images/I/81jgCiNJPUL._AC_UY327_FMwebp_QL65_.jpg"
              rating={4}
            />
            {/* Product */}
            <Product
              id={2}
              title="CasaStyle - Diana 3 Seater Sofa (Grey) | Best for Living Rooms, Offices"
              price={14999}
              image="https://m.media-amazon.com/images/I/61tqC0FWXDL._AC_UL480_FMwebp_QL65_.jpg"
              rating={2}
            />
          </div>
          <div className="home__row">
            {/* Product */}
            {/* Product */}
            {/* Product */}
            <Product
              id={3}
              title="JBL Flip 3 Stealth Waterproof Portable Bluetooth Speaker with Rich Deep Bass (Black), Without Mic"
              price={5222}
              image="https://m.media-amazon.com/images/I/81DRhqE04BL._AC_UY327_FMwebp_QL65_.jpg"
              rating={3}
            />
            <Product
              id={4}
              title="Cockatoo CTM-05 Steel 2 HP Peak Motorised Multi-Function Treadmill(Free Installation Assistance)"
              price={17444}
              image="https://images-eu.ssl-images-amazon.com/images/I/41lTjm8vBrL._AC_US240_FMwebp_QL65_.jpg"
              rating={5}
            />
            <Product
              id={5}
              title="Hero Sprint Fazer 24T 18 Speed Mountain Bike (Ideal For : 9 to 11 Years )"
              price={6160}
              image="https://m.media-amazon.com/images/I/815shIV0DsL._AC_UY327_FMwebp_QL65_.jpg"
              rating={3}
            />
          </div>
          <div className="home__row">
            {/* Product */}
            <Product
              id={6}
              title="Samsung LC49HG90DMUXEN 48.9-inch Ultra Wide Curved Monitor (Black)"
              price={154000}
              image="https://m.media-amazon.com/images/I/81vlA84pg6L._AC_UY327_FMwebp_QL65_.jpg"
              rating={5}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

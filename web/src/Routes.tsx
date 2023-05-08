// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import HomeLayout from './layouts/HomeLayout/HomeLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Equipments" titleTo="equipments" buttonLabel="New Equipment" buttonTo="newEquipment">
        <Route path="/equipments/new" page={EquipmentNewEquipmentPage} name="newEquipment" />
        <Route path="/equipments/{id:Int}/edit" page={EquipmentEditEquipmentPage} name="editEquipment" />
        <Route path="/equipments/{id:Int}" page={EquipmentEquipmentPage} name="equipment" />
        <Route path="/equipments" page={EquipmentEquipmentsPage} name="equipments" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Bookings" titleTo="bookings" buttonLabel="New Booking" buttonTo="newBooking">
        <Route path="/bookings/new" page={BookingNewBookingPage} name="newBooking" />
        <Route path="/bookings/{id:Int}/edit" page={BookingEditBookingPage} name="editBooking" />
        <Route path="/bookings/{id:Int}" page={BookingBookingPage} name="booking" />
        <Route path="/bookings" page={BookingBookingsPage} name="bookings" />
      </Set>
      <Route path="/checkout" page={CheckoutPage} name="checkout" />
      <Set wrap={HomeLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/contact" page={ContactPage} name="contact" />
        <Route path="/theater" page={TheaterPage} name="theater" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

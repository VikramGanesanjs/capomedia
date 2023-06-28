// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'
import { Head } from '@redwoodjs/web'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import HomeLayout from './layouts/HomeLayout/HomeLayout'

const Routes = () => {
  const { hasRole } = useAuth()

  return (
    <Router useAuth={useAuth}>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      {hasRole('admin') ? (
        <>
          <Set wrap={ScaffoldLayout} title="Contact Form Response" titleTo="contactFormResponses" buttonLabel="New Contact Form Response" buttonTo="contact">
            <Route path="/admin/contact-form-responses/{id:Int}" page={ContactFormResponseContactFormResponsePage} name="contactFormResponse" />
            <Route path="/admin/contact-form-responses" page={ContactFormResponseContactFormResponsesPage} name="contactFormResponses" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Bookings" titleTo="bookings" buttonLabel="New Booking" buttonTo="checkout">
            <Route path="/admin/bookings/{id:Int}/edit" page={BookingEditBookingPage} name="editBooking" />
            <Route path="/admin/bookings/{id:Int}" page={BookingBookingPage} name="booking" />
            <Route path="/admin/bookings" page={BookingBookingsPage} name="bookings" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Equipments" titleTo="equipments" buttonLabel="New Equipment" buttonTo="newEquipment">
            <Route path="/admin/equipments/new" page={EquipmentNewEquipmentPage} name="newEquipment" />
            <Route path="/admin/equipments/{id:Int}/edit" page={EquipmentEditEquipmentPage} name="editEquipment" />
            <Route path="/admin/equipments/{id:Int}" page={EquipmentEquipmentPage} name="equipment" />
            <Route path="/admin/equipments" page={EquipmentEquipmentsPage} name="equipments" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Videos" titleTo="videos" buttonLabel="New Video" buttonTo="newVideo">
            <Route path="/admin/videos/new" page={VideoNewVideoPage} name="newVideo" />
            <Route path="/admin/videos/{id:Int}/edit" page={VideoEditVideoPage} name="editVideo" />
            <Route path="/admin/videos/{id:Int}" page={VideoVideoPage} name="video" />
            <Route path="/admin/videos" page={VideoVideosPage} name="videos" />
          </Set>
        </>
      ) : (
        <>
          <Route path="/videos/new" page={VideoNewVideoPage} name="newVideo" />
          <Route path="/videos/{id:Int}/edit" page={VideoEditVideoPage} name="editVideo" />
          <Route path="/videos/{id:Int}" page={VideoVideoPage} name="video" />
          <Route path="/videos" page={VideoVideosPage} name="videos" />
        </>
      )}

      <Route path="/theater" page={TheaterPage} name="theater" />
      <Set wrap={HomeLayout}>
        <Route path="/" page={HomePage} name="home" prerender />
        <Route path="/about" page={AboutPage} name="about" prerender />

        <Route path="/contact" page={ContactPage} name="contact" prerender />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Private unauthenticated="login">
          {hasRole('admin') && (
            <>
              <Route path="/admin" page={AdminPage} name="admin" />
              <Route path="/admin/booking-approval" page={BookingApprovalPage} name="bookingApproval" />
            </>
          )}
          <Route path="/checkout" page={BookingNewBookingPage} name="checkout" />
        </Private>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

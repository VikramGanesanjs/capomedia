import BookingCell from 'src/components/Booking/BookingCell'

type BookingPageProps = {
  id: number
}

const BookingPage = ({ id }: BookingPageProps) => {
  return <BookingCell id={id} />
}

export default BookingPage

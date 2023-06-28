import ContactFormResponseCell from 'src/components/ContactFormResponse/ContactFormResponseCell'

type ContactFormResponsePageProps = {
  id: number
}

const ContactFormResponsePage = ({ id }: ContactFormResponsePageProps) => {
  return <ContactFormResponseCell id={id} />
}

export default ContactFormResponsePage

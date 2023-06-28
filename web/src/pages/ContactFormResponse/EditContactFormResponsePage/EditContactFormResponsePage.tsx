import EditContactFormResponseCell from 'src/components/ContactFormResponse/EditContactFormResponseCell'

type ContactFormResponsePageProps = {
  id: number
}

const EditContactFormResponsePage = ({ id }: ContactFormResponsePageProps) => {
  return <EditContactFormResponseCell id={id} />
}

export default EditContactFormResponsePage

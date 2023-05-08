import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Equipment/EquipmentsCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type {
  DeleteEquipmentMutationVariables,
  FindEquipments,
} from 'types/graphql'

const DELETE_EQUIPMENT_MUTATION = gql`
  mutation DeleteEquipmentMutation($id: Int!) {
    deleteEquipment(id: $id) {
      id
    }
  }
`

const EquipmentsList = ({ equipments }: FindEquipments) => {
  const [deleteEquipment] = useMutation(DELETE_EQUIPMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Equipment deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteEquipmentMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete equipment ' + id + '?')) {
      deleteEquipment({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((equipment) => (
            <tr key={equipment.id}>
              <td>{truncate(equipment.id)}</td>
              <td>{truncate(equipment.name)}</td>
              <td>{truncate(equipment.description)}</td>
              <td>{timeTag(equipment.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.equipment({ id: equipment.id })}
                    title={'Show equipment ' + equipment.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editEquipment({ id: equipment.id })}
                    title={'Edit equipment ' + equipment.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete equipment ' + equipment.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(equipment.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EquipmentsList

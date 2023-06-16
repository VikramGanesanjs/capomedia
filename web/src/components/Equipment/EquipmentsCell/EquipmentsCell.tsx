import type { FindEquipments } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Equipments from 'src/components/Equipment/Equipments'

export const QUERY = gql`
  query FindEquipments {
    equipments {
      id
      name
      description
      createdAt
      category
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No equipments yet. '}
      <Link to={routes.newEquipment()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ equipments }: CellSuccessProps<FindEquipments>) => {
  return <Equipments equipments={equipments} />
}

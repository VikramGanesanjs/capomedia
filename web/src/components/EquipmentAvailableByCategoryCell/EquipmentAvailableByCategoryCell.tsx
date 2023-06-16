import { useState } from 'react'

import { FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import type {
  FindEquipmentByCategoryQuery,
  FindEquipmentByCategoryQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindEquipmentByCategoryQuery($category: String!) {
    equipments: equipmentByCategory(category: $category) {
      id
      name
      description
      category
      bookings {
        id
      }
    }
  }
`
export const beforeQuery = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { shootStartTime, shootEndTime, onSave, categoryIndex, ...rest } = props

  return { variables: rest, fetchPolicy: 'cache-and-network' }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindEquipmentByCategoryQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const checkAvailability = (bookings, shootStartTime, shootEndTime) => {
  const reversedBookings = bookings.reverse()
  for (const booking of reversedBookings) {
    if (booking.startTime < new Date()) {
      return true
    } else if (
      booking.startTime < shootStartTime ||
      booking.endTime > shootEndTime
    ) {
      return false
    }
  }
  return true
}

interface SuccessProps {
  equipments: FindEquipmentByCategoryQuery['equipments']
  shootStartTime: Date
  shootEndTime: Date
  onSave: (categoryIndex: number, equipmentIds: number[]) => void
  categoryIndex: number
}

export const Success = ({
  equipments,
  shootStartTime,
  shootEndTime,
  onSave,
  categoryIndex,
}: CellSuccessProps<
  FindEquipmentByCategoryQuery,
  FindEquipmentByCategoryQueryVariables
> &
  SuccessProps) => {
  const [equipmentIds, setEquipmentIds] = useState([])

  return (
    <FormGroup>
      {equipments.map((equipment, i) => {
        if (
          checkAvailability(equipment.bookings, shootStartTime, shootEndTime)
        ) {
          return (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      const copy = [...equipmentIds]
                      copy.push({
                        equipmentId: equipment.id,
                        equipmentName: equipment.name,
                        equipmentCategory: equipment.category,
                      })
                      console.log(copy)
                      setEquipmentIds(copy)
                      onSave(categoryIndex, copy)
                    } else {
                      console.log('went false')
                      const copy = equipmentIds.filter(
                        (obj) => obj.equipmentId !== equipment.id
                      )
                      console.log(copy)
                      setEquipmentIds(copy)
                      onSave(categoryIndex, copy)
                    }
                  }}
                />
              }
              label={`${equipment.name}---${equipment.description}`}
            />
          )
        } else {
          return (
            <FormControlLabel
              key={i}
              disabled
              control={<Checkbox />}
              label={`${equipment.name} (not available on the date selected)`}
            />
          )
        }
      })}
    </FormGroup>
  )
}

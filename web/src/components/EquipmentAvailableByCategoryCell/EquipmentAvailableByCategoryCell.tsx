import { useState } from 'react'

import { FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import type {
  Booking,
  BookingEquipment,
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
        booking {
          startTime
          endTime
          id
          projectName
        }
      }
    }
  }
`
export const beforeQuery = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    shootStartTime,
    shootEndTime,
    onSave,
    categoryIndex,
    editBooking,
    ...rest
  } = props

  return { variables: rest, fetchPolicy: 'cache-and-network' }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindEquipmentByCategoryQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const checkAvailability = (
  bookings: BookingEquipment[],
  shootStartTime,
  shootEndTime
): [boolean, Booking?] => {
  if (bookings.length === 0) {
    return [true, null]
  }
  const reversedBookings = [...bookings].reverse()

  for (const booking of reversedBookings) {
    const existingStartTimeEarlier =
      new Date(booking.booking.startTime) < new Date(shootStartTime)
    const existingEndTimeEarlier =
      new Date(booking.booking.endTime) < new Date(shootEndTime)

    const existingStartEarlierProposedEnd =
      new Date(booking.booking.startTime) < new Date(shootEndTime)
    const proposedStartEarlierExistingEnd =
      new Date(shootStartTime) < new Date(booking.booking.endTime)

    const existingEnvelopsProposed =
      existingStartTimeEarlier && !existingEndTimeEarlier
    const proposedEnvelopsExisting =
      !existingStartTimeEarlier && existingEndTimeEarlier
    const existingBeforeProposedConflict =
      existingStartTimeEarlier &&
      existingEndTimeEarlier &&
      proposedStartEarlierExistingEnd
    const proposedBeforeExistingConflict =
      !existingStartTimeEarlier &&
      !existingEndTimeEarlier &&
      existingStartEarlierProposedEnd

    if (
      existingEnvelopsProposed ||
      proposedEnvelopsExisting ||
      existingBeforeProposedConflict ||
      proposedBeforeExistingConflict
    ) {
      return [false, booking.booking]
    }
  }
  return [true, null]
}

interface SuccessProps {
  equipments: FindEquipmentByCategoryQuery['equipments']
  shootStartTime: Date
  shootEndTime: Date
  onSave: (
    categoryIndex: number,
    equipmentIds: number[],
    defaultChecked: boolean
  ) => void
  categoryIndex: number
  editBooking: Booking
}

export const Success = ({
  equipments,
  shootStartTime,
  shootEndTime,
  onSave,
  categoryIndex,
  editBooking,
}: CellSuccessProps<
  FindEquipmentByCategoryQuery,
  FindEquipmentByCategoryQueryVariables
> &
  SuccessProps) => {
  const [equipmentIds, setEquipmentIds] = useState([])

  const handleCheckboxChange = (e, equipment, defaultChecked) => {
    if (!defaultChecked) {
      if (e.target.checked) {
        const copy = [...equipmentIds]
        copy.push({
          equipmentId: equipment.id,
          equipmentName: equipment.name,
          equipmentCategory: equipment.category,
        })
        console.log(copy)
        setEquipmentIds(copy)
        onSave(categoryIndex, copy, defaultChecked)
      } else {
        console.log('went false')
        const copy = equipmentIds.filter(
          (obj) => obj.equipmentId !== equipment.id
        )
        console.log(copy)
        setEquipmentIds(copy)
        onSave(categoryIndex, copy, defaultChecked)
      }
    } else {
      if (!e.target.checked) {
        onSave(categoryIndex, equipment.id, defaultChecked)
      } else {
        onSave(categoryIndex, [], false)
      }
    }
  }

  return (
    <FormGroup>
      {equipments.map((equipment, i) => {
        const [available, possibleConflictingBooking] = checkAvailability(
          equipment.bookings,
          shootStartTime,
          shootEndTime
        )
        if (
          editBooking &&
          !available &&
          possibleConflictingBooking?.id == editBooking.id
        ) {
          return (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  onChange={(e) => handleCheckboxChange(e, equipment, true)}
                  defaultChecked
                />
              }
              label={`${equipment.name}   ${equipment.description}`}
            />
          )
        } else if (available) {
          return (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  onChange={(e) => handleCheckboxChange(e, equipment, false)}
                />
              }
              label={`${equipment.name}   ${equipment.description}`}
            />
          )
        } else {
          return (
            <FormControlLabel
              key={i}
              disabled
              control={<Checkbox />}
              label={`${equipment.name} (not available on the date selected due to the project ${possibleConflictingBooking?.projectName} being booked)`}
            />
          )
        }
      })}
    </FormGroup>
  )
}

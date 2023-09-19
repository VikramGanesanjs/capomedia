import { useState } from 'react'

import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  TextField,
} from '@mui/material'
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
      multiple
      quantityTotal
      bookings {
        quantity
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
  shootEndTime,
  multiple,
  totalQty
): [boolean, any] => {
  if (bookings.length === 0) {
    return [true, null]
  }
  const reversedBookings = [...bookings].reverse()
  if (!multiple) {
    for (const booking of reversedBookings) {
      const cond1 =
        new Date(booking.booking.startTime) <= new Date(shootEndTime)
      const cond2 =
        new Date(booking.booking.endTime) >= new Date(shootStartTime)

      if (cond1 && cond2) {
        return [false, booking.booking]
      }
    }
    return [true, null]
  } else {
    let qtyLeft = totalQty
    let latestConflictingBooking = reversedBookings[0].booking
    for (const booking of reversedBookings) {
      const cond1 =
        new Date(booking.booking.startTime) <= new Date(shootEndTime)
      const cond2 =
        new Date(booking.booking.endTime) >= new Date(shootStartTime)

      if (cond1 && cond2) {
        latestConflictingBooking = booking.booking
        qtyLeft -= booking.quantity
      }
    }
    if (qtyLeft > 0) {
      return [true, qtyLeft]
    } else {
      return [false, latestConflictingBooking]
    }
  }
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

  const handleCheckboxChange = (
    e,
    equipment,
    defaultChecked,
    multiple,
    quantity
  ) => {
    if (!defaultChecked) {
      if (e.target.checked) {
        const copy = [...equipmentIds]
        copy.push({
          equipmentId: equipment.id,
          equipmentName: equipment.name,
          equipmentCategory: equipment.category,
          multiple: multiple,
          quantity: multiple ? quantity : 1,
        })
        setEquipmentIds(copy)
        onSave(categoryIndex, copy, defaultChecked)
      } else {
        const copy = equipmentIds.filter(
          (obj) => obj.equipmentId !== equipment.id
        )
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

  const handleValueChange = (e, equipment) => {
    const copy = [...equipmentIds]
    const copy2 = copy.filter((obj) => obj.equipmentId !== equipment.id)
    if (copy.length !== copy2.length) {
      copy2.push({
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        equipmentCategory: equipment.category,
        multiple: true,
        quantity: parseInt(e.target.value),
      })
      setEquipmentIds(copy2)
      onSave(categoryIndex, copy2, false)
    }
  }

  return (
    <FormGroup>
      {equipments.map((equipment, i) => {
        const [
          available,
          possibleConflictingBookingorNumberofMultipleAvailable,
        ] = checkAvailability(
          equipment.bookings,
          shootStartTime,
          shootEndTime,
          equipment.multiple,
          equipment.quantityTotal
        )
        if (
          editBooking &&
          !available &&
          possibleConflictingBookingorNumberofMultipleAvailable?.id ==
            editBooking.id
        ) {
          return (
            <CheckboxMultiple
              key={i}
              valueChange={(e, equipment) => handleValueChange(e, equipment)}
              onChange={(e, equipment, def, mult, quant) =>
                handleCheckboxChange(e, equipment, def, mult, quant)
              }
              equipment={equipment}
              multiple={equipment.multiple}
              label={`${equipment.name}   ${equipment.description}`}
              numAvail={possibleConflictingBookingorNumberofMultipleAvailable}
            />
          )
        } else if (available) {
          return (
            <CheckboxMultiple
              valueChange={(e, equipment) => handleValueChange(e, equipment)}
              key={i}
              onChange={(e, equipment, def, mult, quant) =>
                handleCheckboxChange(e, equipment, def, mult, quant)
              }
              equipment={equipment}
              numAvail={possibleConflictingBookingorNumberofMultipleAvailable}
              multiple={equipment.multiple}
              label={`${equipment.name}   (${equipment.description})`}
            />
          )
        } else {
          return (
            <CheckboxMultiple
              key={i}
              disabled
              valueChange={(e, equipment) => handleValueChange(e, equipment)}
              onChange={(e, equipment, def, mult, quant) =>
                handleCheckboxChange(e, equipment, def, mult, quant)
              }
              numAvail={possibleConflictingBookingorNumberofMultipleAvailable}
              equipment={equipment}
              multiple={equipment.multiple}
              label={`${equipment.name} (not available on the date selected due to the project ${possibleConflictingBookingorNumberofMultipleAvailable?.projectName} being booked)`}
            />
          )
        }
      })}
    </FormGroup>
  )
}

interface CheckboxMultipleProps {
  disabled?: boolean
  onChange: any
  valueChange: any
  label: string
  multiple: boolean
  equipment: any
  numAvail: any
}

const CheckboxMultiple = ({
  disabled,
  onChange,
  label,
  equipment,
  multiple,
  numAvail,
  valueChange,
}: CheckboxMultipleProps) => {
  const [quantity, setQuantity] = useState(0)
  if (multiple) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => {
                onChange(e, equipment, false, multiple, quantity)
              }}
            />
          }
          label={label}
          disabled={disabled}
        />
        {!disabled && (
          <TextField
            label={`How many? ${numAvail ?? equipment.quantityTotal} available`}
            variant="filled"
            type="number"
            onChange={(e) => {
              setQuantity(parseInt(e.target.value))
              valueChange(e, equipment)
            }}
            disabled={disabled}
          />
        )}
      </Box>
    )
  }
  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={(e) => onChange(e, equipment, false, multiple, quantity)}
        />
      }
      label={label}
      disabled={disabled}
    />
  )
}

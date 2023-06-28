import { useState } from 'react'

import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import {
  Box,
  Button,
  Collapse,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import type {
  DeleteBookingMutationVariables,
  FindBookingById,
} from 'types/graphql'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_BOOKING_MUTATION = gql`
  mutation DeleteBookingMutation($id: Int!) {
    deleteBooking(id: $id) {
      id
    }
  }
`

interface Props {
  booking: NonNullable<FindBookingById['booking']>
}

const Booking = ({ booking }: Props) => {
  const [deleteBooking] = useMutation(DELETE_BOOKING_MUTATION, {
    onCompleted: () => {
      toast.success('Booking deleted')
      navigate(routes.bookings())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteBookingMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete booking ' + id + '?')) {
      deleteBooking({ variables: { id } })
    }
  }

  const [opened, setOpened] = useState(false)
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4">
          Booking {booking.projectName} Detail
        </Typography>
        <TableContainer>
          <TableBody>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>{booking.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Start time</TableCell>
              <TableCell>{timeTag(booking.startTime)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>End time</TableCell>
              <TableCell>{timeTag(booking.endTime)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>User id</TableCell>
              <TableCell>{booking.userId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Created at</TableCell>
              <TableCell>{timeTag(booking.createdAt)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Producer name</TableCell>
              <TableCell>{booking.producerName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Producer email</TableCell>
              <TableCell>{booking.producerEmail}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Director name</TableCell>
              <TableCell>{booking.directorName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Project name</TableCell>
              <TableCell>{booking.projectName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Extra comments</TableCell>
              <TableCell>{booking.extraComments}</TableCell>
            </TableRow>
            <TableCell>Equipment Checked Out</TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpened(!opened)}
            >
              {opened ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            <TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse in={opened} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      {booking.equipments.map((equipment, i) => {
                        return (
                          <Typography key={i} gutterBottom>
                            {equipment.equipment.name}
                          </Typography>
                        )
                      })}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Approval</TableCell>
                <TableCell>{booking.approval}</TableCell>
              </TableRow>
            </TableRow>
          </TableBody>
        </TableContainer>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          justifyContent: 'center',
        }}
      >
        <Button
          onClick={() => navigate(routes.editBooking({ id: booking.id }))}
          variant="contained"
        >
          Edit
        </Button>
        <Button onClick={() => onDeleteClick(booking.id)} variant="contained">
          Delete
        </Button>
      </Box>
    </>
  )
}

export default Booking

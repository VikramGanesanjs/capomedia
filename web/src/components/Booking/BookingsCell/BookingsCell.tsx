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
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material'
import type {
  DeleteBookingMutationVariables,
  FindBookings,
} from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

export const QUERY = gql`
  query FindBookings {
    bookings {
      id
      startTime
      endTime
      userId
      createdAt
      producerName
      producerEmail
      directorName
      projectName
      extraComments
      approval
      equipments {
        multiple
        quantity
        equipment {
          name
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No bookings yet. '}
      <Link to={routes.checkout()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

const DELETE_BOOKING_MUTATION = gql`
  mutation DeleteBookingMutation($id: Int!) {
    deleteBooking(id: $id) {
      id
    }
  }
`

export const Success = ({ bookings }: CellSuccessProps<FindBookings>) => {
  const theme = useTheme()

  const [deleteEquipment] = useMutation(DELETE_BOOKING_MUTATION, {
    onCompleted: () => {
      toast.success('Booking deleted')
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

  const onDeleteClick = (id: DeleteBookingMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      deleteEquipment({ variables: { id } })
    }
  }
  const [opened, setOpened] = useState(bookings.map((_) => false))

  return (
    <TableContainer>
      <TableHead>
        <TableRow>
          <TableCell>Project Name</TableCell>
          <TableCell>Producer</TableCell>
          <TableCell>Director</TableCell>
          <TableCell>Checkout Date</TableCell>
          <TableCell>Return Date</TableCell>
          <TableCell>Equipment Checked Out</TableCell>
          <TableCell>Approval</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bookings.map((booking, i) => (
          <>
            <TableRow key={i}>
              <TableCell>{booking.projectName}</TableCell>
              <TableCell>{booking.producerName}</TableCell>
              <TableCell>{booking.directorName}</TableCell>
              <TableCell>
                {new Date(booking.startTime).toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(booking.endTime).toLocaleString()}
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() =>
                    setOpened([...opened].map((o, j) => (j === i ? !o : o)))
                  }
                >
                  {opened[i] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              </TableCell>
              <TableCell>
                <Typography
                  color={
                    booking.approval == 'Approved'
                      ? 'success'
                      : booking.approval == 'Rejected'
                      ? 'error'
                      : 'primary'
                  }
                >
                  {booking.approval}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate(routes.booking({ id: booking.id }))}
                    title={'Show booking ' + booking.id + ' detail'}
                  >
                    Show
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: theme.palette.secondary.main }}
                    onClick={() =>
                      navigate(routes.editBooking({ id: booking.id }))
                    }
                    title={'Edit booking ' + booking.id}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: theme.palette.secondary.dark }}
                    title={'Delete booking ' + booking.id}
                    onClick={() => onDeleteClick(booking.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={6}
              >
                <Collapse in={opened[i]} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    {booking.equipments.map((equip, i) => {
                      return (
                        <Typography key={i} gutterBottom>
                          {`${equip.equipment.name} ${
                            equip.multiple ? '(' + equip.quantity + ')' : ''
                          }`}
                        </Typography>
                      )
                    })}
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </TableContainer>
  )
}

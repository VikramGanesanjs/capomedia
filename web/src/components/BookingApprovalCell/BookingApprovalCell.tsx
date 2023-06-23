import { useState } from 'react'

import { TableRows } from '@mui/icons-material'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import {
  Box,
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
  FindBookingApprovalQuery,
  FindBookingApprovalQueryVariables,
} from 'types/graphql'

import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

export const QUERY = gql`
  query FindBookingApprovalQuery {
    bookings: pendingBookings {
      id
      projectName
      producerName
      directorName
      startTime
      endTime
      equipments {
        equipment {
          name
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <Typography variant="h6">No bookings to approve or reject!</Typography>
)

export const Failure = ({
  error,
}: CellFailureProps<FindBookingApprovalQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  bookings,
}: CellSuccessProps<
  FindBookingApprovalQuery,
  FindBookingApprovalQueryVariables
>) => {
  const [opened, setOpened] = useState(bookings.map((booking) => false))

  const theme = useTheme()

  const UPDATE_BOOKING_MUTATION = gql`
    mutation ApproveBooking($id: Int!, $input: UpdateBookingInput!) {
      updateBooking(id: $id, input: $input) {
        projectName
        id
        approval
      }
    }
  `
  const [updateBooking, { loading, error }] = useMutation(
    UPDATE_BOOKING_MUTATION,
    {
      onError: (error) => {
        toast.error(error.message)
      },

      refetchQueries: [{ query: QUERY }],

      awaitRefetchQueries: true,
    }
  )

  const handleApprove = (e, i) => {
    const booking = bookings[i]
    const id = booking.id
    const input = { approval: 'Approved' }
    updateBooking({ variables: { id, input } })
    toast.success(`${booking.projectName} approved!`)
  }

  const handleReject = (e, i) => {
    const booking = bookings[i]
    const id = booking.id
    const input = { approval: 'Rejected' }
    updateBooking({ variables: { id, input } })
    toast.success(`${booking.projectName} rejected!`)
  }

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
          <TableCell>Approve</TableCell>
          <TableCell>Reject</TableCell>
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
                <IconButton
                  aria-label="approve"
                  size="small"
                  onClick={(e) => handleApprove(e, i)}
                >
                  <CheckIcon color="success" />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="reject"
                  size="small"
                  onClick={(e) => handleReject(e, i)}
                >
                  <ClearIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={6}
              >
                <Collapse in={opened[i]} timeout="auto" unmountOnExit>
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
          </>
        ))}
      </TableBody>
    </TableContainer>
  )
}

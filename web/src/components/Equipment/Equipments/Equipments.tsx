import { useState } from 'react'

import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material'
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
  DeleteEquipmentMutationVariables,
  FindEquipments,
} from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Equipment/EquipmentsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_EQUIPMENT_MUTATION = gql`
  mutation DeleteEquipmentMutation($id: Int!) {
    deleteEquipment(id: $id) {
      id
    }
  }
`

const EquipmentsList = ({ equipments }: FindEquipments) => {
  const theme = useTheme()

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

  const [opened, setOpened] = useState(equipments.map((equipment) => false))
  return (
    <Box className="rw-segment rw-TableContainer-wrapper-responsive">
      <TableContainer className="rw-TableContainer">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Created at</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Bookings</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipments.map((equipment, i) => (
            <>
              <TableRow key={equipment.id}>
                <TableCell>{truncate(equipment.id)}</TableCell>
                <TableCell>{truncate(equipment.name)}</TableCell>
                <TableCell>{truncate(equipment.description)}</TableCell>
                <TableCell>{timeTag(equipment.createdAt)}</TableCell>
                <TableCell>{truncate(equipment.category)}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                      const copy = [...opened]
                      copy[i] = !copy[i]
                      setOpened(copy)
                    }}
                  >
                    {opened[i] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() =>
                        navigate(routes.equipment({ id: equipment.id }))
                      }
                      title={'Show equipment ' + equipment.id + ' detail'}
                    >
                      Show
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: theme.palette.secondary.main }}
                      onClick={() =>
                        navigate(routes.editEquipment({ id: equipment.id }))
                      }
                      title={'Edit equipment ' + equipment.id}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: theme.palette.secondary.dark }}
                      title={'Delete equipment ' + equipment.id}
                      onClick={() => onDeleteClick(equipment.id)}
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
                      {equipment.bookings.map((booking, i) => {
                        if (new Date(booking.booking.startTime) > new Date()) {
                          return (
                            <>
                              <Typography key={i} gutterBottom>
                                {`Project - ${booking.booking.projectName}`}
                              </Typography>
                              <Typography>
                                {`Start Time - ${new Date(
                                  booking.booking.startTime
                                ).toLocaleString()}`}
                              </Typography>
                              <Typography>
                                {`End Time-${new Date(
                                  booking.booking.endTime
                                ).toLocaleString()}`}
                              </Typography>
                            </>
                          )
                        }
                      })}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </TableContainer>
    </Box>
  )
}

export default EquipmentsList

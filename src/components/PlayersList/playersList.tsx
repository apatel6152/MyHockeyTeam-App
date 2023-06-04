import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Grid,
  Avatar,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  IconButton,
} from '@mui/material';
import './playersList.css';

import { Delete, Edit } from '@mui/icons-material';
import { deletePlayer } from '../../redux/playersSlice';
import PlayerForm from './playerForm';

const PlayerList: React.FC = () => {
  const players = useSelector((state: any) => state.players);
  const dispatch = useDispatch();
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [isPlayerFormOpen, setIsPlayerFormOpen] = useState(false);

  const handleEdit = (playerId: any) => {
    console.log(playerId);
    setSelectedPlayer(playerId);
    setIsPlayerFormOpen(true);
  };

  const handleAdd = () => {
    setIsPlayerFormOpen(true);
  };

  const handleDelete = (playerId: any) => {
    dispatch(deletePlayer(playerId));
  };

  const handleClosePlayerForm = () => {
    setSelectedPlayer(null);
    setIsPlayerFormOpen(false);
  };

  return (
    <>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAdd}>
          Add Player
        </Button>
      </Grid>
      <br />
      <Paper elevation={0} variant="outlined">
        <TableContainer>
          <Table>
            <TableHead className="tablehead">
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Photo</TableCell>
                <TableCell sx={{ color: 'white' }}>First Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Last Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Gender</TableCell>
                <TableCell sx={{ color: 'white' }}>DOB</TableCell>
                <TableCell sx={{ color: 'white' }}>City</TableCell>
                <TableCell sx={{ color: 'white' }}>Club</TableCell>
                <TableCell sx={{ color: 'white' }}>Rank</TableCell>
                <TableCell sx={{ color: 'white' }}>Achievements</TableCell>
                <TableCell sx={{ color: 'white' }}>Edit</TableCell>
                <TableCell sx={{ color: 'white' }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.length ? (
                players.map((player: any) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <Avatar
                        alt={`${player.firstName} ${player.lastName}`}
                        src={player.photo}
                      />
                    </TableCell>
                    <TableCell>{player.firstName}</TableCell>
                    <TableCell>{player.lastName}</TableCell>
                    <TableCell>{player.gender}</TableCell>
                    <TableCell>{player.dateOfBirth}</TableCell>
                    <TableCell>{player.city}</TableCell>
                    <TableCell>{player.club}</TableCell>
                    <TableCell>{player.rank}</TableCell>
                    <TableCell>{player.achievements}</TableCell>
                    <TableCell>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        color="primary"
                        onClick={() => handleEdit(player)}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDelete(player.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    No players found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={isPlayerFormOpen} onClose={handleClosePlayerForm}>
        <DialogTitle sx={{ fontWeight: 'bold', backgroundColor:'#0047ab', color:'#fff' }}>
          {selectedPlayer ? 'Edit Player' : 'Add Player'}
        </DialogTitle>
        <DialogContent sx={{ margin: '5px', marginTop:'20px'}}>
          <PlayerForm player={selectedPlayer} onClose={handleClosePlayerForm} />
        </DialogContent>
        <DialogActions sx={{ fontWeight: 'bold', backgroundColor:'#0047ab', color:'#fff' }}>
          <Button sx={{ fontWeight: 'bold', backgroundColor:'#0047ab', color:'#fff' }} onClick={handleClosePlayerForm}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PlayerList;

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { addPlayer, updatePlayer } from '../../redux/playersSlice';

interface PlayerFormProps {
  player: Player | null;
  onClose?: () => void;
}

interface Player {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  city: string;
  club: string;
  rank: string;
  achievements: string;
  photo:  string;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ player, onClose }) => {
  const dispatch = useDispatch();
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [formData, setFormData] = useState<Player>({
    id: player ? player.id : uuidv4(),
    firstName: player ? player.firstName : '',
    lastName: player ? player.lastName : '',
    gender: player ? player.gender : 'male',
    dateOfBirth: player ? player.dateOfBirth : '',
    city: player ? player.city : '',
    club: player ? player.club : '',
    rank: player ? player.rank : '',
    achievements: player ? player.achievements : '',
    photo: player ? player.photo : '',
  });

  const handleInputChange = (e:any)  => {
    const { name, value, files } = e.target;
    // console.log(files);
    if (name === 'photo' && files && files.length > 0) {
      setPhotoName(files[0].name);
      setFormData((prevData) => ({
        ...prevData,
        photo: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (player) {
      dispatch(updatePlayer(formData));
    } else {
      dispatch(addPlayer(formData));
    }
    setFormData({
      id: uuidv4(),
      firstName: '',
      lastName: '',
      gender: 'male',
      dateOfBirth: '',
      city: '',
      club: '',
      rank: '',
      achievements: '',
      photo: '',
    });
    onClose && onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <FormLabel component="legend">City</FormLabel>
            <Select
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            >
              <MenuItem value="Calgary">Calgary</MenuItem>
              <MenuItem value="Edmonton">Edmonton</MenuItem>
              <MenuItem value="Toronto">Toronto</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <FormLabel component="legend">Club</FormLabel>
            <Select
              label="Club"
              name="club"
              value={formData.club}
              onChange={handleInputChange}
            >
              <MenuItem value="Calgary Flames">Calgary Flames</MenuItem>
              <MenuItem value="Edmonton Oilers">Edmonton Oilers</MenuItem>
              <MenuItem value="Toronto Titans">Toronto Titans</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Rank"
            name="rank"
            type="number"
            value={formData.rank}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Achievements"
            name="achievements"
            value={formData.achievements}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" component="label">
            Upload Photo
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleInputChange}
              style={{ display: 'none' }}
            />
          </Button>
          {formData.photo && <span>{photoName}</span>}
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            {player ? 'Update' : 'Add'} Player
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PlayerForm;

import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';


interface Labels {
  [key: number]: string;
}

const labels: Labels = {
  1: 'Poor',
  2: 'Fair',
  3: 'Average',
  4: 'Good',
  5: 'Excellent',
};

function getLabelText(value: number): string {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export const HoverRating: React.FC = () => {
  const [value, setValue] = useState<number>(2);
  const [hover, setHover] = useState<number>(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(_event: React.ChangeEvent<{}>, newValue: number | null) => {
          if (newValue !== null) {
            setValue(newValue);
          }
        }}
        onChangeActive={(_event: React.ChangeEvent<{}>, newHover: number) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }} className="live-rating badge bg-success/10 text-success py-1 rounded-md ltr:ml-3 rtl:mr-3">
          {hover !== -1 ? hover : value}
        </Box>
      )}
    </Box>
  );
};
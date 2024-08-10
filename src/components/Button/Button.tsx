import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { lighten } from '@mui/system';

type CustomButtonProps = {
  text: string;
  size?: 'small' | 'medium' | 'large';
  borderRadius?: string | number;
} & ButtonProps;

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  size = 'medium',
  borderRadius = '4px',
  ...props
}) => {
  const color = '#1976d2';
  const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small':
        return {
          padding: '6px 12px',
          fontSize: '12px',
        };
      case 'medium':
        return {
          padding: '8px 16px',
          fontSize: '14px',
        };
      case 'large':
        return {
          padding: '10px 20px',
          fontSize: '16px',
        };
      default:
        return {};
    }
  };

  const sizeStyles = getSizeStyles(size);

  return (
    <Button
      {...props}
      sx={{
        backgroundColor: color,
        borderRadius: borderRadius,
        padding: sizeStyles.padding,
        fontSize: sizeStyles.fontSize,
        '&:hover': {
          backgroundColor: lighten(color, 0.2), // Lighten the color on hover
        },
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;

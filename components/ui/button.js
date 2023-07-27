// components/ui/button.js
import React from 'react';
import Link from 'next/link';
import classes from './button.module.css';

const Button = React.forwardRef(({ link, children, ...rest }, ref) => {
  // If the 'link' prop is present, render a Next.js Link component
  if (link) {
    return (
      <Link href={link} passHref>
        <div ref={ref} className={classes.button} {...rest}>
          {children}
        </div>
      </Link>
    );
  }

  // If there is no 'link' prop, render a regular button
  return (
    <button ref={ref} className={classes.button} {...rest}>
      {children}
    </button>
  );
});

export default Button;

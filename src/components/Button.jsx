

import ButtonSvg from '../assets/svg/ButtonSvg';

// Define the Button component
const Button = ({className, href, onClick, children, px, white }) => {
  // Define the classes for the button
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${px || 'px-7'} ${white ? 'text-n-8' : 'text-n-1'} ${className || ''}`;
  const spanClasses ='relative z-10';
  // Render the button element
  const renderButton = () => (
    <button onClick={onClick} className={classes}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </button>
  );

  const renderLink=()=>(
    <a href={href} className={classes}>
        <span className={spanClasses}>{children}</span>
        {ButtonSvg(white)}

    </a>
  )

  return href?
  renderLink():renderButton();
};

export default Button;

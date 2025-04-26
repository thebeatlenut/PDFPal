import { SnackbarProvider } from "notistack";
import React, { ReactNode } from "react";

/**Proptype for CustomSnackbar */
interface CustomSnackbarProps {
  children: ReactNode;
}

/**Snackbar component with global setting
 * @param {CustomSnackbarProps} props - The component props.
 */
const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3} // Set the maximum number of snackbars that can be stacked at the same time
      autoHideDuration={3000} // Set the default timeout to 3 seconds (3000ms)
      anchorOrigin={{ horizontal: "right", vertical: "top" }} // set default position to be top right
      disableWindowBlurListener // Expire even if window not focused
      style={{ whiteSpace: "pre-line" }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default CustomSnackbar;

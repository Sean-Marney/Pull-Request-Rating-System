// Import the Skeleton component from the Material-UI library (MUI)
import { Skeleton } from "@mui/material";

// Create a functional component named SkeletonComponent
// It takes four props: variant, width, height, and margin
export default function SkeletonComponent({ variant, width, height, margin }) {
    // Return the Skeleton component with the provided props as attributes
    return (
        <Skeleton
            variant={variant}
            width={width}
            height={height}
            style={{ margin }}
        />
    );
}

// Define default values for the props of the SkeletonComponent
// These values will be used if no values are provided when the component is used
SkeletonComponent.defaultProps = {
    // Set the default variant to 'rectangular'
    variant: "rectangular",
    // Set the default width to 1000
    width: 1000,
    // Set the default height to 145
    height: 145,
    // Set the default margin to '8px 0px'
    margin: "8px 0px",
};

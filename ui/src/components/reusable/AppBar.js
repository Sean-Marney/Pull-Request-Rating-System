// Import the necessary MUI components: AppBar, Toolbar, and Typography
import { AppBar, Toolbar, Typography } from "@mui/material";

// Create a functional component named CustomAppBar
// It takes three props: title, position, and backgroundColor
export default function CustomAppBar(props) {

    // Destructure the props object to get the individual prop values
    const { title, position, backgroundColor } = props;

    // Return the AppBar component with the provided props as attributes
    return (
        <AppBar
            // Set the position of the AppBar
            position={position}
            // Use the sx prop to set the background color of the AppBar using the backgroundColor prop
            sx={{ backgroundColor: backgroundColor }}
        >
            {/* Add a Toolbar component inside the AppBar as a container for the AppBar's content */}
            <Toolbar>
                {/* Add a Typography component to display the title */}
                <Typography
                    // Set the Typography variant to "h6"
                    variant="h6"
                    // Use the sx prop to apply custom styles to the Typography component
                    sx={{
                        flexGrow: 1,
                        fontSize: "25px",
                        fontFamily: "Bahnschrift",
                    }}
                >
                    {/* Render the title prop as the text of the Typography component */}
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

// Define default values for the props of the CustomAppBar component
// These values will be used if no values are provided when the component is used
CustomAppBar.defaultProps = {
    // Set the default title to "PullMaster.io"
    title: "PullMaster.io",
    // Set the default position to "static"
    position: "static",
    // Set the default background color to "#1b2437"
    backgroundColor: "#1b2437",
};

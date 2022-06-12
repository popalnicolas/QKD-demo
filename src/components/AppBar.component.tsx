import { Container, AppBar as MuiAppBar, Grid, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function AppBar() {
    return ( 
        <Box sx={{ flexGrow: 1 }}>
        <MuiAppBar position="static" sx={{padding: 2}}>
            <Container maxWidth="sm">
                <Grid container textAlign="center">
                    <Grid item xs={6}>
                        <Link to="/qkd" style={{textDecoration: "none"}}><Button color="secondary">With Eavesdropper</Button></Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Link to="/qkd/eve" style={{textDecoration: "none"}}><Button color="secondary">With Eavesdropper</Button></Link>
                    </Grid>
                </Grid>
            </Container>
        </MuiAppBar>
        </Box>
     );
}

export default AppBar;
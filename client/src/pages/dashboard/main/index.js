/* eslint-disable */
// material
import { styled } from '@material-ui/core/styles'
// components
import Page from '../../../components/Page'

import { Container, Typography, Grid, Tabs, Tab, Box, List, ListItem, ListItemText, ListItemButton, Link } from '@material-ui/core'

import useAuth from "hooks/useAuth";

const RootStyle = styled(Page)({
  paddingTop: 120,
  paddingBottom: 105,
  height: '100%',
})

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}))

export default function Dashboard() {
  const { logout } = useAuth();
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <RootStyle>
      <ContentStyle>
        <Container sx={{minHeight: '600px'}}>
          <Typography variant="h3" component="h1" paragraph sx={{textAlign: 'center', mt: 3}}>
            My Account
          </Typography>

          <Grid container>
            <Grid item xs={12} md={3}>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                  <ListItemButton component="a" href="/dashboard">
                    Dashboard
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton component="a" href="/dashboard/order">
                    Orders
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton component="a" href="/dashboard/account">
                    Account Details
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton onClick={logout}>
                    Logout
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container sx={{padding: '0 20px'}}>
                <Typography variant="h6" sx={{mb: 2, fontWeight: 300}}>
                  Hello <b> {user.role} </b> (not <b> {user.role} </b> Logout)
                </Typography>
                <Typography variant="h6" sx={{fontWeight: 300}}>
                  From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </ContentStyle>
    </RootStyle>
  )
}

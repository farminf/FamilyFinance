import React from 'react';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames'
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';
import Constants from '../utils/constants';
import AddIcon from 'material-ui-icons/NoteAdd';
import DashboardIcon from 'material-ui-icons/Dashboard';
import ShowChartIcon from 'material-ui-icons/ShowChart';
import AccountBalanceIcon from 'material-ui-icons/AccountBalance';
import Hidden from 'material-ui/Hidden';
import {ListItem, ListItemText} from 'material-ui/List';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

const drawerWidth = 280;
const styles = theme => ({
    root: {
        width: '100%',
        height: 'auto',
        zIndex: 1,
        overflow: 'hidden'
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    hide: {
        display: 'none'
    },

    drawerPaper: {
        position: 'fix',
        height: '100%',
        width: drawerWidth,
        transition: theme
            .transitions
            .create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    drawerPaperClose: {
        width: 60,
        overflowX: 'hidden',
        transition: theme
            .transitions
            .create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
    },
    drawerInner: {
        // Make the items inside not wrap when transitioning:
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    button: {
        margin: theme.spacing.unit
    },

    avatar: {
        margin: 10
    },

    appBar: {
        position: 'fixed',
        zIndex: theme.zIndex.navDrawer + 1,
        transition: theme
            .transitions
            .create([
                'width', 'margin'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme
            .transitions
            .create([
                'width', 'margin'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    appFrame: {

        position: 'relative',
        display: 'flex',
        width: '100%'
    },
    // content: {
    //     width: '100%',
    //     flexGrow: 1,
    //     padding: theme.spacing.unit * 3,
    //     height: 'calc(100% - 56px)',
    //     marginTop: 26,
    //     [
    //         theme
    //             .breakpoints
    //             .up('sm')
    //     ]: {
    //         height: 'calc(100% - 64px)',
    //         marginTop: 64
    //     }
    // },
    content: {
        width: '100%',
        flexGrow: 1,
        padding: 20,
        height: 'calc(100% - 50px)',
        marginTop: 26,
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            height: 'calc(100% - 64px)',
            width: 'calc(100% - 60px)',
            marginTop: 24,
            marginBottom: 80,
            margin: 40
        },
        [theme.breakpoints.down('sm')]: {
            padding:0,
            marginTop: 44,
            marginBottom: 80
          },
    }
});

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            mobileOpen: false
        }
    }
    handleDrawerToggle = () => {
        this.setState({
            mobileOpen: !this.state.mobileOpen
        });
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };
    render() {
        const {classes, theme} = this.props;

        const items = (

            <List>
                <div>

                    <NavLink
                        to="/dashboard"
                        activeClassName="is-active"
                        activeStyle={{
                        fontWeight: 'bold',
                        color: 'red'
                    }}
                        style={{
                        textDecoration: 'none'
                    }}>
                        <ListItem button divider>
                            <ShowChartIcon/>
                            <ListItemText primary="Dashboard"/>
                        </ListItem>
                    </NavLink>
                    <NavLink
                        to="/accounts"
                        activeClassName="is-active"
                        activeStyle={{
                        fontWeight: 'bold',
                        color: 'red',
                        fontColor: 'red'
                    }}
                        style={{
                        textDecoration: 'none'
                    }}>
                        <ListItem button divider>
                            <AccountBalanceIcon/>
                            <ListItemText primary="Accounts"/>
                        </ListItem>
                    </NavLink>
                    <NavLink
                        to="/transactions"
                        activeClassName="is-active"
                        activeStyle={{
                        fontWeight: 'bold',
                        color: 'red'
                    }}
                        style={{
                        textDecoration: 'none'
                    }}>
                        <ListItem button divider>
                            <AddIcon/>
                            <ListItemText primary="Transactions"/>
                        </ListItem>
                    </NavLink>
                    <NavLink
                        to="/categories"
                        activeClassName="is-active"
                        activeStyle={{
                        fontWeight: 'bold',
                        color: 'red'
                    }}
                        style={{
                        textDecoration: 'none'
                    }}>
                        <ListItem button divider>
                            <DashboardIcon/>
                            <ListItemText primary="Categories"/>
                        </ListItem>
                    </NavLink>
                </div>
            </List>

        );

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar
                        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                        position="static"
                        color="primary">
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="contrast"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, this.state.open && classes.hide)}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                {this.props.title}
                            </Typography>

                            <Button onClick={this.props.startLogout} raised className={classes.button}>
                                {Constants.ASSIGNS_LOGOUT}
                            </Button>
                            <Avatar alt="Name" src={this.props.avatarSrc} className={classes.avatar}/>

                        </Toolbar>
                    </AppBar>
                    <Hidden mdUp>
                        <Drawer
                            type="temporary"
                            anchor={theme.direction === 'rtl'
                            ? 'right'
                            : 'left'}
                            open={this.state.open}
                            classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
                        }}
                            onClose={this.handleDrawerToggle}
                            ModalProps={{
                            keepMounted: true
                        }}>
                            <div className={classes.drawerInner}>
                                <div className={classes.drawerHeader}>
                                    <IconButton onClick={this.handleDrawerClose}>
                                        {theme.direction === 'rtl'
                                            ? <ChevronRightIcon/>
                                            : <ChevronLeftIcon/>}
                                    </IconButton>
                                </div>
                                <Divider/> {items}
                            </div>
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            type="permanent"
                            classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
                        }}
                            open={this.state.open}>
                            <div className={classes.drawerInner}>
                                <div className={classes.drawerHeader}>
                                    <IconButton onClick={this.handleDrawerClose}>
                                        {theme.direction === 'rtl'
                                            ? <ChevronRightIcon/>
                                            : <ChevronLeftIcon/>}
                                    </IconButton>
                                </div>
                                <Divider/> {items}
                            </div>
                        </Drawer>
                    </Hidden>
                </div>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </div>

        )
    }
}
const mapStateToProps = (state, props) => ({avatarSrc: state.auth.photoURL});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Header));
import {
    Home,
    List,
    LogIn
} from 'react-feather';

export const MENUITEMS = [
    {
        path: '/events', title: 'All Events', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'Your Events', icon: List, type: 'sub', active: false, children: [
            { path: '/yourEvents/events', title: 'View', type: 'link' },
            { path: '/yourEvents/addEvent', title: 'Add Event', type: 'link' },
        ]
    },
    // {
    //     title: 'Logout',path:'/login', icon: LogIn, type: 'link', active: false
    // }
]

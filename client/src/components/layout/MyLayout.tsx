import { AppBar, Layout, ToggleThemeButton } from 'react-admin';

const MyAppBar = props => (
    <AppBar
        {...props}
        toolbar={<ToggleThemeButton />}
    />
);

export const MyLayout = props => (
    <Layout
        {...props}
        appBar={MyAppBar}
    />
)

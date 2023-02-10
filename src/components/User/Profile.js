import { useContext, useEffect, useState } from 'react';
import { hostUrl } from '../../common/urls';
import { UserContext } from '../../context/UserContext';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ChangeProfile from './ChangeProfile';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

export default function Profile() {
    const [userInfo, setUserInfo] = useState({});
    const { user } = useContext(UserContext)

    const handleOnChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const getUserInfo = () => {
        if (!user._id) return
        fetch(`${hostUrl}/user/${user._id}`)
            .then((resp) => resp.json())
            .then(setUserInfo);
    };

    useEffect(getUserInfo, [user._id]);

    return (
        <Tabs>
            <TabList>
                <Tab>Profile</Tab>
                <Tab>Change email</Tab>
                <Tab>Change password</Tab>
            </TabList>

            <TabPanel>
                <ChangeProfile handleOnChange={handleOnChange} userInfo={userInfo} user={user} />
            </TabPanel>
            <TabPanel>
                <ChangeEmail handleOnChange={handleOnChange} userInfo={userInfo} user={user} />
            </TabPanel>
            <TabPanel>
                <ChangePassword handleOnChange={handleOnChange} userInfo={userInfo} user={user} />
            </TabPanel>
        </Tabs>
        
    );
}

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Launches from './Launches';
import Rockets from './Rockets';
import UpComingLaunches from './UpComingLaunches';
import GetLaunchById from './GetLaunchById';
import GetRocketById from './GetRocketById';
import Users from './Users';
import UserForm from './UserForm';
import GetUpComingLaunchById from './GetUpComingLaunchById';
// import Error404 from '../Error404';
import Apollo from '../Apollo';
import { routes } from '../common/constants';
import './styles/global/styles.less';

export default function Home() {
  return (
    <Router>
      <Apollo>
        <Switch>
          {/* <Route exact path={routes.ERROR_404} component={Error404}></Route> */}
          <Route exact path={routes.DASHBOARD} component={UpComingLaunches} />
          <Route exact path={routes.LAUNCHES} component={Launches} />
          <Route exact path={routes.ROCKETS} component={Rockets} />
          <Route exact path={routes.USERS} component={Users} />
          <Route exact path={routes.CREATE_USER} component={UserForm} />
          <Route exact path={routes.EDIT_USER} component={UserForm} />
          <Route exact path={routes.ROCKET_BY_ID} component={GetRocketById} />
          <Route exact path={routes.LAUNCH_BY_ID} component={GetLaunchById} />
          <Route
            exact
            path={routes.UPCOMING_LAUNCH_BY_ID}
            component={GetUpComingLaunchById}
          />
        </Switch>
      </Apollo>
    </Router>
  );
}

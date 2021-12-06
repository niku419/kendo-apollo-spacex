import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Card, Row, Breadcrumb } from 'antd';
import { routes } from '../common/constants';
import { GET_ROCKET_BY_ID } from './graphql/queries/queries';
import LoaderCardComponent from '../components/LoaderCardComponent';

export default function GetLaunchById() {
  const { rocketId } = useParams();
  const { loading, error, data } = useQuery(GET_ROCKET_BY_ID, {
    variables: { id: rocketId }
  });
  if (loading) {
    return <LoaderCardComponent loading={loading} />;
  }
  if (error) return <p>Error {JSON.stringify(error)}</p>;
  return (
    <div className="mar">
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href={routes.ROCKETS}>Rockets</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{data.rocket.name}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="byID">
        <div className="center mar">
          <div className="heading">
            <h1>Rocket by ID</h1>
          </div>
          <div>
            <div loading={loading}>
              <div className="heading">
                <h3>
                  {data.rocket.name} by {data.rocket.company} from{' '}
                  {data.rocket.country}
                </h3>
              </div>
              <div>{data.rocket.description}</div>
              <div className="pad">
                <div className="inline bold">Boosters: {' '}</div>
                <div className="inline">{' '}{data.rocket.boosters}</div>
              </div>
              <div className="pad">
                <div className="inline bold">Engines: {' '}</div>
                <div className="inline">{' '}{data.rocket.engines.engines_loss_max || 'null'}</div>
              </div>
              <div className="pad">
                <div className="inline bold">Diameter: {' '}</div>
                <div className="inline">{' '} {data.rocket.diameter.meters}</div>
              </div>
              <div className="pad">
                <div className="inline bold">Weight: {' '}</div>
                <div className="inline">{' '}{data.rocket.mass.kg}kg</div>
              </div>
              <div className="pad">
                <div className="inline bold">Height: {' '}</div>
                <div className="inline">{' '}{data.rocket.height.meters} m</div>
              </div>
              <div className="pad">
                <div className="inline bold">Cost: {' '}</div>
                <div className="inline">{' '}{data.rocket.cost_per_launch}</div>
              </div>
              <div>
                {' '}
                {data.rocket.landing_legs.number} landing legs made with{' '}
                {data.rocket.landing_legs.material || 'null'}
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

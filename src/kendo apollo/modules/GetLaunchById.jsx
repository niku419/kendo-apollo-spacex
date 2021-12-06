import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBody,
  Avatar
} from '@progress/kendo-react-layout';
import { BreadcrumbLink } from '@progress/kendo-react-layout'
import { dateConvert } from '../Apollo';
import { GET_LAUNCH_BY_ID } from './graphql/queries/queries';
import LoaderComponent from '../components/LoaderComponent';

export default function GetLaunchById() {
  const { launchId } = useParams();
  const { loading, error, data } = useQuery(GET_LAUNCH_BY_ID, {
    variables: {
      id: launchId
    }
  });
  if (loading) {
    return <LoaderComponent loading={loading} />;
  }
  if (error) return <p>Error {JSON.stringify(error)}</p>;
  return (
    <div>
      <div>
        <a href='/launches'>
          <BreadcrumbLink dir='rtl' id='launches' text='Launches'>
          </BreadcrumbLink>
        </a>
        /{' '}{data.launch.mission_name}
      </div>
      <div>
        <div className="heading">
          <h2>{data.launch.mission_name}</h2>
        </div>
        <div className="center mar"  style={{marginTop: '3rem'}}>
          <div  style={{display: "flex", justifyContent: "space-evenly", flexWrap: "wrap"}}>
            {' '}
            {data.launch.links.flickr_images.map((imageLink) => (
              <img
                key={imageLink}
                src={imageLink}
                className="image-style"
                alt="img"
              />
            ))}
          </div>
          <div>
            <div>
              
              <div>
                <div className="mar">{data.launch.details}</div>
                <div className="mar">
                  <div className="pad">
                    <div className="inline bold">Ship name:{' '}</div>
                    <div className="inline">{' '}{data.launch.ships.name || "-"}</div>
                  </div>
                  <div className="pad">
                    <div className="inline bold">Ship weight:{' '}</div>
                    <div className="inline">{' '}{data.launch.ships.weight_kg || "-"}</div>
                  </div>
                  <div className="pad">
                    <div className="inline bold">Ship was built in:{' '}</div>
                    <div className="inline">{' '}{data.launch.ships.year_built || '-'}</div>
                  </div>
                  <div className="pad">
                    <div className="inline bold">Rocket name:{' '}</div>
                    <div className="inline">{' '}
                      <a href={`/rockets/${data.launch.rocket.rocket.id}`}>
                        {data.launch.rocket.rocket_name || "-"}
                      </a>
                    </div>
                  </div>
                  <div className="pad">
                    <div className="inline bold">Launch site:{' '}</div>
                    <div className="inline">{' '}{data.launch.launch_site.site_name_long || "-"}</div>
                  </div>
                  <div className="pad">
                    <div className="inline bold">Launch Date: {' '}</div>
                    <div className="inline">{' '}{dateConvert(data.launch.launch_date_local)}</div>
                  </div>
                  <div className="pad">
                    <div className="inline bold">Video link:{' '}</div>
                    <div className="inline">
                      <a href={data.launch.links.video_link}>
                        {data.launch.links.video_link}
                      </a>
                    </div>
                  </div>
                  <div className="pad">
                    <div className="inline bold">Want to learn more about this? {' '}</div>
                    <div className="inline"><a href={data.launch.links.article_link}>here</a></div>
                  </div>
                  <div className="pad">
                    <div className="inline bold">Was the launch successful ? {' '}</div>
                    <div className="inline">{' '}{data.launch.launch_success || "-"}</div>
                  </div>
                  <div className="pad">
                    <div className="inline bold">Is the launch upcoming ? {' '}</div>
                    <div className="inline">{' '}{data.launch.upcoming || "-"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
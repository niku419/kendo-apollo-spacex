import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  BreadcrumbLink
} from '@progress/kendo-react-layout';
import LoaderCardComponent from '../components/LoaderCardComponent';
import { GET_LAUNCHES, TOTAL_LAUNCH_COUNT } from './graphql/queries/queries';
import { routes } from '../common/constants';
import { Pager } from "@progress/kendo-react-data-tools";

export default function Launches() {
  const history = useHistory();
  const totalCountData = useQuery(TOTAL_LAUNCH_COUNT);
  const totalCount =
    !totalCountData.loading && totalCountData.data.launches.length;
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const { loading, error, data, fetchMore } = useQuery(GET_LAUNCHES, {
    variables: {
      limit: 10,
      offset
    }
  });
  function redirect(id) {
    console.log(id);
    history.push(`launches/${id}`);
  }
  // function handleSizeChange(current, size) {
  //   setItemsPerPage(size);
  //   setPage(current);
  //   fetchMore({
  //     variables: { limit: size, offset: (current - 1) * size }
  //   }).then((res) => setTableData(res.data));
  //   totalCountData.refetch();
  // }
  function handlePageChange(pageNumEvent) {
    setItemsPerPage(pageNumEvent.take);
    setOffset(pageNumEvent.skip);
    fetchMore({
      variables: { limit: pageNumEvent.take, offset: pageNumEvent.skip }
    }).then((res) => setTableData(res.data));
    totalCountData.refetch();
    setPage(pageNumEvent.skip/10+1);
  }
  if (loading) {
    return <LoaderCardComponent loading={loading} />;
  }
  if (error) return <p>Error {JSON.stringify(error)}</p>;
  return (
    <div className="mar">
      <a href="/launches">
        <BreadcrumbLink dir="rtl" id="launches" text="Launches" />
      </a>
      <div className="heading">
        <h1>Launches</h1>
      </div>
      <div
        className="row"
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        {((tableData.launches && tableData.launches.length > 0) ||
          data.launches.length > 0) &&
          (tableData.launches && tableData.launches.length > 0
            ? tableData
            : data
          ).launches.map((launch) => (
            <div 
              key={launch.id}
              onClick={() => redirect(launch.id)}
              className="col-md-3 col-sm-12 col-sm-6 col-lg-3 round k-card card-hover"
              style={{ alignItems: 'stretch' }}
            >
              <CardHeader className="heading">
                <CardTitle>{launch.mission_name}</CardTitle>
              </CardHeader>
              <CardBody className="mar">{launch.details || "No Description"}</CardBody>
            </div>
          ))}
      </div>
      <div className="flex-end">
        <Pager
          skip={itemsPerPage * (page - 1)}
          take={itemsPerPage}
          total={totalCount}
          onPageChange={handlePageChange}
          buttonCount={5}
          info={true}
          type="numeric"
        />
      </div>
    </div>
  );
}

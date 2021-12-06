import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ROCKETS, TOTAL_ROCKET_COUNT } from './graphql/queries/queries';
import LoaderCardComponent from '../components/LoaderCardComponent';
import { routes } from '../common/constants';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  BreadcrumbLink
} from '@progress/kendo-react-layout';
import { Pager } from "@progress/kendo-react-data-tools";

export default function Launches() {
  const [offset, setOffset] = useState(0);
  const [tableData, setTableData] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const { loading, error, data, fetchMore } = useQuery(GET_ROCKETS, {
    variables: {
      limit: 10,
      offset
    }
  });
  const totalCountData = useQuery(TOTAL_ROCKET_COUNT);
  const totalCount =
    !totalCountData.loading && totalCountData.data.rockets.length;

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
      <a href="/rockets">
        <BreadcrumbLink dir="rtl" id="rockets" text="Rockets" />
      </a>
      <div className="heading">
        <h1>Rockets</h1>
      </div>
      <div
        className="row"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        {((tableData.rockets && tableData.rockets.length > 0) ||
          data.rockets.length > 0) &&
          (tableData.rockets && tableData.rockets.length > 0
            ? tableData
            : data
          ).rockets.map((rocket) => (
            <div 
              key={rocket.id}
              onClick={() => redirect(rocket.id)}
              className="col-md-3 col-sm-12 col-lg-3 round k-card card-hover"
              style={{ alignItems: 'stretch' }}
            >
              <CardHeader className="heading">
                <CardTitle>{rocket.name}</CardTitle>
              </CardHeader>
              <CardBody className="mar">{rocket.description}</CardBody>
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

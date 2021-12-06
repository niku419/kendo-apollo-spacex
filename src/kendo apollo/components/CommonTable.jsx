import { Table } from 'antd';
import React from 'react';

const TableComponent = (props) => {
  const {
    columns,
    dataSource = [],
    loadingData = false,
    tableClassName = '',
    ...rest
  } = props;

  // const [paginationProps, setPaginationProps] = useState({
  //   pageSizeOptions: [10, 15, 20, 50, 100],
  //   defaultPageSize: 10,
  //   responsive: true,
  //   showSizeChanger: true,
  //   position: ['bottomCenter']
  // });

  // useEffect(() => {
  //   setPaginationProps({ ...paginationProps, ...paginationConfig });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [paginationConfig]);

  return (
    <Table
      columns={columns}
      bordered // by default false if want then pass true from props
      dataSource={dataSource}
      className={tableClassName}
      pagination={false} // for server side or client side pagination
      loading={{
        spinning: loadingData, // keep it true to set loader
        size: 'large' // currently kept large loader
      }}
      {...rest}
    />
  );
};

export default TableComponent;

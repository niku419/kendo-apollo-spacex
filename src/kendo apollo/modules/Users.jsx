import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Pager } from "@progress/kendo-react-data-tools";
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn } from '@progress/kendo-react-grid'
import { DELETE_USER } from './graphql/mutations/mutations';
import LoaderComponent from '../components/LoaderComponent';
import { client } from '../Apollo';
import { routes } from '../common/constants';
import { BreadcrumbLink } from '@progress/kendo-react-layout'
import { FloatingLabel } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import {
  GET_USERS,
  GET_DATA_COUNT,
  NEW_QUERY
} from './graphql/queries/queries';

export default function Users() {
  const totalCountData = useQuery(GET_DATA_COUNT);
                                                                                                                                                       
  const [search, setSearch] = useState('');
  // const [nameSearch, setNameSearch] = useState("")
  // const [rocketSearch, setRocketSearch] = useState("")
  const totalCount =
    !totalCountData.loading && totalCountData.data.users.length;
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [count, setCount] = useState(totalCount);

  const { loading, error, data, refetch, fetchMore } = useQuery(GET_USERS, {
    variables: {
      limit: itemsPerPage
    },
    fetchPolicy: 'network-only'
  });
  const [deleteUser] = useMutation(DELETE_USER);
  const anchor = useRef(null);
  const [show, setShow] = useState(false);
  function filter(e) {
    setSearch(e.target.value);
    const temp = '%';
    const searchText = temp.concat(e.target.value, temp);
    client
      .query({
        query: NEW_QUERY,
        variables: {
          search: searchText,
          limit: itemsPerPage
        }
      })
      .then((res) => {
        setTableData(res.data.users);
        setCount(res.data.users.length);
      });
  }
  // function confirm(_eq) {
  //   deleteUser({ variables: { _eq } });
  //   refetch();
  //   totalCountData.refetch().then((res) => setCount(res.data.users.length));
  //   message.success('user deleted!');
  // }
  // function cancel() {
  //   message.error('Clicked on No');
  // }
  const InlineComponent = ({id}) => {
    return (
      <td>
        <a style={{marginRight: "2rem"}} children={tableData} href={`/users/${id}/edit`}>
          edit
        </a>
        <a href={`#${id}`} onClick={() => setShow(!show)}>delete</a>              
        <div>
          {show && (
            <Dialog title={"Please confirm"} onClose={() => setShow(!show)}>
              <p
                style={{
                  margin: "25px",
                  textAlign: "center",
                }}
              >
                Are you sure you want to continue?
              </p>
              <DialogActionsBar>
                <button className="k-button" onClick={() => setShow(!show)}>
                  No
                </button>
                <Button primary className="k-button" onClick={() => confirm(id)}>
                  Yes
                </Button>
              </DialogActionsBar>
            </Dialog>
          )}
        </div>
      </td>
    )
  }
  function handlePageChange(pageNumEvent) {
    console.log(pageNumEvent.take, pageNumEvent.skip, page);
    setItemsPerPage(pageNumEvent.take);
    setPage(pageNumEvent.skip/10);
    fetchMore({
      variables: { limit: pageNumEvent.take, offset: pageNumEvent.skip }
    }).then((res) => {
      console.log(res.data.users);
      setTableData(res.data.users);
    });
    totalCountData.refetch().then((res) => setCount(res.data.users.length));
  }
  async function confirm(_eq) {
    console.log(_eq)
    await deleteUser({ variables: { _eq } }).then(() => console.log("don"))
    await fetchMore({
      variables: { limit: itemsPerPage, offset: (page-1)*itemsPerPage }
    }).then((res) => {
      console.log(res.data.users);
      setTableData(res.data.users);
      setShow(!show)
    });
    await totalCountData.refetch().then(res => setCount(res.data.users.length))
  }

  if (loading) {
    return (
      <div className="center">
        <LoaderComponent />
      </div>
    );
  }
  if (error) {
    return <p>Error {JSON.stringify(error)}</p>;
  }
  return (
    <div className="mar">
      <a href='/users'><BreadcrumbLink dir='rtl' id='users' text='Users'></BreadcrumbLink></a>
      <div className="heading">
        <h1>Users</h1>
      </div>
      <div className="flex-between">
        <div className="pad" >
          <a href="/users/create">
            <Button primary="true" style={{padding: "0.5rem"}}>
              Create User
            </Button>
          </a>
        </div>
        {/* <div className="center">
          <Input value={search} onChange={filter}/>
        </div> */}
        <div>
          <FloatingLabel
            label={"Search"}
            editorId={"input-id"}
            editorValue={search}
          >
            <Input
              id={"input-id"}
              value={search}
              onChange={filter}
            />
          </FloatingLabel>
        </div>
      </div>
      <div>
        <Grid 
          data={tableData.length > 0 ? tableData : data.users}
          pageable={false}  
        >
          <GridColumn field="name" title="Name" />
          <GridColumn field="rocket" title="Rocket" />
          <GridColumn field="action"classNAME="flex-center" title="Action" cell={props => (
            <InlineComponent id={props.dataItem.id} />
            // <td>
            //   <a style={{marginRight: "2rem"}} children={tableData} href={`/users/${props.dataItem.id}/edit`}>
            //     edit
            //   </a>
            //   <a href='#delete' onClick={() => setShow(!show)}>delete</a>              
            //   <div>
            //     {show && (
            //       <Dialog title={"Please confirm"} onClose={() => setShow(!show)}>
            //         <p
            //           style={{
            //             margin: "25px",
            //             textAlign: "center",
            //           }}
            //         >
            //           Are you sure you want to continue?
            //         </p>
            //         <DialogActionsBar>
            //           <button className="k-button" onClick={() => setShow(!show)}>
            //             No
            //           </button>
            //           <Button primary className="k-button" onClick={() => confirm(props.dataItem.id)}>
            //             Yes
            //           </Button>
            //         </DialogActionsBar>
            //       </Dialog>
            //     )}
            //   </div>
            // </td>
            // confirm(props.dataItem.id)
          )}/>
        </Grid>
        <Pager
          skip={itemsPerPage * (page - 1)}
          take={itemsPerPage}
          total={data.users.length > 0 ? totalCount : count}
          onPageChange={handlePageChange}
          buttonCount={5}
          info={true}
          previousNext={true}
          type="numeric"
        />
      </div>
    </div>
  );
}
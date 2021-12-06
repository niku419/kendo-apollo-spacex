import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { GET_USER } from './graphql/queries/queries';
import { EDIT_USER, ADD_USER } from './graphql/mutations/mutations';
import LoaderComponent from '../components/LoaderComponent';
import { Form, Field, FormElement, FieldWrapper } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { FormInput } from '../components/form-components';
import { userNameValidator, URLValidator, requiredValidator } from "../components/Validators";
import { BreadcrumbLink } from '@progress/kendo-react-layout';

export default function UserForm() {
  const { userId } = useParams();
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { _eq: userId }
  });
  const [editUser] = useMutation(EDIT_USER);
  const [addUser] = useMutation(ADD_USER);
  const [twitter, setTwitter] = useState("");
  const [rocket, setRocket] = useState('');
  const [name, setName] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [disabled, setDisabled] = useState(false);
  
  function redir(clear){
    clear()
    history.push('/users')
  }
  async function handleSubmit(e) {
    setDisabled(true);
    if (userId) {
      // console.log(userId, twitter, rocket, name)
      await editUser({
        variables: { name: e.name, rocket: e.rocket, twitter: e.twitter, _eq: userId }
      }).then(() => {
        setDisabled(false);
        setRedirect(true);
      });
    }else{
      await addUser({
        variables: { name: e.name, rocket: e.rocket, twitter: e.twitter }
      }).then(() => {
        setDisabled(false);
        setRedirect(true);
      });
    }
  }
  useEffect(() => {
    setName(data?.users[0]?.name);
    setRocket(data?.users[0]?.rocket);
    setTwitter(data?.users[0]?.twitter);
  }, [data, userId, name, rocket, twitter])

  if (loading) {
    return (
      <div className="center">
        <LoaderComponent />
      </div>
    );
  }
  if (error) return `error! ${error.message}`;
  return (
    <div className="mar" style={{marginTop: "1rem"}}>
      {redirect && <Redirect to="/users" />}
      <a href='/users'><BreadcrumbLink dir='rtl' id='users' text='Users'></BreadcrumbLink></a>/{' '}{userId ? name: ""}
        <div className="heading">
          <h1>{userId ? 'Edit User' : 'Create User'}</h1>
        </div>
        <div className="center">
          <Form
            initialValues={{
              name: userId ? data?.users[0]?.name : "",
              rocket: userId ? data?.users[0]?.rocket : "",
              twitter: userId ? data?.users[0]?.twitter : ""
            }}
            onSubmit={handleSubmit}
            render={(formRenderProps) => (
              <FormElement
                style={{
                  width: 400,
                  height: '100%',
                }}
              >
                {redirect && <Redirect to='/users'/>}
                <Field
                  id={"name"}
                  name={"name"}
                  label={"Name"}
                  component={FormInput}
                  validator={userNameValidator}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Field
                  id={"rocket"}
                  name={"rocket"}
                  label={"Rocket"}
                  component={FormInput}
                  validator={requiredValidator}
                  value={rocket}
                  onChange={(e) => setRocket(e.target.value)}
                />
                <Field
                  id={"twitter"}
                  name={"twitter"}
                  label={"Twitter URL"}
                  component={FormInput}
                  value={twitter}
                  validator={URLValidator}
                  onChange={(e) => setTwitter(e.target.value)}
                />
                <div className="k-form-buttons flex-between">
                  <Button
                    primary
                    type={"submit"}
                    disabled={disabled}
                    style={{padding: "0.5rem"}}
                  >
                  {userId ? 'Update' : 'Create'}
                  </Button>
                  <Button style={{padding: "0.5rem"}} onClick={() => redir(formRenderProps.onFormReset)}>Go back</Button>
                </div>
              </FormElement>
            )}
          />
        </div>
      </div>
  );
}

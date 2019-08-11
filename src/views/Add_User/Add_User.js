import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import  { Redirect } from 'react-router-dom'
import {
  Button, Card, CardBody, CardFooter, Col, Container, Form, CardHeader, Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

import { forwardRef } from 'react';


const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')



class Add_User extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      datas: [],
      isLoaded: false,
      error: null,
      First_Name: null,
      Last_Name: null,
      Email: null,
      Gender: null,
      Age: null,
      Age_Start: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {

    const url = "http://localhost:8080/createUser?First_Name=" + this.First_Name.value + "&Last_Name=" + this.Last_Name.value
     + "&Email=" + this.Email.value + "&Gender=" + this.Gender.value + "&Age=" + this.Age.value;
    axios.get(url).then(res => {
      if(res.data.Status=="success"){
        window.location.href="/dashboard"
      }
    })
    event.preventDefault();
  }


  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>


  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Create User
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <InputGroup className="mb-3">
                    <input ref={(First_Name) => { this.First_Name = First_Name }} type="text" placeholder="First Name" autoComplete="first_name" required/>

                  </InputGroup>
                  <InputGroup className="mb-3">
                    <input ref={(Last_Name) => { this.Last_Name = Last_Name }} type="text" placeholder="Last Name" autoComplete="last_name" required/>

                  </InputGroup>
                  <InputGroup className="mb-3">
                    <input ref={(Email) => { this.Email = Email }} type="text" placeholder="Email" autoComplete="email" required/>

                  </InputGroup>
                  <InputGroup className="mb-3">
                    <select ref={(Gender) => { this.Gender = Gender }} type="select" name="Gender" id="gender">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>

                  </InputGroup>
                  <InputGroup className="mb-3">
                    <input ref={(Age) => { this.Age = Age }} type="text" placeholder="Age" autoComplete="age" required/>
                  </InputGroup>
                  <Button type="submit" color="success" block>Create</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Add_User;

import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';

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



class Edit_User extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
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
  updateInputValue(event) {
    console.log(this.Last_Name.value)
    event.preventDefault();
  }
  componentDidMount() {

    const invocation = new XMLHttpRequest();
    const url = "http://localhost:8080/getEditDataUser?ID=" + this.props.location.id;
    axios.get(url)
      .then(res => {
        this.setState({
          First_Name: res.data[0].First_Name,
          Last_Name: res.data[0].Last_Name,
          Email: res.data[0].Email,
          Gender: res.data[0].Gender,
          Age: res.data[0].Age,

        });
      })

  }

  handleSubmit(event) {

    const url = "http://localhost:8080/updateUser?First_Name=" + this.First_Name.value + "&Last_Name=" + this.Last_Name.value
      + "&Email=" + this.Email.value + "&Gender=" + this.Gender.value + "&Age=" + this.Age.value+"&ID="+this.props.location.id;
    axios.get(url).then(res => {
      if(res.data.Status=="success"){
       // window.location.href="/dashboard"
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
                    <input name="First_Name" ref={(First_Name) => { this.First_Name = First_Name }}   type="text" placeholder={this.state.First_Name}  />

                  </InputGroup>
                  <InputGroup className="mb-3">
                    <input ref={(Last_Name) => { this.Last_Name = Last_Name }} type="text" placeholder={this.state.Last_Name} autoComplete="last_name"  />

                  </InputGroup>
                  <InputGroup className="mb-3">
                    <input ref={(Email) => { this.Email = Email }} type="text" placeholder={this.state.Email} autoComplete="email"  />

                  </InputGroup>
                  <InputGroup className="mb-3">
                    <select ref={(Gender) => { this.Gender = Gender }} type="select" name="Gender" id="gender">
                    <option >กรุณาเลือก</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <input ref={(Age) => { this.Age = Age }} type="text" placeholder={this.state.Age} autoComplete="age"  />
                  </InputGroup>
                  <Button type="submit" color="warning" block>update</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Edit_User;

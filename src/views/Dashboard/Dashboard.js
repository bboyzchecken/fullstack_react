import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';

import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import MaterialTable from "material-table";

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')



class Dashboard extends Component {
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
      Age_Start: null,
      Age_End: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  handleSubmit(event) {

    const url = "http://localhost:8080/getAgeRange?Age_Start=" + this.Age_Start.value + "&Age_End=" + this.Age_End.value;
    axios.get(url, {
      Age_Start: this.Age_Start.value,
      Age_End: this.Age_End.value
    }).then(res => {
      this.setState({
        datas: res.data
      });
    })
    event.preventDefault();
  }
  handleClick(id) {
    console.log(id)
    const url = "http://localhost:8080/deleteUser?ID=" + id;
    axios.get(url).then(res => {
      if (res.data.Status == "success") {
        window.location.reload();
      }
    })
  }

  componentDidMount() {
    const invocation = new XMLHttpRequest();
    const url = "http://localhost:8080/getUser";



    axios.get(url)
      .then(res => {
        this.setState({
          datas: res.data
        });
      })

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
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Search By Range of Age: &nbsp;
                    <input type="text" value={this.state.Age_Start} ref={(Age_Start) => { this.Age_Start = Age_Start }} /> - &nbsp;
                     <input type="text" value={this.state.Age_End} ref={(Age_End) => { this.Age_End = Age_End }} />
                  </label>&nbsp;
                  <input type="submit" value="ค้นหา" />
                </form>
              </CardHeader>
              <CardBody>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Option</th>
                      <th>#NO</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.datas.map(row =>
                      <tr>
                        <td>
                          <Link className="btn btn-warning" to={{
                            pathname: '/Edit_User/:id',
                            id: row.ID
                          }} params={{ testvalue: "hello" }}>EDIT</Link>&nbsp;
                          <a className="btn btn-danger" onClick={(e) => this.handleClick(row.ID)}>Delete</a>
                        </td>
                        <td>{row.ID}</td>
                        <td>{row.First_Name + row.Last_Name}</td>
                        <td>{row.Email}</td>
                        <td>{row.Gender}</td>
                        <td>{row.Age}</td>
                      </tr>
                    )}

                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;

import React, { Component } from 'react';
import axios from 'axios';
import {
  Table, Col, Button, Row, Icon, Modal, Form, Input, Popconfirm
} from 'antd';
import { async } from 'q';

class TableData extends Component {

  state = { 
    visible: false,
    cardNumber: '',
    name:'',
    lastname:'',
    birthday:'',
    address:'',
    datapeoples:[],
    listpeople:'',
    editer: false,
    id:'',
   };

  
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  showModalEdit = () => {
    this.setState({
      visible: true,
      editer: true
    });
  }

    handleOk = () => {
      this.setState({
        visible: false,
      });
      axios.post(`http://localhost:8080/addpeople`,{

        cardNumber: this.state.cardNumber,
        name: this.state.name,
        lastname: this.state.lastname,
        birthday: this.state.birthday,
        address: this.state.address,
    
  }).then(response => {
      const datapeoples = response.data;
      this.setState({ datapeoples });
      window.location.reload(); 
  }).catch(err => {
      alert("error")
  }) 
    }

  handleEdit = () => {
    axios.put(`http://localhost:8080/updatepeople`,{

      cardNumber: this.state.cardNumber,
      name: this.state.name,
      lastname: this.state.lastname,
      birthday: this.state.birthday,
      address: this.state.address,
  
}).then(response => {
    const datapeoples = response.data;
    this.setState({ datapeoples });
    window.location.reload(); 
}).catch(err => {
    alert("error")
}) 
  }

  handleDelete = () => {
   axios.delete(`http://localhost:8080/deletepeople`,{
    data: {
      cardNumber: this.state.id
    }
   })
   window.location.reload(); 
  };


  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  inputID = (id) => {
    console.log("iddddddddddddddd",id.target.value);
    this.setState({
      cardNumber: id.target.value,
    });
  }

  inputName = (name) => {
    console.log("name",name.target.value);
    this.setState({
      name: name.target.value,
    });
  }

  inputLName = (lname) => {
    console.log("lname",lname.target.value);
    this.setState({
      lastname: lname.target.value,
    });
  }

  inputBirth = (birth) => {
    console.log("birth",birth.target.value);
    this.setState({
      birthday: birth.target.value,
    });
  }

  inputAddress = (address) => {
    this.setState({
      address: address.target.value,
    });
    console.log("address",address.target.value);
  }

  sendData = id => {
    this.setState({ 
      id : id.target.value
    });
    console.log("id",id.target.value);
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/people`)
      .then(res => {
        const datapeoples = res.data;
        console.log("=====>",datapeoples);
        this.setState({ datapeoples });
      })
  }

 

  render() {
    const { cardNumber, name, lastname, birthday, address } = this.state;
    const { getFieldDecorator } =this.props.form;
    console.log("list",this.state.id)
        
    const columns = [
      {
        title: 'ID Card',
        dataIndex: 'cardNumber',
        key: 'cardNumber',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'LastName',
        dataIndex: 'lastname',
        key: 'lname',
      },
      {
        title: 'Date of Birth',
        dataIndex: 'birthday',
        key: 'birthday',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text,record) => 
          this.state.datapeoples.length >=1 ? (
          <Row>
            <Col span={8}>
              <Button className="button-edit" type="vertical" onClick={this.showModalEdit}><Icon type="edit" /></Button>
            </Col>
            <Col span={8}>
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.cardNumber)}>
              <Button 
              value = {record.cardNumber}
              className="button-delete" 
              type="vertical" 
              onClick={this.sendData}
              >
                <Icon type="delete" />
              </Button>
            </Popconfirm>
            </Col>
          </Row>
        ) : 'No DATA'
      },
    ];


    console.log("test=====================>",this.state.datapeoples)

    return (
      <div>
        <Col>
          <Button className="button-add" onClick={this.showModal}>
          Add a row
          </Button>
          <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={false}
        >
           <div>
           <Row>
           <Col>
           <Form>
           <Form.Item>
            {getFieldDecorator('cardNumber', {
            rules: [
              { pattern: /^[0-9]{13}$/g, message: 'Allowed is 0-9 in 13 character'},
              { required: true, message: 'Please input cardNumber!' }
            ],
          })(
            <Input
              value={cardNumber}
              onChange={this.inputID}
              placeholder="Enter cardNumber number"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
          </Form.Item>
            <Form.Item>
            {getFieldDecorator('name', {
            rules: [
              { pattern: /^[a-zA-Z]{3,13}$/g, message: 'Allowed is a-z, A-Z'},
              { required: true, message: 'Please input name!' }
            ],
          })(
            <Input
              value={name}
              onChange={this.inputName}
              placeholder="Enter your name"
            />
          )}
          </Form.Item>
          <Form.Item>
          {getFieldDecorator('lastname', {
            rules: [
              { pattern:  /^[a-zA-Z]{3,13}$/g, message: 'Allowed is a-z, A-Z'},
              { required: true, message: 'Please input  lastname!' },
            ],
          })(
            <Input
            value={lastname}
            onChange={this.inputLName}
            placeholder="Enter your lastname"
          />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('birthday', {
            rules: [
              { pattern:  /^[0-9]$/g, message: 'Please input form yyyy-mm-dd'},
              { required: true, message: 'Please input birthday!' },
            ],
          })(
            <Input
            value={birthday}
            onChange={this.inputBirth}
            placeholder="Enter your birthday"
          />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('Address', {
            rules: [
              { pattern:  /^[a-zA-Z0-9]{3,13}$/g, message: 'Allowed is a-z, A-Z, 0-9'},
              { required: true, message: 'Please input Address!' },
            ],
          })(
            <Input
            value={address}
            onChange={this.inputAddress}
            placeholder="Enter your Address"
          />,
          )}
        </Form.Item>
           </Form>
           </Col>
           </Row>
           {
           this.state.editer === true ? (
           <Button  className="button-submit" onClick={ () => this.handleEdit()}>SUBMIT</Button>
           ) : <Button  className="button-submit" onClick={ () => this.handleOk()}>SUBMIT</Button>}
      </div>
        </Modal>
        </Col>
        <Col className="Header-Table">
          <Table dataSource={this.state.datapeoples} columns={columns} />
        </Col>

      </div>
    );
  }
}
const LockerForm = Form.create({ name: 'locker_form' })(TableData);

export default LockerForm;

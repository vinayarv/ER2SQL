import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserDatabases} from '../store'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {CreateTable, Field, CreateDB, RemoveTable, LoadDB, Modal, Association, CreateLoad} from './index';
import {default as ShowModal} from './ShowModal'

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCreateTable: false,
            showRemoveTable: false,
            showCreateAssociation: false
        }
        // this.showBothForm = this.showBothForm.bind(this)
        this.showCreateTableForm = this.showCreateTableForm.bind(this);
        this.showRemoveTableForm = this.showRemoveTableForm.bind(this);
        this.showCreateAssociationForm = this.showCreateAssociationForm.bind(this);
    }

    showCreateTableForm(e) {
        e.preventDefault();
        this.setState({
            showCreateTable: true,
            showRemoveTable: false,
            showCreateAssociation: false
        })
    }

    showRemoveTableForm(e) {
        e.preventDefault();
        this.setState({
            showCreateTable: false,
            showRemoveTable: true,
            showCreateAssociation: false
        })
    }

    showCreateAssociationForm(e){
        e.preventDefault();
        this.setState({
            showCreateTable: false,
            showRemoveTable: false,
            showCreateAssociation: true
        })
    }
    // showAssociationForm(e){
    //     e.preventDefault();
    //     this.setState({
    //         showAssociation: !this.state.showAssociation
    //     })
    // }
    // showBothForm(evt){
    //     evt.preventDefault()
    //     if(this.state.showLoad){
    //         this.state
    //     }
    //     this.setState({
    //         showLoad: !this.state.showLoad,
    //         showCreate: !this.state.showCreate
    //     })
    // }
    render() {
        return (
            <div className = 'sidebar'>
                <div className = 'buttons'>
                <h1>{this.props.database.name}</h1>
                <button onClick={this.showCreateTableForm}>Create Table</button>
                <button onClick={this.showCreateAssociationForm}>Create Association</button>
                <button onClick={this.showRemoveTableForm}>Remove Table</button>
                {this.state.showCreateTable ? <CreateTable /> : null}
                {this.state.showRemoveTable ? <RemoveTable /> : null}
                {this.state.showCreateAssociation ? <Association /> : null}
                <CreateLoad/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({user, userdbs, database}) => ({user, userdbs, database});

const mapDisptachProps = (dispatch) => {
  return {
    getUserDatabases(userId){
      dispatch(getUserDatabases())
    }
  }
}

export default connect(mapStateToProps, mapDisptachProps)(Sidebar);
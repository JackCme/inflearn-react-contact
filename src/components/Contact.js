import React, { Component } from 'react'
import ContactInfo from './ContactInfo'
import ContactDetails from './ContactDetails'
import ContactCreate from './ContactCreate'

import update from 'immutability-helper'

export default class Contact extends Component {
    
    id = 5
    state = {
        selectedKey: -1,
        keyword: '',
        contactData: [
            { name: "Albert", phone: "010-0000-1234", id: 0 },
            { name: "Betty", phone: "010-0000-1234", id: 1 },
            { name: "Jack", phone: "010-0000-1234", id: 2 },
            { name: "Charlie", phone: "010-0000-1234", id: 3 },
            { name: "Alise", phone: "010-0000-1234", id: 4 },
            { name: "Lisa", phone: "010-0000-1234", id: 5 },
        ]
    }

    componentWillMount() {
        const contactData = localStorage.contactData
        if(contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            })
            this.id = JSON.parse(contactData).length - 1
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
            localStorage.contactData = JSON.stringify(this.state.contactData)
        }
    }

    handleKeywordChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    
    handleClick = (key) => {
        this.setState({
            selectedKey: key
        })
        console.log(this.state.selectedKey)
    }
    
    handleCreate = (contact) => {
        this.setState({
            contactData: update(
                this.state.contactData,
                {
                    $push: [{...contact, id: ++this.id}]
                }
            )
        })
    }
    
    handleRemove = () => {
        if(this.state.selectedKey < 0) {
            return
        }
        this.setState({
            contactData: update(
                this.state.contactData,
                {
                    $splice: [
                        [this.state.selectedKey, 1]
                    ]
                }
            ),
            selectedKey: -1
        })
    }
    
    handleEdit = (name, phone) => {
        this.setState({
            contactData: update(
                this.state.contactData,
                {
                    [this.state.selectedKey]: {
                        name: { $set: name },
                        phone: { $set: phone }
                    }
                }
            )
        })
    }
    
    render() {
        const mapToComponents = (data) => {
            data.sort()
            data = data.filter((contact) => {
                return contact.name.toLowerCase().
                        indexOf(this.state.keyword.toLowerCase()) > -1
            })
            return data.map((contact) => {
                return (<ContactInfo
                            contact={contact}
                            key={contact.id}
                            onClick={() => this.handleClick(contact.id)}
                            />)
            })
        }
        return (
            <div>
                <h1>Contacts</h1>
                <input 
                    name="keyword" 
                    placeholder="Search"
                    value={this.state.keyword} 
                    onChange={this.handleKeywordChange} />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetails
                    isSelected={this.state.selectedKey !== -1}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}/>
                <ContactCreate
                    onCreate={this.handleCreate}/>
            </div>
        )
    }
}

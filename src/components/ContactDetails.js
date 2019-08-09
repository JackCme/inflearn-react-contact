import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ContactDetails extends Component {
    static defaultProps = {
        contact: {
            name: '',
            phone: '',
        },
        onRemove: () => console.warn("onRemove not defined"),
        onEdit: () => console.warn("onEdit not defined"),
    }

    static propTypes = {
        contact: PropTypes.object,
        onRemove: PropTypes.func,
        onEdit: PropTypes.func,
    }

    state = {
        isEdit: false,
        name: '',
        phone: '',
    }

    handleToggle = () => {
        if(!this.state.isEdit) {
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone,
            })
        }
        else {
            this.handleEdit()
        }
        this.setState({
            isEdit: !this.state.isEdit
        })
    }
    
    handleChange = (e) => {
        let nextState = {}
        nextState[e.target.name] = e.target.value
        this.setState(nextState)
    }

    handleEdit = () => {
        this.props.onEdit(this.state.name, this.state.phone)
    }
    
    handleKeyPress = (e) => {
        if (e.charCode === 13) {
            this.handleToggle()
        }
    }

    render() {
        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        )
        const edit = (
            <div>
                <p>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        name="phone"
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
            </div>
        )
        const view = this.state.isEdit
            ? edit
            : details
        const blank = (<div><h1>None Selected</h1></div>)
        const selected = (
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? view : blank}
                <button onClick={this.props.onRemove}>Remove</button>
                <button
                    onClick={this.handleToggle}>
                    {this.state.isEdit ? 'Done' : 'Edit'}
                </button>
            </div>
        )

        return (
            <div>
                {this.props.isSelected 
                    ? selected
                    : blank}
            </div>
        )
    }
}

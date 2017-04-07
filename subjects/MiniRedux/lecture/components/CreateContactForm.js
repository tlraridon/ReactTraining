import React from 'react'
import serializeForm from 'form-serialize'

const transparentGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

function generateId() {
  return Math.random().toString(36).substring(7)
}

const CreateContactForm = React.createClass({

  propTypes: {
    onCreate: React.PropTypes.func.isRequired
  },

  handleSubmit(event) {
    event.preventDefault()
    const contact = serializeForm(event.target, { hash: true })
    contact.id = generateId()
    this.props.onCreate(contact)
    event.target.reset()
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ display: 'inline' }}>
        <img style={{ background: '#ccc' }} height="50" width="50" src={transparentGif} />{' '}
        <input name="first" type="text" placeholder="first name" size="8"/>
        <input name="last" type="text" placeholder="last name" size="15"/>
        <input name="avatar" type="text" placeholder="avatar url" size="15"/>
        <button type="submit">Create</button>
      </form>
    )
  }
})

export default CreateContactForm


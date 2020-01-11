import React from 'react'

export default class PersonalPosts extends React.PureComponent {
    componentDidMount() {
        this.props.handleTabSelection(3)
    }
    
    // ##################### RENDER ######################
    render() {
        return (
            <div className={`tab-pane fade show ${this.props.active}`}>
                Relationships HERE - {this.props.userId}
            </div>
        )
    }
}
import React from 'react'

export default class PersonalPosts extends React.PureComponent {
    componentDidMount() {
        this.props.handleTabSelection(3)
    }
    
    // ##################### RENDER ######################
    render() {
        return (
            <div className={`tab-pane fade show ${this.props.active}`}>
                MY POSTS HERE - {this.props.userId}
            </div>
        )
    }
}
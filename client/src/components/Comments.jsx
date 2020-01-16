import React from 'react'

import CommentCard from './CommentCard'
// import { ReactComponent as Close } from '../assets/images/icons/times-circle-solid.svg';

export default class Comments extends React.PureComponent {


    // ################## RENDER ######################
    render() {
        const backgroundColor = 'white'
        const divStyle = {
            zIndex: 1,
            position: 'absolute',
            top: '3%',
            height: '95%',
            width: '100%',
            backgroundColor: backgroundColor,
        }
        
        return (
            <div className='container rounded' style={divStyle}>
                {this.props.allComments.map(comment => <CommentCard key={comment.comment_id + comment.username} avatar={comment.avatar_url} username={comment.username} comment={comment.comment_body} timestamp={comment.time_created}/>)}
                {/* <div className='card position-relative' style={{width: '100%', height: '100%', backgroundColor: backgroundColor}}>
                    <Close className='position-absolute icon' onClick={this.props.handleClosePost} />
                    <div className='card-img-top position-relative' style={{width: '100%', height: '80%'}}>
                        <TrashCan className='icon' style={{position: 'absolute', top: '0', right: '0'}} onClick={() => this.props.handleDeletePost(this.props.postId)}/>
                        <img src={this.props.image} alt='Card' style={imageStyle}/>
                        <span className='timestampSpan'>{new Date(this.props.timestamp).toLocaleString()}</span>
                    </div>
                    <div className='card-body p-1' style={{width: '100%', height: '20%'}}>
                        <form className='d-flex' onSubmit={e => this.props.handleForm(e, this.props.postId)} style={{width: '100%', height: '83%'}}>
                            <div className='d-flex flex-column'>
                                <label htmlFor='captionEdit'><Edit className='icon flex-grow-1'/></label>
                                <button className='btn btn-primary'><Save style={{width: '30px'}}/></button>
                            </div>
                            <textarea className='rounded flex-grow-1' id='captionEdit' value={this.props.caption} onChange={e => this.props.handleCaptionInput(e)}></textarea>
                        </form>
                        <div className='d-flex justify-content-between'>
                            <span className='text-white p-0 m-0'>Reactions <span>num</span></span>
                            <span className='text-white p-0 m-0'>Comments <span>num</span></span>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}
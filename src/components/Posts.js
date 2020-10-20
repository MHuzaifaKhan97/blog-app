import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { storage, db, auth } from '../firebase/firebase';

class Posts extends Component {

    state = {
        title: '',
        desc: '',
        posts: [],
        imgUrl: '',
        user: ''
    }

    onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = storage.ref()
        const fileRef = storageRef.child(file.name)

        await fileRef.put(file)
        const imgReference = await fileRef.getDownloadURL();
        this.setState({
            imgUrl: imgReference
        });
    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    submitPost = async () => {
        let postId = db.ref("posts").push().key
        console.log(postId);
        if (this.state.title === "") {
            alert("Please Enter Title")
        }
        else if (this.state.desc === "") {
            alert("Please Enter Description")
        }
        else if (this.state.imgUrl === '') {
            alert("Please Select Image File")
        }
        else {
            setTimeout(() => {
                db.ref(`posts/${postId}`).set({
                    title: this.state.title,
                    desc: this.state.desc,
                    name: this.state.user.email,
                    imgFile: this.state.imgUrl,
                }).then(() => {
                    alert("Post Added")
                })
            }, 4000);
        }
    }
    fetchPost = async () => {
        await db.ref('posts').on('child_added', (data) => {
            console.log(data.val())
            this.setState({
                posts: [...this.state.posts, data.val()]
            })
        })
    }
    componentDidMount() {
        this.fetchPost()
        auth.onAuthStateChanged((res) => {
            console.log(res)
            this.setState({
                user: res
            })
        })
    }
    render() {
        console.log(this.state.post)
        return (
            <>
                {
                    this.state.user ?
                        <div className="container-fluid">
                            <div className="row add_post">
                                <div className="col-md-4 offset-md-8">
                                    <button data-toggle="modal" data-target="#postModal" className="btn btn-outline-dark">
                                        <span className="fa fa-plus mx-2"></span>
                            Add Post
                        </button>
                                </div>
                                {/* Add Post Modal */}
                                <div className="modal fade" id="postModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="text-center font-weight-bold my-3">
                                                    <span className="heading_1">b</span>
                                                    <span className="heading_2">-Logs </span>
                            - Add New Post
                            </h3>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">

                                                <div className="form-group">
                                                    <input className="form-control" type="text" placeholder="Enter Title..." name="title" onChange={(e) => this.onInputChange(e)} />
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" placeholder="Enter Description..." name="desc" onChange={(e) => this.onInputChange(e)} />
                                                </div>
                                                <div className="form-group">
                                                    <input onChange={this.onFileChange} type="file" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button className="btn btn-primary btn-block" onClick={this.submitPost} >
                                                    <span className="fa fa-plus mx-2"></span>
                                                    <span className="font-weight-bold">Add Post</span>
                                                </button>
                                                <button type="button" className="btn btn-secondary btn-block" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Add Post Modal End */}
                            </div>
                            <div className="row my-5">
                                <div className="col-md-8 offset-md-2">
                                    {
                                        this.state.posts ?
                                            this.state.posts.map((post, index) => {
                                                return <div className="card posts my-3" key={index} style={{ width: "100%" }}>
                                                    <img src={post.imgFile} width="100" height="200" className="card-img-top img-fluid" alt="..." />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{post.title}</h5>
                                                        <p className="card-text">{post.desc}</p>
                                                        <p>Posted by: <span className="font-weight-bold">{post.name}</span></p>
                                                    </div>
                                                </div>
                                            })
                                            : ''
                                    }

                                </div>
                            </div>
                        </div>
                        :
                        // <Redirect to='/login' />
                        <div className="not_logged_in text-center">
                            <h1 className="text-center"> Your are not logged in</h1>
                            <Link to='/login'>
                                <button className="btn btn-dark my-4">
                                    Goto Login
                  </button>
                            </Link>
                        </div>
                }
            </>
        )
    }
}
export default Posts;
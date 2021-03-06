import React, { Component } from "react";
import  Comment from './CommentSmallCompoent/Comment'
import { connect } from "react-redux";
import {
  changeName,
  GoogleSignin,
  facebookSignin,
  MOVIESData,CommentOnMovie,GetCommentsofMovie
} from "../store/actions/action";

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MOVIES: "",
      MovieNames: "",
      commentText:'',
      
    };
  }
  PerformComment=(event)=>{
 
    this.setState({
      commentText:event.target.value
  })
  console.log(this.state.commentText);
  }

  SaveComment=()=>{
    let commentObj={
      userWhoPerformedTheComment:this.props.CurrentUser.displayname,
      pictureOfTheUser:this.props.CurrentUser.userpic,
      Comment:this.state.commentText,
      NameOftheMovie:this.state.MovieNames
    }
    this.props.PerformCommentOnMovies(commentObj);
    this.setState({
      commentText:''
  });
  
  }

  componentDidMount() {
    if (this.props.MOVIES) {
      // console.log(this.props.MOVIES ,"from 23");
      // var MovieNames = this.props.match.params.moviename;
      //  var TrailerSource =
      //  "https://www.youtube.com/embed/" + this.props.MOVIES[MovieNames].TrailerUrl;
     this.props.GetAllComments(this.props.match.params.moviename);
     
      this.setState({
        MOVIES: this.props.MOVIES,
        MovieNames: this.props.match.params.moviename,
       
      });
    }


  }

  render() {
    return (
      <div className="container-fluid">
        {this.state.MOVIES ? (
          <div>
            <div className="row">
              <div
                className="col-md-11 offset-md-1"
                style={{ marginTop: "15px" }}
              >
                <h3>{this.state.MOVIES[this.state.MovieNames].Title}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-7 offset-md-1">
                <div
                  className="card card-inverse card-primary "
                  style={{ marginTop: "15px" }}
                >
                  <div className="videoWrapper" style={{ margin: "5%" }}>
                    <iframe
                      width="560"
                      height="315"
                      src={
                        "https://www.youtube.com/embed/" +
                        this.state.MOVIES[this.state.MovieNames].TrailerUrl
                      }
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: "3%",
                      marginRight: "3%"
                    }}
                  >
                    <h6>
                      {this.state.MOVIES[this.state.MovieNames].discription}
                    </h6>
                  </div>
                  {this.props.CurrentUser ? (
                    <div className="card-block" style={{ padding: "20px" }}>
                      <h5 className="card-title "> Comments </h5>

                      <div class="form-group">
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          placeholder="Type ypur Comment here..."
                          rows="3"
                          value={this.state.commentText} onChange={this.PerformComment}
                        />
                      </div>
                      <button type="submit" class="btn btn-warning" onClick={this.SaveComment}>
                        Submit
                      </button>
                    </div>
                  ) : (
                    <h4 style={{ margin: "10px" }}>
                      you need to be logged in inorder to comment...
                    </h4>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-12 col-md-7 offset-md-1">
                    {this.props.Comments?this.props.Comments.map(x => {
                      return (
                        <Comment Name={x.userWhoPerformedTheComment} frontImg={x.pictureOfTheUser}  
                        Comments={x.Comment}
                        />
                      );
                    }
                    )
                    :null}
            </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-11 offset-1" style={{ margin: "20px" }}>
              <h2>
                Oh.. there seemed to be a problem ...please go back to home page
              </h2>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    userName: state.reducer.name,
    CurrentUser: state.reducer.currentUser,
    MOVIES: state.reducer.MOVIES,
    Comments:state.reducer.latestComment
  };
}
function mapDispatchToProp(dispatch) {
  return {
    changeUserName: () => {
      dispatch(changeName());
    },
    PerformGoogleSignIn: () => {
      dispatch(GoogleSignin());
    },
    MOVIESData: () => {
      dispatch(MOVIESData());
    },
    PerformFBSignIn: () => {
      dispatch(facebookSignin());
    },
    PerformCommentOnMovies:(data)=>{
      dispatch(CommentOnMovie(data));
    }
    ,GetAllComments:(data)=>{
      dispatch(GetCommentsofMovie(data))
    }
  };
}

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(MoviePage);

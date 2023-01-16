import CommentForm from "./CommentForm";
import CommentRoot from "./CommentRoot";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import axios from "axios";

function Comment(props) {
  const [comment, setComment] = useState({});
  const [comments, setComments] = useState([]);
  const [commentsTotals, setCommentsTotals] = useState(null);


  function refreshComments() {
    axios.get('/api/comment/comments/root/' + props.id)
      .then(response => {
        setComments(response.data);
      });
  }

  
  useEffect(() => {
    if (props.comment) {
      setComment(props.comment);
    } else {
      axios.get("/api/comment/comments/" + props.id)
        .then(response => {
          setComment(response.data);
        });
    }
    refreshComments();
  }, [props.id, props.comment]);

  useEffect(() => {
  }, [comments.length]);

  const successCb = () => {
    props.successCb && props.successCb();
  }
  return (
    <>
      {!!comment && !!comment._id && (
        <>
          <hr />
          <CommentForm onSubmit={() => refreshComments()}
            successCb={() => successCb()}
            rootId={comment._id} parentId={comment._id} showAuthor={true} />
          <hr />
          <CommentRoot.Provider value={{ refreshComments, commentsTotals }}>

            <Comments
              parentId={comment._id}
              rootId={comment._id}
              comments={comments} />
          </CommentRoot.Provider>
        </>
      )}
    </>
  );
}

export default Comment;
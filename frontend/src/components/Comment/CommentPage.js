import Comment from "./Comment";

function CommentPage(props) {

  const commentId = props.match.params.id ? props.match.params.id : '';

  const successCb = () => {
    props.successCb && props.successCb();
  }

  return (
    <div>
      <div>
        {
          commentId && <Comment id={commentId} successCb={() => successCb()} />
        }
      </div>
    </div>
  );
}
export default CommentPage;
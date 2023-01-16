import { useState, useContext } from 'react';
import CommentForm from "./CommentForm";
import CommentRoot from "./CommentRoot";
import TimeAgo from 'timeago-react';
import { Button } from "antd";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

function Comments(props) {
  const [showForm, setShowForm] = useState(false);
  const comments = props.comments.filter(comment => props.parentId === comment.parentId);
  const rootCommentInfo = useContext(CommentRoot);

  return (
    <div>
      {comments.map(comment => {
        const replies = props.comments.filter(c => c.parentId === comment._id);
        return (
          <div>
            <div>
              <div />
              <div>{comment.author}</div>
              <TimeAgo datetime={comment.postedAt} />
            </div>
            <div style={{ marginLeft: '18px' }}>
              <div>
                <div>
                  <ReactMarkdown remarkPlugins={[gfm]} children={comment.body} />
                </div>
                <Button
                  onClick={() => setShowForm(comment._id)}>Reply</Button>
                {comment._id === showForm && (
                  <CommentForm
                    parentId={comment._id}
                    rootId={props.rootId}
                    onSubmit={() => {
                      setShowForm(false);
                      rootCommentInfo.refreshComments();
                    }}
                    showAuthor={false}
                    onCancel={() => setShowForm(false)} />
                )}
                {replies.length > 0 && (
                  <Comments comments={props.comments} parentId={comment._id} rootId={props.rootId} />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
import { useContext, useState } from "react";
import UserContext from "../UserContext";
import axios from "axios";
import { Form, Button, Input, message } from 'antd';

const { TextArea } = Input
function CommentForm(props) {
  const user = useContext(UserContext);
  const [commentBody, setCommentBody] = useState('');
  function postComment() {
    const data = { body: commentBody, parentId: props.parentId, rootId: props.rootId, };
    axios.post("/api/comment/comments", data, { withCredentials: true })
      .then(response => {
        if (response.data.success) {
          setCommentBody('');
          message.success('Comment successfully.');
          if (props.successCb) {
            props.successCb();
          }
          if (props.onSubmit) {
            props.onSubmit();
          }
        }
      });
  }

  return (
    <div>
      {user.userName && props.showAuthor && (
        <div style={{ fontSize: '17px', fontWeight: 500, marginTop: '20px', marginBottom: '10px' }}>
          Comment as {user.userName}
        </div>

      )}
      {user.userName && <Form name='basic' onFinish={(values) => {
        if (!commentBody) {
          message.warning('please enter content');
          return;
        }
        postComment()
      }} >
        <Form.Item>
          <TextArea
            placeholder='Your comment.'
            rows={4}
            onChange={(e) => { setCommentBody(e.target.value) }}
            value={commentBody} />
        </Form.Item>
        <Form.Item>
          <Button  {...props} htmlType="submit" onClick={() => { }} type="primary">
            Add Comment
          </Button>
        </Form.Item>
        {!!props.onCancel && <Form.Item>
          <Button onClick={() => { props.onCancel() }} type="primary">
            Cancel
          </Button>
        </Form.Item>}
      </Form>}
      {!user.userName && <p onClick={() => { message.warning('please jump to login page') }}>Please Login to comment</p>}

    </div>
  );
}

export default CommentForm;
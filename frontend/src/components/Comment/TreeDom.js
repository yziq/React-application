import { message, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Tree } from 'uiw';
import './TreeDom.css';

const TreeDom = (props) => {

  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [parentID, setParentID] = useState('');

  useEffect(() => {
    if (props.userCom) {
      setData(props.userCom)
    }
  }, [props.userCom])

  const handleSubmit = () => {
    if (!name) return message.error('Please enter comment');
    axios.post('/api/comment/comments', {
      body: name,
      parentId: parentID,
      rootId: props.id,
    }, { withCredentials: true }).then(res => {

      if (res.data.success) {
        message.success('Add comment successfully');
        setName('');
        setVisible(false)
        props.changeInit()
      } else {
        message.error(res.data.data.msg)
      }
    }).catch(() => {
      message.error('Internet error')
    })
  }



  return (
    <div>
      <Modal visible={visible} title="Reply"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          handleSubmit();
        }}
      >
        <textarea className='replyform' onChange={(e) => {
          setName(e.target.value);
        }}
          value={name}
          id="" cols="60" rows="10"></textarea>
      </Modal>
      <div>
        <span style={{ fontSize: '17px', fontWeight: 500 }}>Comment: </span>
        <Tree
          data={data}
          defaultExpandAll={true}
          onExpand={(_id, expanded, data, node) => {
            console.log('onExpand', _id, expanded, data, node);
          }}
          onSelected={(_id, selected) => {
            console.log('==========>>>>');
            console.log(selected);
            setParentID(selected)
            setVisible(true);
          }}
        />
      </div>
    </div>
  )
}

export default TreeDom;
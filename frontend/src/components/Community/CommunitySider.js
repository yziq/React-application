import { CaretRightOutlined } from '@ant-design/icons';
import { Affix, Button, Collapse } from 'antd';
import 'antd/dist/antd.css';
import { React, useContext } from 'react';
import UserContext from "../UserContext";
import './CommunitySider.css';

const { Panel } = Collapse;


function CommunitySider({ community, handleOpen }) {
  const user = useContext(UserContext);

  return (
    <Affix style={{ position: 'absolute' }}>
      <div className='collapse'>
        {user.userName && (
          <Button type="primary" style={{ width: 360 }} onClick={() => {
            handleOpen();
          }}>
            Create a post
          </Button>
        )}
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className="site-collapse-custom-collapse"
        >

          <Panel header="About this Community" key="1" className="about-community">
            <p className='text'>{community.intro}</p>
          </Panel>

          <div>
            <pre>  {community.memberId && community.memberId.length} members  joined       </pre>
          </div>

        </Collapse>
      </div>
    </Affix>
  )

};
export default CommunitySider;
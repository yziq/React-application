import { message } from "antd";
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../UserContext';

export default function useJoinCommunity() {
  const { userId } = useContext(UserContext);
  const joinCommunity = (communityId) => {
    return axios.post("/api/community/join", { communityId, userId }).then(() => {
      message.success('Joined successfully!');
    }).catch(() => {
      message.error('Joined unSuccessfully!')
    });
  }
  return joinCommunity;
};
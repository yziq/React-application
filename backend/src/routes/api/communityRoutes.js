//This is a  RESTful API for dealing with communities.
import express from "express";
import { verifyUserAuth } from "../../auth-middleware";
import {
  createCommunity,
  retrieveCommunity,
  retrieveCommunityList,
  retrieveCommunityListByUserId
} from "../../data/communities-dao";
import User from "../../model/user";

// This is the default if you don't set something else.

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUST = 400;


const router = express.Router();


//create new community
router.post('/create', verifyUserAuth, async (req, res) => {
  const newCommunity = await createCommunity({
    name: req.body.name,
    intro: req.body.intro,
    avatar: req.body.avatar,
    memberId: [res.locals.user._id]
  });

  res.status(HTTP_CREATED)
    .header('Location', `/${newCommunity._id}`)
    .json(newCommunity);
});


//join a community
router.post('/join', async (req, res) => {
  const { communityId, userId } = req.body;
  if (!communityId || !userId) {
    res.status(HTTP_BAD_REQUST).json({ error: 'communityId or userId is not provided' });
    return;
  }
  const community = await retrieveCommunity(communityId);
  const user = await User.findById(userId);

  if (community.memberId.find(x => x && x.toString() === user.id.toString())) {
    res.status(HTTP_BAD_REQUST).json({ error: `the user: ${user.id} is already in the community: ${communityId}` });
    return;
  }
  community.memberId.push(user);
  await community.save();
  res.status(HTTP_CREATED)
    .header('Location', `/${community._id}`)
    .json(community);
});

// Retrieve all communities ?userId=xxxx
router.get('/', async (req, res) => {
  const userId = req.query.userId;
  if (userId) {
    res.status(200).json(await retrieveCommunityListByUserId(userId));
    return;
  }
  res.json(await retrieveCommunityList());
});

//Retreive a community by its id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const community = await retrieveCommunity(id);

  if (community) {
    res.json(community);
  }
  else {
    res.sendStatus(HTTP_NOT_FOUND);
  }
});




export default router;
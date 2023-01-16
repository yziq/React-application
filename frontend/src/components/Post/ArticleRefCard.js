import { Button, Card, message, Modal } from "antd";
import axios from 'axios';
import React, { useState } from 'react';

const { Meta } = Card;
function ArticleRefCard(props) {
  const [wikiContent, setWikiContent] = useState("")
  const [visible, setVisible] = useState(false)

  var url = "https://en.wikipedia.org/w/api.php";
  var params = {
    action: "query",
    format: "json",
    prop: "extracts",
    titles: props.wikiTitle,
    formatversion: "2"
  };
  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

  const getWiki = async (props) => {
    await axios.get(url)
      .then(res => {
        setWikiContent(res.data.query.pages[0].extract)
        setVisible(true)
      }).catch(err => {
        console.log(err)
        message.error('Invalid Wiki keywords!')
      })
    setTimeout(() => {
      if (props.reference) {
        getRef(props)
      }
    }, 500);
  }

  const getRef = (props) => {
    var element = document.getElementById("location")
    console.log("11111")
    if (element) {
      element.scrollIntoView()
    } else {

      var content = document.getElementsByClassName("wikicontent");
      var searchtext = props.reference;
      var value = searchtext;
      var re = new RegExp(value, "g");
      var str = content[0].innerHTML;
      console.log("re", re);
      var reg = /<[^<>]+>/g;
      var text = str.replace(reg, '');//replace HTML tag
      text = text.replace(/&nbsp;/ig, '');//replace HTML space
      console.log("text", str);
      var values1 = text.split(value);
      var values = str.split(value);
      console.log("index", str.indexOf(value))
      console.log("index", text.indexOf(value))
      if (values[1]) {
        var temp = values.join('<span id="location" style="background:yellow;">' + value + '</span>');
      } else {
        var temp = values1.join('<span id="location" style="background:yellow;">' + value + '</span>');
      }
      setWikiContent(temp);
      setTimeout(() => {
        var element = document.getElementById("location")
        try {
          element.scrollIntoView()
        } catch (err) {
          console.log(err)
          message.error('Invalid Wiki reference!')
        }
      }, 1);
    }
  }

  //Show reference text in the card 
  //provide a button to allow viewer to see source article 
  //button calls ziqi's jumpto function with two parameters:
  //title = props.title
  //locationByContext = props.reference
  function ShowSource(props) {
    console.log(props)
    getWiki(props)
  }

  const wikiPage = () => {
    const w = window.open('_black');
    let url = 'https://en.wikipedia.org/wiki/' + params.titles;
    w.location.href = url;
  }

  const ref_preview = props.reference.slice(0, 100) + '...'
  return (
    <div>
      <Card title={'Source article: ' + props.wikiTitle} >

        <Card
          onClick={() => { ShowSource(props) }}
          hoverable
          cover={<img alt="wiki" src="/WikiLogo.png" style={{ paddingLeft: 20, paddingTop: 20, width: 120, float: "left", align: "center" }} />}
        >
          <Meta title={props.wikiTitle} description={ref_preview} style={{ rignt: 300 }} />
        </Card>
      </Card>
      <Modal
        title={<Button onClick={wikiPage} >
          {params.titles} - More detail
        </Button>}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        footer={null}
      >
        <div className="wikicontent" dangerouslySetInnerHTML={{ __html: wikiContent }}>

        </div>
      </Modal>
    </div>
  )
}

export default ArticleRefCard;
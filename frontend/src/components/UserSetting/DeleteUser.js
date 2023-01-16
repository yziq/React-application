import { Button, Input, Modal } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'

export default function DeleteUser() {

  const [wikititle, setwikititle] = useState("")
  const handleChange = (evt) => {
    setwikititle(evt.target.value)
  }

  var url = "https://en.wikipedia.org/w/api.php";
  var params = {
    action: "query",
    format: "json",
    prop: "extracts",
    titles: wikititle,
    formatversion: "2"
  };
  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

  const [wikicontent, setwikicontent] = useState("")
  const [visible, setVisible] = useState(false)
  const getwiki = async () => {
    await axios.get(url)
      .then(res => {
        setwikicontent(res.data.query.pages[0].extract)
        setVisible(true)
        console.log(res.data.query.pages[0])
        console.log(wikicontent)
      }).catch(err => {
        console.log(err)
      })
    setTimeout(() => {
      getref()
    }, 500);
  }


  const getref = () => {
    var element = document.getElementById("location")
    console.log("11111")
    if (element) {
      element.scrollIntoView()
    } else {
      var content = document.getElementsByClassName("wikicontent")
      console.log(content)
      var searchtext = "MongoDB Inc. hosts an annual developer conference which has been referred to as either MongoDB World or MongoDB.live."
      var value = searchtext
      var str = content[0].innerHTML
      var values = str.split(value)
      var temp = values.join('<span id="location" style="background:yellow;">' + value + '</span>')
      setwikicontent(temp)
      setTimeout(() => {
        var element = document.getElementById("location")
        element.scrollIntoView()
      }, 1);


    }
  }

  const clear = () => {
    setwikicontent("")
    console.log(111 + wikicontent)
  }



  return (
    <div>

      <Input placeholder="wiki title" onChange={onSearchChange} value={wikititle} />

      <Input placeholder="wiki title" onChange={handleChange} value={wikititle} />
      <Button onClick={getwiki}>
        get
      </Button>
      <Modal
        title={<Button onClick={getref} >
          {params.titles}
        </Button>}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        footer={null}
      >
        <Button onClick={getref} >
          Get
        </Button>
        <div className="wikicontent" dangerouslySetInnerHTML={{ __html: wikicontent }}>

        </div>
      </Modal>

    </div>

  )
}

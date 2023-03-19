import { useEffect,useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { GithubFilled, BookFilled } from '@ant-design/icons';
import { Space, Card, Col, Form, Input, Select, Radio, Button, Divider, Row } from "antd";

import themes from "../themes.js";
import Logo from "../assets/images/logo.png";
import useOption from "../hooks/Option.js";
import Loader from "../assets/images/loader.svg"


export default function Home() {
  const [loading, setLoading] = useState(true);
  const {options, setOptions, getImgUrl, setError, updateQuerystring} = useOption();
  const [onOpenInNewTabDisabled, setOnOpenInNewTabDisabled] = useState(true);
  

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const onOpenInNewTab = () => {
    window.open(getImgUrl(), "_blank");
  };

  const onPreview = () => {
    updateQuerystring();
  };

  const onError = () => {
    setError(true);
    setOnOpenInNewTabDisabled(true);
  };

  const onLoad = (src) => {
    if (!src.currentTarget.src.includes("error")){
      setOnOpenInNewTabDisabled(false);
    }
  };

  const onFieldsChange = (changed_value,values) => {
    setOnOpenInNewTabDisabled(true);
    setOptions((prev) => {
      return {
        ...prev,
        [changed_value[0].name]: changed_value[0].value,
      };
    });
  };

  return loading?<div className="main-body">
      <Image src={Loader} alt="Loading" width={100} height={100}/>
    </div> : (
    <>
      <Head>
        <title>Codeforces Readme Stats</title>
        <meta
          name="description"
          content="⚡ Dynamically generated Codeforces stats for your Github profile!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Space className="main-body">
        <Card className="card">
          <Col className="card-col">
          
            <div className="header">
            <Space>
            <Image src={Logo} alt="Logo" width={35} height={35} />
              <h1 className="header-title">Codeforces Readme Stats</h1>
              </Space>
              <p>
                ⚡ Dynamically generated Codeforces stats for your Github
                profile!
              </p>
            </div>

            <Row className="row" gutter={[10,10]}>
            
            <Col>
            <Form
              className="form"
              name="basic"
              layout="horizontal"
              labelCol={{ span: 9 }}
              initialValues={options}
              onFieldsChange={onFieldsChange}
            >
              <Form.Item
                className="form-item"
                label="Codeforces Handle"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Codeforces Handle!",
                  },
                ]}
              >
                <Input autoComplete="off"/>
              </Form.Item>
              <Form.Item
                className="form-item"
                label="Theme"
                name="theme"
              >
                <Select
                  options={Object.keys(themes).map((theme) => {
                    return { value: theme, label: theme };
                  })}
                />
              </Form.Item>
              <Form.Item
                className="form-item"
                label="Animation"
                name="disable_animations"
                layout="inline"
              >
                <Radio.Group>
                  <Radio value={false}>Enable</Radio>
                  <Radio value={true}>Disable</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                className="form-item"
                label="Show Icons"
                name="show_icons"
                layout="inline"
              >
                <Radio.Group>
                  <Radio value={true}>Enable</Radio>
                  <Radio value={false}>Disable</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                className="form-item"
                label="Title"
                name="force_username"
                layout="inline"
              >
                <Radio.Group>
                  <Radio value={true}>Username</Radio>
                  <Radio value={false}>Full Name</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item className="form-item">
                <Space className="submit-wrapper">
                <Button type="primary" onClick={onPreview}>
                  Preview
                </Button>
                <Button type="primary" onClick={onOpenInNewTab} disabled={onOpenInNewTabDisabled}>
                  Open in new tab
                </Button>
                </Space>
              </Form.Item>
            </Form>
              </Col>
              
            <Col className="image-output">
              <Image src={getImgUrl()} alt="Codeforces-Stats" fill="width" onError={onError} onLoad={onLoad}/>
            </Col>

            </Row>

            <Divider className="divider"/>
            <Space className="footer">
              <a href="https://github.com/RedHeadphone/Codeforces-readme-stats"><GithubFilled />Github</a>
              <a href="https://redheadphone.github.io/Codeforces-readme-stats"><BookFilled />Docs</a>
            </Space>
          </Col>
        </Card>
      </Space>
    </>
  );
}

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { GithubFilled, BookFilled, ExportOutlined } from '@ant-design/icons';
import { Space, Card, Col, Form, Input, Select, Radio, Button, Divider, Row } from "antd";

import themes from "../themes.js";
import Logo from "../assets/images/logo.png";
import useOption from "../hooks/Option.js";


export default function Home() {
  const {options, setOptions, getImgUrl, setError, updateQuerystring, checkSame} = useOption();
  const [openInNewTabDisabled, setOpenInNewTabDisabled] = useState(true);
  


  const onOpenInNewTab = () => {
    window.open(getImgUrl(), "_blank");
  };

  const onPreview = () => {
    updateQuerystring();
  };

  const onError = () => {
    setError(true);
    setOpenInNewTabDisabled(true);
  };

  const onLoad = (src) => {
    if (!src.currentTarget.src.includes("error")){
      setOpenInNewTabDisabled(false);
    }
  };

  const onFieldsChange = (changed_value,values) => {
    setOptions((prev) => {
      const newValues = {
        ...prev,
        [changed_value[0].name]: changed_value[0].value,
      };
      setOpenInNewTabDisabled(!checkSame(newValues));
      return newValues;
    });
  };

  return (
    <>
      <Head>
        <title>Codeforces Readme Stats</title>
        <meta name="title" content="Codeforces Readme Stats"/>
        <meta
          name="description"
          content="⚡ Dynamically generated Codeforces stats for your Github profile!"
        />
        <meta name="keywords" content="codeforces, competitive programming, readme stats, contest, programming"/>
        <meta name="subject" content="Codeforces Readme Stats"/>
        <meta name="topic" content="Codeforces Readme Stats"/>
        <meta name="summary" content="An API that generates beautiful statistics of your Codeforces profile as an SVG image, perfect for showcasing your competitive programming skills and achievements on Github."/>
        <meta name="url" content="https://codeforces-readme-stats.vercel.app/"/>
        <meta name="category" content="tool"/>
        <meta name="author" content="Huzaifa Khilawala"/>

        <meta property="og:title" content="Codeforces Readme Stats" />
        <meta property="og:description" content="⚡ Dynamically generated Codeforces stats for your Github profile!"/>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codeforces-readme-stats.vercel.app/" />
        <meta property="og:image" content="/bg.png" />
        <meta property="og:image:alt" content="Codeforces Readme Stats" />

        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="codeforces-readme-stats.vercel.app"/>
        <meta property="twitter:url" content="https://codeforces-readme-stats.vercel.app/"/>
        <meta name="twitter:title" content="Codeforces Readme Stats"/>
        <meta name="twitter:description" content="⚡ Dynamically generated Codeforces stats for your Github profile!"/>
        <meta name="twitter:image" content="/bg.png"/>
        <meta name="twitter:image:alt" content="Codeforces Readme Stats"/>
        
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
            
            <Col className="form">
            <Form
              name="Card Input"
              layout="horizontal"
              labelCol={{ span: 9 }}
              colon={false}
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
                <Button type="default" onClick={onOpenInNewTab} disabled={openInNewTabDisabled}>
                  Open in new tab<ExportOutlined />
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

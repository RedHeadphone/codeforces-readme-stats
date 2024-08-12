import Image from "next/image";
import { GithubFilled, BookFilled, ExportOutlined } from "@ant-design/icons";
import {
  Space,
  Card,
  Col,
  Form,
  Input,
  Select,
  Radio,
  Button,
  Divider,
  Row,
  notification,
} from "antd";

import themes from "@/themes.js";
import Logo from "@/images/logo.png";
import useOption from "@/hooks/option.js";

export default function Home() {
  const { options, setOptions, getImgUrl, error, setError, updateQuerystring } =
    useOption();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      message: "Success",
      description: `Copied to clipboard!`,
      placement,
    });
  };

  const onOpenInNewTab = () => {
    window.open(getImgUrl(), "_blank");
  };

  const onError = () => {
    setError(true);
  };

  const onFieldsChange = async (changed_value, values) => {
    setOptions((prev) => {
      const newOptions = {
        ...prev,
        [changed_value[0].name]: changed_value[0].value,
      };
      if (changed_value[0].name[0] !== "username") {
        updateQuerystring(newOptions);
      }
      return newOptions;
    });
  };

  const onCopyMarkdown = () => {
    navigator.clipboard.writeText(
      `[![Codeforces Stats](${
        window.location.href.substring(
          0,
          window.location.href.lastIndexOf("/")
        ) + getImgUrl()
      })](https://codeforces.com/profile/${options.username})`
    );
    openNotification("topRight");
  };

  const onUsernameEnter = () => {
    updateQuerystring(options);
  };

  return (
    <>
      {contextHolder}
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

            <Row className="row" gutter={[10, 10]}>
              <Col className="form">
                <Form
                  name="Card Input"
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
                    <Input autoComplete="off" spellCheck={false} onPressEnter={onUsernameEnter} />
                  </Form.Item>
                  <Form.Item className="form-item" label="Theme" name="theme">
                    <Select
                      showSearch
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
                      <Button
                        type="primary"
                        onClick={onCopyMarkdown}
                        disabled={error}
                      >
                        Copy Markdown
                      </Button>
                      <Button
                        type="default"
                        onClick={onOpenInNewTab}
                        disabled={error}
                      >
                        Open Image in new tab
                        <ExportOutlined />
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </Col>

              <Col className="image-output">
                <img
                  src={getImgUrl()}
                  alt="Codeforces-Stats"
                  fill="width"
                  onError={onError}
                />
              </Col>
            </Row>

            <Divider className="divider" />
            <Space className="footer">
              <a href="https://github.com/RedHeadphone/codeforces-readme-stats">
                <GithubFilled />
                Github
              </a>
              <a href="https://redheadphone.github.io/codeforces-readme-stats">
                <BookFilled />
                Docs
              </a>
            </Space>
          </Col>
        </Card>
      </Space>
    </>
  );
}
